# Irish Traffic Signs - Modern Web Platform

A comprehensive web application for learning Irish traffic signs with interactive quizzes, progress tracking, and personalized learning paths.

## 🚀 Features

- **Comprehensive Sign Library**: 200+ Irish traffic signs with detailed explanations
- **Interactive Quizzes**: Multiple quiz types with difficulty levels
- **Progress Tracking**: Detailed analytics and achievement system
- **Personalized Learning**: Favorites, collections, and custom learning paths
- **Responsive Design**: Works perfectly on all devices
- **Dark Mode**: System preference detection with manual toggle
- **User Authentication**: Secure JWT-based authentication
- **Real-time Features**: Live quiz results and progress updates

## 🛠 Tech Stack

### Frontend
- **Next.js 14** with App Router
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **React Query** for data fetching
- **React Hook Form** for form handling

### Backend
- **Node.js** with Express
- **TypeScript** for type safety
- **PostgreSQL** database
- **Prisma ORM** for database operations
- **JWT** for authentication
- **bcryptjs** for password hashing

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- PostgreSQL 13+
- npm or yarn

### 1. Clone the repository
```bash
git clone https://github.com/your-username/irish-traffic-signs.git
cd irish-traffic-signs
```

### 2. Install dependencies
```bash
npm run install:all
```

### 3. Environment Setup

#### Backend Environment
```bash
cd backend
cp env.example .env
```

Edit `backend/.env` with your configuration:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/irish_traffic_signs"
JWT_SECRET="your-super-secret-jwt-key-here"
JWT_EXPIRES_IN="7d"
PORT=3001
NODE_ENV="development"
CORS_ORIGIN="http://localhost:3000"
```

#### Frontend Environment
```bash
cd frontend
```

Create `frontend/.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### 4. Database Setup
```bash
# Generate Prisma client
npm run db:generate

# Push database schema
npm run db:push

# Seed the database with sample data
npm run db:seed

# Or load signs from your JSON file
npm run load:signs
```

### 5. Start Development Servers
```bash
# Start both frontend and backend
npm run dev

# Or start individually
npm run dev:frontend  # Frontend on http://localhost:3000
npm run dev:backend   # Backend on http://localhost:3001
```

## 🗄 Database Schema

The application uses the following main entities:

- **Users**: User accounts with authentication
- **TrafficSigns**: Irish traffic signs with metadata
- **Favorites**: User's favorite signs
- **FavoriteCollections**: Organized collections of favorites
- **Quizzes**: Interactive quiz content
- **QuizAttempts**: User quiz attempts and scores
- **Achievements**: User achievements and badges
- **Ratings**: User ratings and reviews for signs

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `POST /api/auth/refresh` - Refresh token

### Traffic Signs
- `GET /api/signs` - Get all signs (with filtering)
- `GET /api/signs/:id` - Get single sign
- `GET /api/signs/:id/related` - Get related signs

### Favorites
- `GET /api/favorites` - Get user favorites
- `POST /api/favorites` - Add to favorites
- `DELETE /api/favorites/:id` - Remove from favorites

### Quizzes
- `GET /api/quizzes` - Get all quizzes
- `GET /api/quizzes/:id` - Get quiz details
- `POST /api/quizzes/:id/attempt` - Start quiz attempt
- `POST /api/quizzes/:id/submit` - Submit quiz answers

## 🎨 UI Components

The application includes a comprehensive set of reusable components:

- **Layout Components**: Header, Footer, Navigation
- **UI Components**: Button, Input, Card, Modal
- **Feature Components**: SignCard, QuizInterface, ProgressTracker
- **Landing Page**: Hero, Features, Testimonials, FAQ

## 🚀 Deployment

### Frontend (Vercel)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Backend (Railway/Render)
1. Connect your GitHub repository
2. Set environment variables
3. Configure PostgreSQL database
4. Deploy with automatic builds

### Database
- Use a managed PostgreSQL service (Railway, Supabase, or AWS RDS)
- Run migrations: `npm run db:push`
- Seed data: `npm run db:seed`

## 📱 Mobile Support

The application is fully responsive and includes:
- Mobile-first design approach
- Touch-friendly interactions
- Optimized images and assets
- Progressive Web App features

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Rate limiting on API endpoints
- CORS configuration
- Input validation and sanitization
- SQL injection prevention (Prisma)

## 🧪 Testing

```bash
# Run frontend tests
cd frontend
npm test

# Run backend tests
cd backend
npm test

# Run all tests
npm run test:all
```

## 📊 Performance

- Lighthouse score: 90+
- Page load time: < 3 seconds
- Time to interactive: < 5 seconds
- Mobile optimization: 90+ score
- Database query optimization with indexes

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support, email support@irishtrafficsigns.ie or create an issue on GitHub.

## 🎯 Roadmap

- [ ] Mobile app (React Native)
- [ ] AI-powered recommendations
- [ ] Social features and sharing
- [ ] Advanced analytics dashboard
- [ ] Multilingual support
- [ ] API for third-party integrations

---

Made with ❤️ for Irish drivers
