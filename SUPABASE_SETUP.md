# Supabase Setup Guide

## Fixing the "Error inserting into users table" Issue

The error you're encountering is due to missing Supabase environment variables. Follow these steps to fix it:

### 1. Create Environment Variables File

Create a `.env.local` file in your project root with the following content:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

### 2. Get Your Supabase Credentials

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project (or create a new one)
3. Go to **Settings** → **API**
4. Copy the following values:
   - **Project URL** → Use as `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → Use as `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 3. Set Up Your Database

1. In your Supabase project, go to **SQL Editor**
2. Run the SQL commands from `supabase-schema.sql` to create your database tables
3. Make sure the `users` table is created with the correct schema

### 4. Restart Your Development Server

After adding the environment variables:

```bash
npm run dev
```

### 5. Test the Signup Form

The signup form should now work properly. If you still encounter issues, check the browser console for more detailed error messages.

## Database Schema

The `users` table should have the following structure:

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    userName TEXT NOT NULL UNIQUE,
    fullName TEXT NOT NULL,
    email_address TEXT NOT NULL UNIQUE,
    phoneNumber TEXT,
    userPassword TEXT
);
```

## Troubleshooting

- **Empty error object `{}`**: Usually indicates missing environment variables
- **Connection errors**: Check if your Supabase URL is correct
- **Authentication errors**: Verify your anon key is correct
- **Table not found**: Make sure you've run the schema SQL in your Supabase project

## Security Notes

- Never commit your `.env.local` file to version control
- The `.env.local` file is already in `.gitignore` to prevent accidental commits
- Use environment variables for all sensitive configuration
