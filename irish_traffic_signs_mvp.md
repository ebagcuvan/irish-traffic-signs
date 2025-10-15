# Irish Traffic Signs - Modern Web Platform MVP

## Project Overview

Transform the existing Irish Traffic Signs website from a static HTML/CSS site into a modern, scalable, multi-user web application with user authentication, personalized content, progress tracking, and social features.

## Tech Stack

- **Frontend**: React 18+ with TypeScript, Tailwind CSS, Next.js 14+
- **Backend**: Node.js with Express.js
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT + OAuth2 (Google, GitHub optional)
- **Deployment**: Vercel (Frontend) + Railway/Render (Backend)
- **Storage**: AWS S3 or Cloudinary for images
- **Real-time Features**: WebSocket support for live quiz results

## Core Features

### 1. Authentication & User Management

- **User Registration & Login**
  - Email/Password authentication
  - Email verification system
  - Password reset functionality
  - OAuth integration (Google, GitHub)
  - User profile customization (avatar, display name, bio)
  - Account settings and privacy controls

- **User Roles**
  - Regular User
  - Admin (manage content, moderate, analytics)
  - Future: Instructor role for organizations

### 2. Enhanced Landing Page (App Landing)

- Modern hero section with call-to-action
- Feature highlights with icons and descriptions
- Stats section showing user engagement (users registered, signs mastered, quizzes taken)
- Testimonials/user reviews carousel
- FAQ section
- Newsletter subscription widget
- Responsive design for mobile/tablet/desktop
- Dark mode toggle

### 3. Traffic Signs Library

- **Sign Browsing**
  - Categorized traffic signs (warning, regulatory, mandatory, informational, etc.)
  - Advanced filtering (category, difficulty level, region)
  - Search functionality with auto-complete
  - Sign details with: image, name, meaning, context, example uses

- **Content Management**
  - Sign information includes: Irish name, English translation, description, when/where used
  - High-quality sign images
  - Historical or related information
  - Related signs suggestions

- **User Interactions**
  - One-click favorite/bookmark functionality
  - Rating system (1-5 stars with reviews)
  - Comments/discussion section on signs
  - Share sign on social media

### 4. Enhanced Favorites System

- Persistent favorites storage (database)
- Organized folders/collections (custom creation by users)
- Quick favorite/unfavorite from any page
- Bulk actions (delete, export, move to collection)
- Export favorites as PDF or image gallery
- Sharing collection with other users (public/private toggle)
- Sync across devices for logged-in users

### 5. Advanced Quiz System

- **Quiz Creation & Customization**
  - Multiple quiz types: multiple choice, true/false, matching, image identification
  - Difficulty levels: beginner, intermediate, advanced
  - Time-based quizzes and untimed quizzes
  - Spaced repetition algorithm for practice
  - Shuffle questions and answers option

- **Quiz Features**
  - Real-time progress tracking during quiz
  - Immediate feedback on answers (correct/incorrect with explanation)
  - Quiz result breakdown by category
  - Leaderboard (weekly, monthly, all-time)
  - Streak counter (consecutive correct answers)
  - Review incorrect answers after completion
  - Download quiz results as PDF

- **User Progress**
  - Quiz history with timestamps and scores
  - Performance analytics (improvement over time, weak areas)
  - Personalized recommendations based on weak areas
  - Badges and achievements system

### 6. User Dashboard/Profile

- **Profile Page**
  - User avatar, bio, join date
  - Achievement/badge display
  - Statistics: signs learned, quiz accuracy, current streak
  - Public profile option (portfolio-like for students)

- **Dashboard**
  - Quick stats overview
  - Recent activity timeline
  - Learning progress (visual charts)
  - Recommended signs to learn
  - Quick access to favorite signs
  - Active quizzes or learning sessions

### 7. Enhanced About Page

- Company/project mission and vision
- Team members (if applicable)
- Project timeline/history
- Project statistics (total signs, users, quiz attempts)
- Contact information and social media links
- Privacy policy and terms of service
- Changelog/version history
- Accessibility statement

### 8. Mobile App Screenshots Page

- Showcase responsive design capabilities
- Before/after comparison of current vs. new design
- Feature highlights with screenshots
- Links to download mobile app (if available)
- Demo video or interactive preview

### 9. Additional Pages

- **Blog/Resources Page**
  - Tips for learning traffic signs
  - Road safety articles
  - Irish driving regulations
  - Featured signs of the week

- **Contact Page**
  - Contact form with validation
  - Email notifications to admin
  - Support ticket system
  - FAQ integration

- **Learning Path Page**
  - Structured courses (e.g., "Complete Irish Traffic Signs Course")
  - Progress indicators per course
  - Milestones and certificates upon completion
  - Prerequisite signs before advanced topics

## Database Schema (Key Tables)

