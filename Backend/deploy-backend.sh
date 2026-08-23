#!/usr/bin/env bash

# ==============================================================================
# Continuous Deployment Script for Portfolio Backend with PM2 on Ubuntu
# Process Name: ThourPortfolio
# ==============================================================================

# Exit immediately if a command exits with a non-zero status
set -e

# Configuration
APP_NAME="ThourPortfolio"
ENTRY_POINT="dist/server.js"
BRANCH="main"
BACKEND_DIR="$(cd "$(dirname "$0")" && pwd)"

echo "=========================================="
echo "🚀 Starting Deployment for $APP_NAME"
echo "=========================================="

# 1. Load Node/NVM environment for non-interactive shells
export NVM_DIR="$HOME/.nvm"
if [ -s "$NVM_DIR/nvm.sh" ]; then
    # shellcheck source=/dev/null
    \. "$NVM_DIR/nvm.sh"
fi

# Ensure PM2 is available in PATH
if ! command -v pm2 > /dev/null 2>&1; then
    echo "⚠️ PM2 not found in standard PATH. Trying global npm bin path..."
    export PATH="$PATH:$(npm config get prefix)/bin"
fi

# 2. Resolve paths (support monorepo structure)
BACKEND_DIR="$(cd "$(dirname "$0")" && pwd)"
REPO_ROOT="$(git -C "$BACKEND_DIR" rev-parse --show-toplevel 2>/dev/null || echo "$BACKEND_DIR")"

echo "📂 Monorepo root: $REPO_ROOT"
echo "📂 Backend directory: $BACKEND_DIR"

# 3. Pull latest code from Git
echo "📥 Fetching latest code from Git branch: $BRANCH..."
if git -C "$REPO_ROOT" rev-parse --is-inside-work-tree > /dev/null 2>&1; then
    cd "$REPO_ROOT"
    git fetch origin "$BRANCH"
    git reset --hard "origin/$BRANCH"
else
    echo "ℹ️ Note: Not inside a git repository work-tree, skipping git pull."
fi

# 4. Navigate to Backend directory for dependencies and build
cd "$BACKEND_DIR"

# 5. Validate .env presence
if [ ! -f ".env" ]; then
    echo "⚠️ WARNING: .env file is missing in $BACKEND_DIR!"
    echo "⚠️ Ensure all required production environment variables are configured."
else
    echo "✅ .env configuration file detected."
fi

# 6. Install dependencies
echo "📦 Installing npm dependencies..."
npm install

# 7. Compile TypeScript
echo "🔨 Compiling TypeScript application..."
npm run build

# Verify build artifact
if [ ! -f "$ENTRY_POINT" ]; then
    echo "❌ ERROR: Build succeeded but entry point '$ENTRY_POINT' was not found!"
    exit 1
fi
echo "✅ Build artifact verified: $ENTRY_POINT"

# 8. Check PM2 availability
if ! command -v pm2 > /dev/null 2>&1; then
    echo "❌ ERROR: PM2 CLI is required but not found. Please install PM2 globally via: npm install -g pm2"
    exit 1
fi

# 8. PM2 Process Lifecycle Management
echo "🔄 Managing PM2 process: $APP_NAME..."
if pm2 describe "$APP_NAME" > /dev/null 2>&1; then
    echo "⚡ PM2 process '$APP_NAME' is registered. Attempting zero-downtime reload..."
    if ! pm2 reload "$APP_NAME" --update-env; then
        echo "⚠️ PM2 reload failed (process might be in stopped/errored state). Falling back to restart..."
        pm2 restart "$APP_NAME" --update-env
    fi
else
    echo "✨ PM2 process '$APP_NAME' is not registered. Starting fresh instance..."
    pm2 start "$ENTRY_POINT" --name "$APP_NAME"
fi

# 9. Persist PM2 process configuration for server reboots
echo "💾 Saving active PM2 process list..."
pm2 save

# 10. Post-deployment verification
echo "⏳ Waiting 3 seconds to verify process stability..."
sleep 3

pm2 show "$APP_NAME" || pm2 status

echo "=========================================="
echo "✅ Backend deployed and running successfully!"
echo "=========================================="
