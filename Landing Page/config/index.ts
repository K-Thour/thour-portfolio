/**
 * Central Application Configuration
 * Strictly typed and resolved from environment variables with production fallbacks.
 */
export interface AppConfig {
  apiUrl: string;
  portfolioUrl: string;
  isDevelopment: boolean;
  isProduction: boolean;
}

export const config: AppConfig = {
  apiUrl:
    process.env.NEXT_PUBLIC_API_URL ||
    'http://localhost:3000/api',
  portfolioUrl:
    process.env.NEXT_PUBLIC_PORTFOLIO_URL ||
    'https://thour-portfolio.netlify.app',
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
};

export default config;

