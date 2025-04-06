# Setting Up Authentication with Supabase

This project uses Supabase for authentication and user management. Follow these steps to set up your own Supabase project and connect it to your application.

## 1. Create a Supabase Project

1. Go to [Supabase](https://supabase.com/) and sign up for an account if you don't have one.
2. Create a new project from your dashboard.
3. Choose a name for your project and set a secure database password.
4. Select a region closest to your users.
5. Wait for your database to be provisioned (this might take a few minutes).

## 2. Configure Authentication

1. In your Supabase dashboard, go to **Authentication** > **Settings**.
2. Under **Email Auth**, ensure that "Enable Email Signup" is enabled.
3. Optionally, customize the email templates for confirmation, invitation, and password reset emails.
4. If you want to add other authentication providers (Google, GitHub, etc.), configure them in their respective sections.

## 3. Get Your API Keys

1. Go to **Settings** > **API** in your Supabase dashboard.
2. You'll need two keys:
   - **URL**: Your Supabase project URL
   - **anon public**: Your public API key for client-side requests

## 4. Set Up Environment Variables

1. Create a `.env.local` file in the root of your project (use the provided `.env.local.example` as a template).
2. Add your Supabase URL and anonymous key:

```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

## 5. Testing Authentication

1. Start your development server with `npm run dev`.
2. Navigate to the signup page and create a new account.
3. Check your Supabase dashboard under **Authentication** > **Users** to see the new user.

## 6. User Management

You can manage users directly from the Supabase dashboard:
- View all users
- Delete users
- Manually confirm email addresses
- Reset passwords

## 7. Database Setup for User Data (Optional)

If you want to store additional user data beyond what Supabase auth provides:

1. Go to **Database** > **Tables** in your Supabase dashboard.
2. Create a new table called `profiles` with the following columns:
   - `id` (uuid, primary key, references auth.users.id)
   - `created_at` (timestamp with time zone, default: now())
   - `full_name` (text)
   - Additional fields as needed

3. Set up Row Level Security (RLS) policies to secure the data:
   - Go to your `profiles` table
   - Click on "RLS" to enable Row Level Security
   - Create policies that allow users to only access their own data

Example policy for reading user profiles:
```sql
CREATE POLICY "Users can view their own profile" 
ON profiles FOR SELECT 
USING (auth.uid() = id);
```

Example policy for updating user profiles:
```sql
CREATE POLICY "Users can update their own profile" 
ON profiles FOR UPDATE 
USING (auth.uid() = id);
```

## 8. Troubleshooting

- **Email verification not working**: Check your email settings in Supabase and ensure your SMTP configuration is correct.
- **Authentication failures**: Verify that your environment variables are set correctly.
- **CORS errors**: Ensure your site URL is added to the allowed origins in Supabase settings.

## Additional Resources

- [Supabase Auth Documentation](https://supabase.io/docs/guides/auth)
- [Next.js Authentication Guide](https://supabase.io/docs/guides/auth/auth-helpers/nextjs)
- [Row Level Security Guide](https://supabase.io/docs/guides/auth/row-level-security) 