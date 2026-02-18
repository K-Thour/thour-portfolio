🚀 Full-Stack Portfolio Management Platform

A fully dynamic, production-ready portfolio platform consisting of a public website, secure admin panel, and scalable backend API powered by a structured relational database.

This system enables complete content management without modifying frontend code and demonstrates real-world backend architecture, database modeling, authentication, and audit tracking.

🔥 Key Features
🌐 Public Website

        Dynamic project and service rendering

        Device-based project categorization (Web / Mobile / Desktop)

        Technology-based filtering

        SEO-friendly structure

        Responsive UI

        Project metrics and testimonials display

        Lead inquiry form with backend storage

🛠 Admin Panel

        Secure authentication (JWT-based)

        Full CRUD operations for:

        Technologies

        Services

        Projects

        Project screenshots

        Project metrics

        Testimonials

        Leads

        Soft deletion system

        Audit tracking (createdBy, updatedBy, deletedBy)

        Image upload and management support

⚙ Backend API

        RESTful architecture

        Modular folder structure

        Input validation and sanitization

        Relational data handling

        Soft delete implementation

        Structured entity relationships

        Clean and scalable codebase

🗄 Database Architecture Highlights

        Normalized relational schema

        Enum-based device handling (web / mobile / desktop)

        Soft delete strategy using deleted_at

        Full audit trail:

            created_by

            updated_by

            deleted_by

        Project relationships:

            Ordered screenshots

            Metrics (KPIs)

            Testimonials (unique per project)

            Technology stack linking

            Service categorization

        Lead management system for client inquiries

🔐 Security & Engineering Practices

        Password hashing

        JWT authentication

        Data integrity through foreign key relationships

        Soft deletion for recoverability

        Clean separation of concerns

        Production-oriented backend design

📌 Why This Project Stands Out

This is not a static portfolio website.

It demonstrates:

        Backend system design

        Relational database modeling

        Authentication system implementation

        Audit logging patterns

        Dynamic CMS-style content management

        Scalable full-stack development practices

🎯 What You Can Do With This System

        Add new technologies

        Create and manage services

        Showcase projects with full details

        Upload multiple screenshots per project

        Add performance metrics

        Display client testimonials

Track leads from inquiries

Update content anytime through admin panel

Manage soft-deleted records

        Track who made changes

🚀 Production-Ready Architecture

This system is built with production standards in mind:

        Clean folder structure

        Proper error handling

        Input validation

        Database normalization

        Security best practices

        Scalable design

        Easy to maintain and extend

Installation

        Clone the repository

        Install dependencies

        Run the database migrations

        Start the development server