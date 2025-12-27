# Movie Discovery App 🎬

A modern, responsive React application for discovering and exploring movies. Built with React, Vite, and Tailwind CSS, this app provides an intuitive interface to search, browse, and view detailed information about movies using The Movie Database (TMDB) API.

## 📋 Table of Contents

- [Project Description](#project-description)
- [Pages & Features](#pages--features)
- [Development Process](#development-process)
- [Tech Stack](#tech-stack)
- [Server Commands](#server-commands)
- [Deployment Guide](#deployment-guide)

---

## 🎯 Project Description

This Movie Discovery App is a full-featured web application that allows users to:

- **Search Movies**: Real-time search functionality with debounced input for optimal performance
- **Browse Popular Movies**: Discover trending and popular movies
- **View Movie Details**: Comprehensive movie information including cast, trailers, images, and similar movies
- **Track Trending Searches**: Analytics integration with Appwrite to track and display trending movie searches

The application features a dark, modern UI with smooth animations and responsive design that works seamlessly across all device sizes.

---

## 📄 Pages & Features

### 1. **Home Page** (`/`)

The main landing page where users can search and browse movies.

#### Components & Features:

- **Hero Section**
  - Hero banner image
  - Main heading with gradient text effect
  - Search bar with debounced input (500ms delay)

- **Trending Searches Section**
  - Displays top 10 most searched movies
  - Numbered list with movie posters
  - Data fetched from Appwrite database
  - Horizontal scrollable layout

- **All Movies Section**
  - Grid layout of movie cards
  - Responsive design (1 column mobile, 2 tablet, 4 desktop)
  - Each card displays:
    - Movie poster
    - Title
    - Rating with star icon
    - Release year
  - Clickable cards that navigate to movie details
  - Loading spinner during data fetch
  - Error handling with retry functionality
  - Empty state when no movies found

#### State Management:
- Search term state with debouncing
- Movie list state
- Trending movies state
- Loading and error states

---

### 2. **Movie Details Page** (`/movies/:id`)

Comprehensive movie information page with rich media content.

#### Components & Features:

- **Hero Section with Backdrop**
  - Full-width backdrop image with gradient overlay
  - Large movie poster (300px)
  - Movie title (responsive sizing)
  - Rating, release year, and runtime
  - Genre tags
  - Movie overview/description
  - Production companies
  - Spoken languages

- **Cast Section**
  - Top 10 cast members
  - Actor photos with character names
  - Horizontal scrollable layout
  - Hover effects

- **Trailers & Videos Section**
  - Embedded YouTube videos
  - Filters for Trailers and Teasers only
  - Responsive grid layout (1 column mobile, 2 desktop)
  - Video titles and types displayed
  - Up to 6 videos shown

- **Images Section**
  - Gallery of movie images (backdrops and posters)
  - Grid layout (2 mobile, 3 tablet, 4 desktop)
  - Hover effects with zoom
  - Click to view full-size images
  - Up to 12 images displayed

- **Similar Movies Section**
  - Grid of similar movies
  - Same card design as home page
  - Clickable navigation to other movie details
  - Up to 8 similar movies shown

#### State Management:
- Movie details state
- Cast list state
- Similar movies state
- Images and videos state
- Loading and error states

#### Error Handling:
- 404 error handling for movie not found
- Network error handling
- Retry functionality
- User-friendly error messages

---

## 🛠️ Development Process

### Phase 1: Project Setup
1. **Initialized Vite + React project** with modern tooling
2. **Configured Tailwind CSS** with custom theme and utilities
3. **Set up React Router** for navigation
4. **Integrated TMDB API** for movie data
5. **Set up Appwrite** for trending searches analytics

### Phase 2: Home Page Development
1. Created search component with debounced input
2. Implemented movie fetching logic (search and discover)
3. Built movie card component with reusable design
4. Added trending searches section with Appwrite integration
5. Implemented loading and error states
6. Added responsive grid layouts

### Phase 3: Movie Details Page Development
1. Created movie detail page with route parameters
2. Implemented comprehensive data fetching (details, credits, similar, images, videos)
3. Built hero section with backdrop and poster
4. Added cast section with horizontal scroll
5. Integrated YouTube video embeds for trailers
6. Created image gallery with hover effects
7. Added similar movies section
8. Implemented robust error handling and loading states

### Phase 4: UI/UX Enhancements
1. Custom Tailwind theme with dark color scheme
2. Custom fonts (DM Sans, Bebas Neue)
3. Gradient text effects
4. Smooth transitions and hover effects
5. Responsive design for all screen sizes
6. Loading spinners and error messages
7. Empty state handling

### Phase 5: Optimization
1. Debounced search to reduce API calls
2. Image optimization with TMDB CDN
3. Lazy loading for better performance
4. Error boundaries and fallbacks
5. Code organization and component reusability

---

## 🚀 Tech Stack

### Frontend Framework & Libraries
- **React 19.2.0** - UI library
- **React DOM 19.2.0** - DOM rendering
- **React Router DOM 7.11.0** - Client-side routing
- **React Use 17.6.0** - Custom hooks (useDebounce)

### Build Tools & Development
- **Vite 7.2.4** - Build tool and dev server
- **@vitejs/plugin-react 5.1.1** - React plugin for Vite
- **ESLint 9.39.1** - Code linting
- **Autoprefixer 10.4.23** - CSS vendor prefixing
- **PostCSS 8.5.6** - CSS processing

### Styling
- **Tailwind CSS 4.1.18** - Utility-first CSS framework
- **@tailwindcss/vite 4.1.18** - Tailwind Vite plugin
- Custom theme configuration with:
  - Primary dark color (#030014)
  - Light accent colors
  - Custom fonts (DM Sans, Bebas Neue)
  - Custom utilities (text-gradient, fancy-text)

### Backend Services
- **Appwrite 21.5.0** - Backend-as-a-Service for:
  - Database (trending searches tracking)
  - Document storage and queries

### APIs
- **The Movie Database (TMDB) API** - Movie data source:
  - Movie search
  - Movie details
  - Movie images
  - Movie videos/trailers
  - Cast and crew information
  - Similar movies

### Type Definitions
- **@types/react 19.2.5** - React TypeScript definitions
- **@types/react-dom 19.2.3** - React DOM TypeScript definitions

---

## 💻 Server Commands

### Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# The app will be available at http://localhost:5173
```

### Building for Production

```bash
# Build the project
npm run build

# Preview production build locally
npm run preview
```

### Code Quality

```bash
# Run ESLint
npm run lint
```

### Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# TMDB API Configuration
VITE_TMDB_API_KEY=your_tmdb_api_key_here
VITE_TMDB_API_BASE_URL=https://api.themoviedb.org/3

# Appwrite Configuration
VITE_APPWRITE_PROJECT_ID=your_appwrite_project_id
VITE_APPWRITE_DATABASE_ID=your_appwrite_database_id
VITE_APPWRITE_COLLECTION_ID=your_appwrite_collection_id
VITE_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
```

**Important Notes**:
- All environment variables are accessed through `src/config.js` for better organization and validation
- The config file provides fallback values for optional variables
- Vite automatically loads `.env.local` files (higher priority than `.env`)
- The `.env.local` file is already in `.gitignore` and will not be committed to version control
- Never commit your `.env.local` file with actual API keys

---

## 🚢 Deployment Guide

### Prerequisites
- Node.js 18+ installed
- TMDB API key ([Get one here](https://www.themoviedb.org/settings/api))
- Appwrite account and project ([Sign up here](https://cloud.appwrite.io))

### Deployment Stack Options

#### Option 1: Vercel (Recommended)

1. **Install Vercel CLI** (optional):
   ```bash
   npm i -g vercel
   ```

2. **Deploy via Vercel Dashboard**:
   - Push your code to GitHub
   - Import project in [Vercel Dashboard](https://vercel.com)
   - Add environment variables in project settings
   - Deploy automatically on every push

3. **Deploy via CLI**:
   ```bash
   vercel
   ```

4. **Environment Variables**:
   - Add all environment variables from `.env.local` in Vercel project settings
   - Variables will be automatically prefixed with `VITE_` for client-side access

**Vercel Advantages**:
- Automatic HTTPS
- Global CDN
- Automatic deployments on Git push
- Preview deployments for PRs
- Free tier available

---

#### Option 2: Netlify

1. **Install Netlify CLI** (optional):
   ```bash
   npm install -g netlify-cli
   ```

2. **Deploy via Netlify Dashboard**:
   - Push code to GitHub
   - Connect repository in [Netlify Dashboard](https://app.netlify.com)
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Add environment variables

3. **Deploy via CLI**:
   ```bash
   netlify deploy --prod
   ```

4. **Create `netlify.toml`** (optional):
   ```toml
   [build]
     command = "npm run build"
     publish = "dist"
   
   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   ```

**Netlify Advantages**:
- Easy Git integration
- Form handling
- Serverless functions
- Free tier available

---

#### Option 3: GitHub Pages

1. **Install gh-pages**:
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Update `package.json`**:
   ```json
   {
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     },
     "homepage": "https://yourusername.github.io/first-react-project"
   }
   ```

3. **Deploy**:
   ```bash
   npm run deploy
   ```

**Note**: Update `vite.config.js` for GitHub Pages:
```js
export default defineConfig({
  base: '/first-react-project/', // Your repo name
  plugins: [react(), tailwindcss()],
})
```

---

#### Option 4: AWS Amplify

1. **Connect Repository**:
   - Go to [AWS Amplify Console](https://console.aws.amazon.com/amplify)
   - Connect your Git repository

2. **Configure Build Settings**:
   - Build command: `npm run build`
   - Output directory: `dist`

3. **Add Environment Variables**:
   - Add all required environment variables

4. **Deploy**:
   - Amplify will automatically deploy on every push

---

#### Option 5: Cloudflare Pages

1. **Connect Repository**:
   - Go to [Cloudflare Pages](https://pages.cloudflare.com)
   - Connect your Git repository

2. **Build Configuration**:
   - Build command: `npm run build`
   - Build output directory: `dist`

3. **Environment Variables**:
   - Add all required environment variables

4. **Deploy**:
   - Automatic deployments on Git push

---

### Post-Deployment Checklist

- [ ] Verify all environment variables are set
- [ ] Test movie search functionality
- [ ] Test movie details page navigation
- [ ] Verify images and videos load correctly
- [ ] Test responsive design on mobile devices
- [ ] Check trending searches functionality
- [ ] Verify error handling works
- [ ] Test loading states
- [ ] Ensure HTTPS is enabled
- [ ] Set up custom domain (optional)

### Recommended Deployment Stack

**For Production**:
- **Hosting**: Vercel or Netlify (easiest setup)
- **CDN**: Included with hosting platform
- **Database**: Appwrite Cloud
- **API**: TMDB API
- **Monitoring**: Vercel Analytics or Netlify Analytics

**For Development**:
- **Local Server**: Vite dev server
- **Environment**: Node.js 18+
- **Package Manager**: npm or yarn

---

## 📁 Project Structure

```
first-react-project/
├── public/
│   ├── hero.png
│   ├── hero-bg.png
│   └── star.svg
├── src/
│   ├── assets/
│   │   └── react.svg
│   ├── components/
│   │   ├── Moviecard.jsx      # Reusable movie card component
│   │   ├── search.jsx         # Search input component
│   │   └── spinner.jsx        # Loading spinner component
│   ├── routes/
│   │   ├── Home/
│   │   │   └── index.jsx      # Home page component
│   │   └── Movie/
│   │       └── index.jsx      # Movie details page component
│   ├── App.jsx                # Main app component with routing
│   ├── appwrite.js            # Appwrite database configuration
│   ├── config.js              # Environment variables configuration
│   ├── index.css              # Global styles and Tailwind config
│   └── main.jsx               # Application entry point
├── .env.local                 # Environment variables (not in git, local only)
├── package.json
├── vite.config.js
└── README.md
```

---

## 🎨 Design Features

- **Dark Theme**: Primary color #030014 with light accents
- **Custom Fonts**: DM Sans for body text, Bebas Neue for headings
- **Gradient Text**: Purple gradient effect on key headings
- **Responsive Design**: Mobile-first approach with breakpoints
- **Smooth Animations**: Hover effects and transitions
- **Custom Utilities**: Text gradients, fancy text effects, hidden scrollbars

---

## 📝 License

This project is private and proprietary.

---

## 👨‍💻 Author

Built with ❤️ using React and modern web technologies.

---

## 🔗 Resources

- [TMDB API Documentation](https://developer.themoviedb.org/docs)
- [React Router Documentation](https://reactrouter.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Vite Documentation](https://vite.dev/)
- [Appwrite Documentation](https://appwrite.io/docs)
