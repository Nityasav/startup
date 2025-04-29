# Supabase Authentication Setup

## Environment Variables

Create a `.env.local` file in the root of your project with the following variables:

```
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Supabase Setup

1. Create a Supabase account at https://supabase.com
2. Create a new project
3. Go to Project Settings > API to get your URL and anon key
4. Set up authentication in the Auth section of your Supabase dashboard
5. Enable Email/Password provider

## Usage

The authentication flow is now integrated. You can:
- Sign up users at `/auth` (Sign Up tab)
- Sign in users at `/auth` (Sign In tab)
- Access the protected dashboard at `/dashboard` 