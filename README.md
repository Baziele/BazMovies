# bazMovies

A modern movie discovery and streaming platform built with Next.js 15, React 19, and TypeScript. Features an intuitive interface for browsing movies and TV shows, with personalized watchlists, favorites, and interactive features.

## 🚀 Features

-   🎬 Movie and TV show discovery
-   👤 User profiles with personalized recommendations
-   📺 Video streaming capabilities
-   📱 Responsive design
-   🎮 Interactive 404 page with custom mini-game
-   🌙 Dark/Light theme support
-   🎭 News section for latest entertainment updates
-   📋 Watchlist and favorites management
-   📊 User viewing history
-   💳 Billing management

## 🛠️ Tech Stack

-   **Framework:** Next.js 15
-   **UI:** React 19, Tailwind CSS
-   **Components:** Radix UI, Shadcn UI
-   **Styling:** Tailwind CSS with animations
-   **Icons:** Lucide React
-   **Forms:** React Hook Form, Zod
-   **State Management:** React Hooks
-   **Charts:** Recharts
-   **Carousel:** Embla Carousel
-   **Typography:** Class Variance Authority
-   **Theme:** Next-themes

## 🔑 Prerequisites

### TMDB API Key

This project uses The Movie Database (TMDB) API to fetch movie and TV show data. To run the project, you'll need to:

1. Sign up for a TMDB account at https://www.themoviedb.org/signup
2. Go to your account settings
3. Click on "API" in the left sidebar
4. Follow the steps to request an API key
5. Create a `.env.local` file in the project root and add your API key:
    ```
    TMDB_API_KEY=your_api_key_here
    ```

## 🏃‍♂️ Getting Started

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/bazMovies.git
cd bazMovies
```

2. **Install dependencies**

```bash
pnpm install
```

3. **Run the development server**

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 📁 Project Structure

```
app/              # Next.js app router pages and layouts
components/       # Reusable UI components
hooks/           # Custom React hooks
lib/             # Utility functions and types
public/          # Static assets
styles/          # Global styles
```

## 🔧 Configuration

The project uses several configuration files:

-   `next.config.mjs` - Next.js configuration
-   `tailwind.config.ts` - Tailwind CSS configuration
-   `components.json` - Shadcn UI components configuration
-   `tsconfig.json` - TypeScript configuration

## 🗺️ Roadmap

### Authentication & User Management

-   [ ] Implement real authentication with JWT using Supabase
-   [ ] Social login (Google, GitHub)
-   [ ] Email verification
-   [ ] Password reset functionality
-   [x] User profile management

### Streaming Features

-   [ ] Implement real video streaming functionality
-   [x] Video quality selection
-   [ ] Subtitle support
-   [x] Custom video player with advanced controls
-   [x] Resume watching functionality
-   [x] Autoplay next episode feature

### Social Features

-   [ ] User reviews and ratings
-   [ ] Comments system
-   [x] Share functionality for social media
-   [ ] Friend system
-   [x] Personal recommendations

### Data Management

-   [ ] Backend API implementation with Supabase
-   [ ] Database integration with Supabase
-   [ ] User data persistence
-   [x] Watchlist sync across devices
-   [x] Viewing history tracking

### Payment Integration

-   [x] Subscription system implementation
-   [ ] Payment gateway integration
-   [x] Multiple subscription tiers
-   [x] Billing history
-   [x] Cancel/upgrade subscription flow

### Performance & Infrastructure

-   [ ] Image optimization
-   [ ] Caching implementation
-   [x] Error boundary implementation
-   [x] Loading state improvements
-   [ ] SEO optimization
-   [ ] Analytics integration

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

Built with ❤️ using Next.js and React
