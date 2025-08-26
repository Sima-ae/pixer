# StuntXL - Digital Marketplace

A modern digital marketplace built with Next.js 14, featuring a shop frontend and admin dashboard, integrated with Supabase for database management.

## 🚀 Features

- **Shop Frontend**: Beautiful product showcase with category filtering
- **Admin Dashboard**: Comprehensive management interface
- **Modern UI**: Dark theme with custom color palette
- **Responsive Design**: Mobile-first approach
- **TypeScript**: Full type safety
- **Supabase Integration**: PostgreSQL database with real-time capabilities

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Icons**: Heroicons
- **Animations**: Framer Motion
- **Language**: TypeScript

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Shop homepage
│   └── admin/
│       └── page.tsx       # Admin dashboard
├── components/             # Reusable components
│   ├── layout/            # Layout components
│   ├── shop/              # Shop-specific components
│   └── admin/             # Admin-specific components
└── lib/                   # Utilities and configurations
    └── supabase.ts        # Supabase client setup
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd triplezero-it
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.template .env.local
   ```
   
   Update `.env.local` with your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   - Shop: http://localhost:3000
   - Admin: http://localhost:3000/admin

## 🗄️ Database Setup

Run this SQL in your Supabase SQL Editor:

```sql
-- Create categories table
CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create products table
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  category_id INTEGER REFERENCES categories(id),
  image_url VARCHAR(500),
  author_id INTEGER,
  status VARCHAR(50) DEFAULT 'active',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  role VARCHAR(50) DEFAULT 'user',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create orders table
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  product_id INTEGER REFERENCES products(id),
  status VARCHAR(50) DEFAULT 'pending',
  amount DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms

- **Netlify**: Use `npm run build` and deploy the `.next` folder
- **Railway**: Deploy with Node.js environment
- **Docker**: Use the provided Dockerfile

## 📱 Available Routes

- `/` - Shop homepage
- `/admin` - Admin dashboard
- `/explore` - Product exploration
- `/popular` - Popular products
- `/authors` - Top authors
- `/feed` - Activity feed
- `/contact` - Contact page
- `/seller` - Become a seller

## 🎨 Customization

### Colors

The app uses a custom color palette defined in `tailwind.config.js`:

- **Primary**: Green accent colors
- **Dark**: Dark theme with multiple shades
- **Gray**: Neutral grays for text and borders

### Components

All components are built with Tailwind CSS and can be easily customized by modifying the classes in each component file.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support, please open an issue in the GitHub repository or contact the development team.

---

©2025 StuntXL. Copyright © TripleZero iT. All rights reserved worldwide.
