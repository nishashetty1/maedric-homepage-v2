# Maedric Homepage - v2

## Tech Stack

- **Framework**: Next.js (App Router)
- **Styling**: Tailwind CSS with custom variables
- **State Management**: Zustand for lightweight global state
- **Animations**: Framer Motion for smooth UI transitions
- **Icons**: React Icons library

## Project Structure

```
src/
├── api/             # API routes and service connections
├── app/             # Next.js App Router pages
├── components/      # React components
│   ├── layout/      # Layout components and page sections
│   └── ui/          # Reusable UI components
├── hooks/           # Custom React hooks
├── store/           # Zustand state stores
├── styles/          # Global styles and Tailwind configuration
└── utils/           # Utility functions and helpers
```

## Component System

The project follows a modular component architecture:

### Layout Components
- `Header` - Main navigation with mega-menu
- `Footer` - Site footer with navigation, newsletter, and social links
- Section components for homepage (Hero, Features, etc.)

### UI Components
- Basic UI elements (Button, Typography, etc.)
- Specialized components for consultation, sliders, etc.

## State Management

The application uses Zustand for state management with separate stores for different features:

- `headerStore` - Header and navigation state
- `megaMenuStore` - Mega-menu configuration and state
- `footerStore` - Footer links and configuration
- `sliderStore` - Product and category slider data
- `consultationStore` - Multi-step consultation form state
- `scrollToTopStore` - Scroll position tracking for the scroll-to-top button
- `testimonialStore` - Testimonial data and slider state
- `processStore` - Process section state and animation
- `tabStore` - Tab component state management

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/nishashetty1/maedric-homepage-v2
cd maedric-homepage-v2
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

The site will be available at http://localhost:3000


## Styling Approach

The project uses a combination of:
- Tailwind CSS for utility-based styling
- CSS variables for consistent theming
- CSS modules for component-specific styles when needed

Core theme colors are defined as CSS variables in `globals.css`:
- Primary: Deep blue (#051E33)
- Secondary: Off-white (#F5F5F5)
- Accent: Gold (#C8A951)
- Tertiary light: Light blue-gray (#E7EAEE)

## Deployment

The project is configured for seamless deployment on Vercel or similar platforms that support Next.js.

## Best Practices

- Keep components small and focused on a single responsibility
- Use Zustand stores for shared state between components
- Follow responsive design principles (mobile-first approach)
- Use semantic HTML elements for better accessibility
- Optimize images for performance using Next.js Image component