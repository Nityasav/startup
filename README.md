# Dashboard App with AI Integration

This application features a dashboard with multiple sections, including an integrated AI chat functionality that persists user data in Supabase.

## Features

- User authentication with Supabase Auth
- Persistent user settings
- AI Assistant chat with conversation history
- Multiple AI agents for different purposes
- Settings management
- Dark/light mode and other display preferences

## Setup Instructions

### 1. Prerequisites

- Node.js (v14 or newer)
- npm or yarn
- A Supabase account and project

### 2. Environment Variables

Create a `.env` file in the root directory with the following variables:

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Supabase Setup

1. Create a new Supabase project
2. Set up authentication with email/password
3. Create the required database tables and policies by executing the SQL in `src/services/supabase-schema.sql`

### 4. Updating Existing Database Schema

If you've already created the tables but need to add new columns for additional settings, follow these steps:

1. Go to your Supabase dashboard
2. Navigate to the SQL Editor
3. Run the following ALTER TABLE statements:

```sql
-- Add user profile columns
ALTER TABLE user_settings ADD COLUMN IF NOT EXISTS display_name TEXT DEFAULT '';
ALTER TABLE user_settings ADD COLUMN IF NOT EXISTS company_name TEXT DEFAULT 'Acme Inc.';

-- Add notification preferences columns
ALTER TABLE user_settings ADD COLUMN IF NOT EXISTS email_notifications BOOLEAN DEFAULT true;
ALTER TABLE user_settings ADD COLUMN IF NOT EXISTS workflow_alerts BOOLEAN DEFAULT true;
ALTER TABLE user_settings ADD COLUMN IF NOT EXISTS agent_updates BOOLEAN DEFAULT false;
ALTER TABLE user_settings ADD COLUMN IF NOT EXISTS system_announcements BOOLEAN DEFAULT true;

-- Add billing information columns
ALTER TABLE user_settings ADD COLUMN IF NOT EXISTS current_plan TEXT DEFAULT 'Free';
ALTER TABLE user_settings ADD COLUMN IF NOT EXISTS billing_cycle TEXT DEFAULT 'Monthly';
ALTER TABLE user_settings ADD COLUMN IF NOT EXISTS payment_method TEXT DEFAULT 'None';
```

### 5. Install Dependencies

```bash
npm install
# or
yarn install
```

### 6. Run Development Server

```bash
npm run dev
# or
yarn dev
```

## Database Schema

The application uses the following Supabase tables:

1. **user_settings**: Stores user preferences
   - dark_mode, compact_view, animations_enabled, timezone
   - display_name, company_name
   - email_notifications, workflow_alerts, agent_updates, system_announcements
   - current_plan, billing_cycle, payment_method

2. **user_agents**: Available AI agents for each user
   - name, description, avatar_url, is_enabled

3. **conversations**: User chat conversations
   - title, agent_id, last_message, unread_count

4. **chat_messages**: Individual chat messages
   - conversation_id, role, content

## OpenAI Integration

The chat functionality requires an OpenAI API key. Users can provide their own API key in the chat settings.

## Development

The project is built with:

- React
- TypeScript
- Vite
- Supabase for authentication and data storage
- shadcn/ui components
- Tailwind CSS for styling
- OpenAI API for AI functionality

## Folder Structure

- `/src/components`: UI components
- `/src/context`: React context providers
- `/src/lib`: Utility functions and libraries
- `/src/pages`: Page components
- `/src/services`: Service functions for data management
- `/src/components/ui`: Reusable UI components

## Project info

**URL**: https://lovable.dev/projects/5ae51171-5f1f-4ae9-9525-e19485af8064

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/5ae51171-5f1f-4ae9-9525-e19485af8064) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

### Deploying to Vercel

1. Create a Vercel account at https://vercel.com/
2. Install the Vercel CLI: `npm i -g vercel`
3. Run `vercel login` and follow the prompts
4. From your project directory, run `vercel`
5. Set up your environment variables in the Vercel dashboard:
   - VITE_SUPABASE_URL
   - VITE_SUPABASE_ANON_KEY

### Setting Up a Custom Domain

1. In your Vercel project settings, go to the "Domains" section
2. Add your custom domain (e.g., venturly.ca)
3. Follow the DNS configuration instructions

### Troubleshooting Deployment Issues

#### Fixing Black Screen After Deployment

If you encounter a black screen after deployment:

1. **Check environment variables**: Make sure all required environment variables are set in Vercel
   - Go to your project in the Vercel dashboard
   - Navigate to Settings > Environment Variables
   - Add all required variables (VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY)

2. **Verify build settings**: Ensure Vercel is using the correct build command and output directory
   - The project includes a `vercel.json` file that configures these settings
   - Build command should be `npm run build`
   - Output directory should be `dist`

3. **Check browser console**: Look for errors in your browser's developer tools
   - Press F12 in your browser to open developer tools
   - Check the Console tab for error messages

4. **Clear browser cache**: Try clearing your browser cache or opening in incognito mode

5. **Check Vercel logs**: Review build and deployment logs in the Vercel dashboard
   - Navigate to your project in Vercel
   - Go to the Deployments tab
   - Click on the latest deployment to see logs

6. **Test locally with production build**: Test your production build locally before deploying
   ```bash
   npm run build
   npm run preview
   ```

### Alternative Deployment Options

You can also deploy this project to:

- Netlify
- AWS Amplify
- GitHub Pages 
- Firebase Hosting

Simply open [Lovable](https://lovable.dev/projects/5ae51171-5f1f-4ae9-9525-e19485af8064) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
