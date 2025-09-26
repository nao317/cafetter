# Coffee SNS - Supabase Edition

A modern social media application built with Laravel, React, TypeScript, and Supabase.

## Features

- 🔐 **Authentication** - Powered by Supabase Auth
- 👥 **User Profiles** - Customizable user profiles
- 📝 **Posts** - Create, edit, and delete posts
- 💬 **Comments** - Comment on posts
- ❤️ **Likes** - Like posts and comments
- 👥 **Follow System** - Follow/unfollow users
- 📱 **Responsive Design** - Works on all devices
- 🎨 **Dark Mode** - Theme switching

## Tech Stack

- **Backend**: Laravel 11
- **Frontend**: React 18 + TypeScript
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **UI Components**: Custom components with shadcn/ui

## Setup Instructions

### 1. Clone the repository

```bash
git clone <repository-url>
cd coffee_sns
```

### 2. Install dependencies

```bash
# PHP dependencies
composer install

# Node.js dependencies
npm install
```

### 3. Environment Configuration

Copy the environment file and configure it:

```bash
cp .env.example .env
```

Generate Laravel application key:

```bash
php artisan key:generate
```

### 4. Supabase Setup

1. Create a new project at [https://supabase.com](https://supabase.com)
2. Go to Settings > API and copy your project URL and anon key
3. Update your `.env` file:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 5. Database Schema

1. Go to your Supabase dashboard
2. Navigate to SQL Editor
3. Run the SQL from `supabase/schema.sql` to create the necessary tables and policies

### 6. Authentication Configuration

In your Supabase dashboard:

1. Go to Authentication > Settings
2. Configure your site URL (e.g., `http://localhost:8000`)
3. Enable email confirmations if desired
4. Optionally configure social auth providers (Google, GitHub, etc.)

### 7. Start Development Servers

```bash
# Start Laravel development server
php artisan serve

# Start Vite development server (in another terminal)
npm run dev
```

Visit `http://localhost:8000` to see your application.

## Supabase Database Schema

The application uses the following main tables:

- **users** - Extended user profiles (linked to auth.users)
- **posts** - User posts/content
- **comments** - Comments on posts
- **likes** - Like system for posts
- **follows** - Follow/follower relationships

All tables have Row Level Security (RLS) enabled with appropriate policies.

## Development

### Available Scripts

```bash
# Development
npm run dev          # Start Vite dev server
php artisan serve    # Start Laravel server

# Building
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run lint         # Run ESLint
composer test        # Run PHP tests
npm test            # Run JavaScript tests
```

### File Structure

```
├── app/                    # Laravel application files
├── resources/
│   ├── js/
│   │   ├── components/     # React components
│   │   ├── contexts/       # React contexts (Auth, etc.)
│   │   ├── hooks/          # Custom React hooks
│   │   ├── layouts/        # Page layouts
│   │   ├── lib/           # Utility libraries (Supabase client)
│   │   └── pages/         # Page components
│   └── css/               # Stylesheets
├── supabase/              # Database schema and migrations
└── routes/                # Laravel routes
```

## Deployment

### Supabase Production Setup

1. Ensure your production Supabase project is configured
2. Update environment variables for production
3. Run the schema SQL on your production database
4. Configure authentication settings for your production domain

### Laravel Deployment

Follow standard Laravel deployment practices:

1. Set `APP_ENV=production` in `.env`
2. Run `composer install --optimize-autoloader --no-dev`
3. Run `php artisan config:cache`
4. Run `npm run build`
5. Configure your web server

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is open-sourced software licensed under the [MIT license](LICENSE).