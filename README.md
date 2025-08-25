# Pixer - Digital Marketplace

A unified Next.js application combining the shop frontend and admin dashboard with Supabase backend.

## Features

- **Shop Frontend**: Digital marketplace with product grid, categories, and search
- **Admin Dashboard**: Complete admin panel with analytics, orders, and product management
- **Supabase Integration**: PostgreSQL database with real-time capabilities
- **Modern UI**: Dark theme with Tailwind CSS and responsive design

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Icons**: Heroicons
- **Animations**: Framer Motion

## Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Environment variables**:
   Copy `env.template` to `.env.local` and fill in your Supabase credentials:
   ```bash
   cp env.template .env.local
   ```

3. **Supabase Setup**:
   - Create a new Supabase project
   - Get your project URL and anon key
   - Update `.env.local` with your credentials

4. **Database Schema**:
   Run the SQL script in Supabase SQL Editor to create tables:
   ```sql
   -- Create products table
   CREATE TABLE products (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     name VARCHAR(255) NOT NULL,
     description TEXT,
     price DECIMAL(10,2) NOT NULL DEFAULT 0,
     original_price DECIMAL(10,2),
     image_url TEXT,
     category VARCHAR(100),
     author VARCHAR(100),
     author_icon VARCHAR(10),
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   -- Create categories table
   CREATE TABLE categories (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     name VARCHAR(100) NOT NULL,
     slug VARCHAR(100) UNIQUE NOT NULL,
     description TEXT,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   -- Create users table
   CREATE TABLE users (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     email VARCHAR(255) UNIQUE NOT NULL,
     name VARCHAR(255) NOT NULL,
     role VARCHAR(20) DEFAULT 'customer',
     avatar_url TEXT,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   -- Create orders table
   CREATE TABLE orders (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     tracking_number VARCHAR(50) UNIQUE NOT NULL,
     customer_email VARCHAR(255) NOT NULL,
     customer_name VARCHAR(255) NOT NULL,
     total DECIMAL(10,2) NOT NULL,
     status VARCHAR(20) DEFAULT 'pending',
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );
   ```

5. **Run development server**:
   ```bash
   npm run dev
   ```

6. **Build for production**:
   ```bash
   npm run build
   npm start
   ```

## Project Structure

```
src/
├── app/                 # Next.js app router
│   ├── admin/          # Admin dashboard pages
│   ├── globals.css     # Global styles
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Shop homepage
├── components/          # Reusable components
│   ├── admin/          # Admin-specific components
│   ├── layout/         # Layout components
│   └── shop/           # Shop-specific components
├── lib/                 # Utilities and configurations
│   └── supabase.ts     # Supabase client and types
└── types/               # TypeScript type definitions
```

## Routes

- `/` - Shop homepage with product grid
- `/admin` - Admin dashboard
- `/admin/products` - Product management
- `/admin/orders` - Order management
- `/admin/shops` - Shop management

## Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Environment Variables for Vercel

- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anon key

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

©2025 Pixer. Copyright © REDQ. All rights reserved worldwide.