```
Users
  - id (UUID primary key)
  - email (unique)
  - passwordHash
  - displayName
  - avatar
  - createdAt
  - updatedAt
  - isAdmin

TrafficSigns
  - id (UUID)
  - irishName
  - englishName
  - description
  - category
  - difficultyLevel
  - imageUrl
  - context
  - relatedSignIds
  - createdAt

Favorites
  - id (UUID)
  - userId (FK)
  - signId (FK)
  - collectionId (FK)
  - createdAt

FavoriteCollections
  - id (UUID)
  - userId (FK)
  - name
  - description
  - isPublic
  - createdAt

Quizzes
  - id (UUID)
  - title
  - description
  - questions (JSON array)
  - difficultyLevel
  - createdBy (userId FK)
  - createdAt

QuizAttempts
  - id (UUID)
  - userId (FK)
  - quizId (FK)
  - score
  - totalQuestions
  - answers (JSON)
  - timeSpent
  - completedAt

Achievements
  - id (UUID)
  - userId (FK)
  - badgeName
  - description
  - earnedAt

Ratings
  - id (UUID)
  - userId (FK)
  - signId (FK)
  - rating (1-5)
  - review
  - createdAt
```

## API Endpoints (RESTful)

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - Logout
- `POST /api/auth/refresh` - Refresh token
- `POST /api/auth/forgot-password` - Password reset

### Users
- `GET /api/users/:id` - Get user profile
- `PUT /api/users/:id` - Update profile
- `GET /api/users/:id/stats` - Get user statistics
- `GET /api/users/leaderboard` - Get leaderboard

### Traffic Signs
- `GET /api/signs` - Get all signs (with filters)
- `GET /api/signs/:id` - Get single sign details
- `GET /api/signs/:id/related` - Get related signs
- `POST /api/signs/:id/rate` - Rate a sign
- `GET /api/signs/:id/ratings` - Get sign ratings

### Favorites
- `POST /api/favorites` - Add to favorites
- `DELETE /api/favorites/:id` - Remove from favorites
- `GET /api/favorites` - Get user favorites
- `POST /api/collections` - Create collection
- `GET /api/collections` - Get user collections
- `PUT /api/collections/:id` - Update collection

### Quizzes
- `GET /api/quizzes` - Get all quizzes
- `GET /api/quizzes/:id` - Get quiz details
- `POST /api/quizzes/:id/attempt` - Start quiz attempt
- `POST /api/quizzes/:id/submit` - Submit quiz answers
- `GET /api/quizzes/:id/results` - Get quiz results

## UI/UX Considerations

- **Responsive Design**: Mobile-first approach, works on all devices
- **Dark Mode**: System preference detection with toggle option
- **Accessibility**: WCAG 2.1 AA compliance, proper semantic HTML, ARIA labels
- **Performance**: Lazy loading, image optimization, code splitting
- **Loading States**: Skeleton screens, loading spinners
- **Error Handling**: User-friendly error messages, error boundaries
- **Animations**: Smooth transitions, micro-interactions without being distracting

## Security Requirements

- HTTPS only
- CSRF protection
- SQL injection prevention (Prisma)
- XSS protection
- Rate limiting on API endpoints
- Input validation and sanitization
- Secure password hashing (bcrypt)
- JWT token expiration and refresh strategy
- Environment variables for sensitive data
- CORS configuration

## Performance Targets

- Page load time: < 3 seconds
- Time to interactive: < 5 seconds
- Lighthouse score: > 90
- Mobile optimization: 90+ score
- Database query optimization with indexes

## Future Enhancements (Post-MVP)

- Mobile app (React Native)
- AI-powered personalized learning recommendations
- Social features: follow users, share progress
- Organizations/classroom management
- Gamification: levels, points system
- Multilingual support
- API for third-party integrations
- Advanced analytics dashboard
- Live tutoring/video explanations
- Mock driving tests

## File Structure

```
irish-traffic-signs/
├── frontend/
│   ├── app/
│   │   ├── page.tsx (landing)
│   │   ├── layout.tsx
│   │   ├── signs/
│   │   ├── quiz/
│   │   ├── favorites/
│   │   ├── dashboard/
│   │   ├── profile/
│   │   ├── about/
│   │   └── auth/
│   ├── components/
│   ├── lib/
│   ├── styles/
│   └── public/
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── middleware/
│   │   ├── services/
│   │   └── utils/
│   ├── prisma/
│   │   └── schema.prisma
│   └── .env.example
└── README.md
```

## Success Metrics

- User registration conversion rate > 10%
- Daily active users (DAU) growth
- Quiz completion rate > 60%
- User retention rate > 40% after 30 days
- Average session duration > 5 minutes
- Favorites creation rate per active user
- Leaderboard engagement rate
- Mobile traffic handling (50%+ of traffic)

## Deployment Checklist

- [ ] Environment variables configured
- [ ] Database migrations run
- [ ] Seed data populated (traffic signs)
- [ ] CORS configured
- [ ] Rate limiting enabled
- [ ] SSL/HTTPS configured
- [ ] Email service configured
- [ ] Image hosting configured
- [ ] CDN setup
- [ ] Monitoring and logging configured
- [ ] Backup strategy implemented