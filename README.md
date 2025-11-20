# 🎬 Movie Finder

A modern movie discovery app built with Next.js 15, featuring TMDB API integration, beautiful UI with Tailwind CSS and shadcn/ui, and smooth animations with Framer Motion.

## ✨ Features

- 🔍 **Search Movies** - Search through millions of movies
- 🔥 **Trending Movies** - Discover what's popular right now
- ⭐ **Movie Details** - View comprehensive movie information including:
  - Title, poster, and backdrop images
  - Rating and vote count
  - Release date and runtime
  - Genres and overview
  - Main cast (top 5 actors)
  - Popularity ranking
- 🎥 **Trailer Integration** - Watch movie trailers directly in the app
- ❤️ **Favorites** - Save your favorite movies (stored in localStorage)
- 📱 **Responsive Design** - Works beautifully on all devices
- 🎨 **Modern UI** - Built with Tailwind CSS and shadcn/ui components
- ✨ **Smooth Animations** - Powered by Framer Motion

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- TMDB API key (free at [themoviedb.org](https://www.themoviedb.org/settings/api))

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd movie-finder
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_TMDB_API_KEY=your_tmdb_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Animations**: Framer Motion
- **API**: TMDB (The Movie Database)
- **Icons**: Lucide React
- **State Management**: React Hooks + localStorage

## 📁 Project Structure

```
movie-finder/
├── app/
│   ├── layout.tsx          # Root layout with navigation
│   ├── page.tsx            # Home page with trending movies
│   ├── search/
│   │   └── page.tsx        # Search results page
│   ├── movie/
│   │   └── [id]/
│   │       └── page.tsx    # Movie details page
│   └── favorites/
│       └── page.tsx        # Favorites page
├── components/
│   ├── ui/                 # shadcn/ui components
│   ├── movie-card.tsx      # Movie card component
│   ├── movie-details.tsx   # Movie details component
│   ├── search-bar.tsx      # Search input component
│   └── search-results.tsx  # Search results component
├── lib/
│   ├── tmdb.ts            # TMDB API functions
│   ├── favorites.ts        # Favorites management
│   └── utils.ts           # Utility functions
└── public/                # Static assets
```

## 🎯 Usage

1. **Browse Trending Movies**: Visit the home page to see trending movies
2. **Search**: Use the search bar to find specific movies
3. **View Details**: Click on any movie card to see full details
4. **Watch Trailer**: Click "Watch Trailer" button on movie details page
5. **Add to Favorites**: Click the heart icon on any movie card
6. **View Favorites**: Navigate to the Favorites page from the header

## 🌐 Live Demo

The app is deployed and available at: **[https://movie-finder-rose-ten.vercel.app/](https://movie-finder-five-henna.vercel.app/)**

## 👤 Author

**El Yazid** ([@Dizay1957](https://github.com/Dizay1957))

## 📝 License

MIT License - feel free to use this project for your own purposes!

## 🙏 Acknowledgments

- [The Movie Database (TMDB)](https://www.themoviedb.org/) for the amazing API
- [shadcn/ui](https://ui.shadcn.com/) for the beautiful component library
- [Framer Motion](https://www.framer.com/motion/) for smooth animations

