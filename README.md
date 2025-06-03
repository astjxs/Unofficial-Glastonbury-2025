# Glastonbury 2025 Festival Schedule Planner

A React-based festival schedule planner that lets users select artists from Glastonbury 2025 setlists and generates personalized viewing schedules with intelligent conflict detection.

## Features

- **Comprehensive Artist Database**: Complete Glastonbury 2025 lineup with all stages and times
- **Smart Conflict Detection**: Automatically detects time overlaps and suggests alternatives
- **Responsive Design**: Mobile-first design with prominent search on mobile devices
- **Real-time Search**: Filter artists by name or stage instantly
- **Personal Schedule**: Build and manage your custom festival schedule
- **Export Functionality**: Download your schedule as a text file
- **Dark/Light Theme**: Toggle between themes with system preference support
- **Stage Color Coding**: Visual identification of different festival stages

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS, Shadcn/ui
- **Backend**: Express.js, TypeScript
- **Data Management**: In-memory storage with Drizzle schema
- **Build Tool**: Vite
- **State Management**: React Query (TanStack Query)
- **Routing**: Wouter

## Getting Started

### Prerequisites

- Node.js 20 or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/astjxs/Unofficial-Glastonbury-2025.git
cd Unofficial-Glastonbury-2025
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

## Project Structure

```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── lib/            # Utility functions and configurations
│   │   └── hooks/          # Custom React hooks
├── server/                 # Backend Express server
│   ├── index.ts           # Server entry point
│   ├── routes.ts          # API routes
│   ├── storage.ts         # Data storage layer
│   └── vite.ts            # Vite integration
├── shared/                 # Shared types and schemas
│   └── schema.ts          # Database schema definitions
└── attached_assets/        # Original setlist data
```

## API Endpoints

- `GET /api/artists` - Get all artists
- `POST /api/artists` - Create a new artist
- `GET /api/selections` - Get user selections
- `POST /api/selections` - Add artist selection
- `DELETE /api/selections/:artistId` - Remove artist selection

## Features in Detail

### Artist Selection
- Browse artists by day and stage
- Visual indicators for selected artists
- Conflict warnings for overlapping times

### Search & Filtering
- Real-time search by artist name or stage
- Filter by specific days (Thursday-Sunday)
- Filter by stage (Pyramid, Other, West Holts, etc.)

### Conflict Detection
- Automatically detects time overlaps
- Shows conflict dialog with options to:
  - Keep both artists (accept conflict)
  - Replace conflicting artist
  - Cancel selection

### Mobile Experience
- Prominent search bar on mobile
- Responsive filters that stack vertically
- Touch-friendly interface
- Compact header with essential controls

## Deployment

### GitHub Pages (Static)
This app requires a backend server, so GitHub Pages won't work for the full application.

### Vercel/Netlify (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel or Netlify
3. Set build command: `npm run build`
4. Deploy

### Docker Deployment
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Commit: `git commit -am 'Add feature'`
5. Push: `git push origin feature-name`
6. Submit a pull request

## Data Source

The festival data is parsed from the official Glastonbury 2025 setlist, including:
- 10+ stages across the festival site
- 4 days of performances (Thursday-Sunday)
- Accurate start/end times for all acts
- Stage-specific color coding

## License

This project is open source and available under the MIT License.

## Acknowledgments

- Glastonbury Festival for the amazing lineup
- Shadcn/ui for the beautiful component library
- React and Vite communities for excellent tooling