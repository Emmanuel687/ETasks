# Your Project Name....

## Description
This project is a comprehensive web application built with Nuxt 3 and Supabase, featuring both a public-facing website and a secure admin dashboard. It combines a user-friendly public interface with a powerful administrative backend, all wrapped in a modern, responsive design.

## Features

### Public Website
- Responsive, dark-themed design
- Home page with key information
- About and Contact pages
- User authentication (signup and login)

### Admin Dashboard
- Secure, authenticated access
- Overview of key metrics (customizable)
- User management interface
- Settings and configuration options

### Shared Features
- Seamless navigation between public and admin areas
- Consistent styling with a dark theme
- Responsive design for both desktop and mobile devices
- User authentication (signup, login, logout)

## Technologies Used
- [Nuxt 3](https://nuxt.com/)
- [Supabase](https://supabase.io/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vue 3](https://v3.vuejs.org/)

## Prerequisites
- Node.js (v14 or later)
- npm or yarn
- Supabase account and project

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/your-project-name.git
   cd your-project-name
   ```

2. Install dependencies:
   ```
   npm install
   ```
   or
   ```
   yarn install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following:
   ```
   SUPABASE_URL=your_supabase_project_url
   SUPABASE_KEY=your_supabase_anon_key
   ```

## Development

To run the development server:

```
npm run dev
```
or
```
yarn dev
```

The application will be available at `http://localhost:3000`.

## Build

To build the application for production:

```
npm run build
```
or
```
yarn build
```

## Deployment

This project is configured for deployment on Vercel. Make sure to set up your environment variables in your Vercel project settings.

To deploy manually:

1. Install Vercel CLI:
   ```
   npm i -g vercel
   ```

2. Run the deployment command:
   ```
   vercel
   ```

Follow the prompts to complete the deployment process.

## Project Structure

- `components/` - Vue components
  - `admin/` - Admin-specific components
  - `website/` - Public website components
- `layouts/` - Nuxt layouts
  - `default.vue` - Layout for public pages
  - `admin.vue` - Layout for admin pages
- `pages/` - Application pages and routes
  - `index.vue` - Home page
  - `about.vue` - About page
  - `contact.vue` - Contact page
  - `login.vue` - Login page
  - `signup.vue` - Signup page
  - `admin/` - Admin pages
    - `index.vue` - Admin dashboard
    - `users.vue` - User management
    - `settings.vue` - Admin settings
- `middleware/` - Nuxt middleware (e.g., authentication checks)
- `plugins/` - Vue plugins
- `public/` - Static assets
- `stores/` - Pinia stores (if used)

## Usage

### Public Website
- Navigate to the root URL to access the public website
- Use the navigation bar to explore different pages
- Sign up or log in to access user-specific features

### Admin Dashboard
- Log in with admin credentials
- Navigate to `/admin` to access the dashboard
- Use the sidebar to navigate between different admin sections

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

[MIT License](LICENSE)

## Contact

Your Name - koechemmanuel2002@gmail.com

