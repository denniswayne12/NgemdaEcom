This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Supabase Integration

This project is configured to work with Supabase. To connect it to your Supabase instance:

1. Create a Supabase project at [https://app.supabase.com/](https://app.supabase.com/)
2. Copy your Supabase URL and anon key from the project settings
3. Add these values to your `.env.local` file:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Database Schema Setup

To set up the e-commerce database schema in Supabase:

1. Go to your Supabase project dashboard
2. Navigate to the "SQL Editor" section in the left sidebar
3. Create a new query
4. Copy the contents of [supabase-schema.sql](file:///c:/Users/denni/Documents/ecom2.0/supabase-schema.sql) and paste it into the SQL editor
5. Click "Run" to execute the query

This will create all the necessary tables for your e-commerce application and insert some sample data.

## Authentication

This project includes a complete authentication system with:

- Login page (`/auth/login`)
- Signup page (`/auth/signup`)
- Logout functionality
- Protected routes
- Social login (Google, Apple)

### Features

- Email/password authentication
- Password visibility toggle
- "Remember me" functionality
- Social authentication with Google and Apple
- Session management
- Protected routes for authenticated users only

### Auth Components

- `AuthProvider` - Context provider for managing authentication state
- `ProtectedRoute` - Component to protect routes that require authentication
- `useAuth` - Hook to access authentication state

## Testing the Connection

After setting up your Supabase credentials and database schema:

1. Run the development server with `npm run dev`
2. Visit [http://localhost:3000](http://localhost:3000)
3. You should see data loaded from your Supabase database in the "Supabase Connection Tests" section

The example components demonstrate:
- Basic connection to a single table (`region`)
- Advanced connection to multiple tables simultaneously

## Project Structure

- [supabaseClient.js](file:///c:/Users/denni/Documents/ecom2.0/src/app/supabaseClient.js) - Supabase client configuration
- [supabase-example.js](file:///c:/Users/denni/Documents/ecom2.0/src/app/supabase-example.js) - Basic Supabase data fetching example
- [supabase-full-example.js](file:///c:/Users/denni/Documents/ecom2.0/src/app/supabase-full-example.js) - Advanced Supabase data fetching example
- [supabase-schema.sql](file:///c:/Users/denni/Documents/ecom2.0/supabase-schema.sql) - Complete e-commerce database schema
- `src/app/auth/` - Authentication components and pages
- `src/app/api/auth/` - API routes for authentication

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.