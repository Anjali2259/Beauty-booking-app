# BeautyBook - Beauty Service Booking Platform

A comprehensive full-stack web application for booking beauty services, connecting customers with salons and individual beauty service providers.

## 🌟 Features

### For Customers
- **Service Discovery**: Browse and search through various beauty services
- **Provider Profiles**: View detailed information about service providers
- **Easy Booking**: Book appointments with real-time availability
- **Booking Management**: View, modify, and cancel bookings
- **Reviews & Ratings**: Rate and review completed services

### For Service Providers
- **Provider Dashboard**: Comprehensive business management interface
- **Service Management**: Add, edit, and manage service offerings
- **Booking Management**: Accept, confirm, and manage appointments
- **Business Analytics**: View booking statistics and revenue insights
- **Profile Management**: Maintain business information and portfolio

### For Both
- **Secure Authentication**: JWT-based authentication system
- **Profile Management**: User account and preference management
- **Real-time Notifications**: Email and SMS notifications for bookings
- **Payment Integration**: Secure payment processing with Stripe
- **Mobile Responsive**: Optimized for all devices

## 🛠 Tech Stack

### Backend
- **Node.js** with Express.js framework
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **bcryptjs** for password hashing
- **Express Validator** for input validation
- **Nodemailer** for email notifications
- **Stripe** for payment processing
- **Moment.js** for date/time handling

### Frontend
- **React 18** with TypeScript
- **Material-UI (MUI)** for component library
- **React Router** for navigation
- **React Query** for state management and API calls
- **React Hook Form** with Yup validation
- **Framer Motion** for animations
- **Axios** for HTTP requests
- **Day.js** for date handling

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- npm or yarn
- MongoDB (v4.4 or higher)
- Git

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/beauty-booking-app.git
cd beauty-booking-app
```

### 2. Install Dependencies
```bash
# Install root dependencies
npm install

# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### 3. Environment Configuration

#### Server Environment Variables
Create a `.env` file in the `server` directory based on `.env.example`:

```bash
cd server
cp .env.example .env
```

Update the `.env` file with your configuration:
```env
# Database
MONGODB_URI=mongodb://localhost:27017/beauty-booking

# JWT Secret (generate a secure random string)
JWT_SECRET=your-super-secret-jwt-key-here

# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
```

#### Client Environment Variables
Create a `.env` file in the `client` directory:
```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
```

### 4. Start MongoDB
Make sure MongoDB is running on your system:
```bash
# On macOS with Homebrew
brew services start mongodb-community

# On Ubuntu/Debian
sudo systemctl start mongod

# On Windows, start MongoDB as a service or run:
mongod
```

### 5. Run the Application

#### Development Mode (Both Frontend and Backend)
From the root directory:
```bash
npm run dev
```

This will start:
- Backend server on `http://localhost:5000`
- Frontend React app on `http://localhost:3000`

#### Run Separately
```bash
# Backend only
npm run server

# Frontend only  
npm run client
```

## 📖 API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password

### User Management
- `GET /api/users` - Get all users (admin only)
- `PUT /api/users/profile` - Update user profile
- `PUT /api/users/change-password` - Change password
- `DELETE /api/users/account` - Delete user account

### Services
- `GET /api/services` - Get all services (with filtering)
- `GET /api/services/:id` - Get service by ID
- `POST /api/services` - Create new service (provider only)
- `PUT /api/services/:id` - Update service (provider only)
- `DELETE /api/services/:id` - Delete service (provider only)

### Providers
- `GET /api/providers` - Get all providers
- `GET /api/providers/:id` - Get provider by ID
- `POST /api/providers/profile` - Create provider profile
- `PUT /api/providers/profile` - Update provider profile
- `GET /api/providers/dashboard/stats` - Get dashboard statistics

### Bookings
- `POST /api/bookings` - Create new booking
- `GET /api/bookings/my-bookings` - Get user's bookings
- `GET /api/bookings/provider-bookings` - Get provider's bookings
- `GET /api/bookings/:id` - Get booking by ID
- `PUT /api/bookings/:id/status` - Update booking status
- `PUT /api/bookings/:id/cancel` - Cancel booking
- `GET /api/bookings/availability/:providerId/:serviceId` - Check availability

## 🏗 Project Structure

```
beauty-booking-app/
├── client/                     # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   │   ├── Auth/
│   │   │   └── Layout/
│   │   ├── contexts/           # React contexts
│   │   ├── pages/              # Page components
│   │   │   ├── Auth/
│   │   │   ├── Booking/
│   │   │   ├── Dashboard/
│   │   │   ├── Providers/
│   │   │   └── Services/
│   │   ├── types/              # TypeScript type definitions
│   │   └── utils/              # Utility functions
│   └── package.json
├── server/                     # Node.js backend
│   ├── models/                 # MongoDB models
│   ├── routes/                 # API routes
│   ├── middleware/             # Custom middleware
│   ├── utils/                  # Utility functions
│   ├── index.js               # Server entry point
│   └── package.json
├── package.json               # Root package.json
└── README.md
```

## 🌐 Database Schema

### User Model
- Personal information (name, email, phone)
- Authentication (password, verification)
- Role-based access (customer, provider, admin)
- Preferences and settings

### Provider Model
- Business information
- Location and contact details
- Specializations and services
- Business hours and settings
- Verification status

### Service Model
- Service details (name, description, category)
- Pricing and duration
- Provider association
- Booking settings and requirements

### Booking Model
- Customer and provider references
- Service and appointment details
- Status tracking and notes
- Payment and cancellation information

## 🔐 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt for secure password storage
- **Input Validation**: Comprehensive validation using express-validator
- **Rate Limiting**: Protection against API abuse
- **CORS Protection**: Configured for secure cross-origin requests
- **Helmet**: Security headers for Express apps

## 🚀 Deployment

### Backend Deployment (Heroku)
1. Install Heroku CLI
2. Create a new Heroku app
3. Set environment variables
4. Deploy:
```bash
git subtree push --prefix server heroku main
```

### Frontend Deployment (Vercel/Netlify)
1. Build the React app: `npm run build`
2. Deploy the `build` folder to your preferred hosting platform

### Database (MongoDB Atlas)
1. Create a MongoDB Atlas cluster
2. Update `MONGODB_URI` in your environment variables

## 🧪 Testing

```bash
# Run backend tests
cd server
npm test

# Run frontend tests
cd client
npm test
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit your changes: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support, email support@beautybook.com or create an issue on GitHub.

## 🙏 Acknowledgments

- Material-UI team for the excellent component library
- The React and Node.js communities
- All contributors who helped make this project possible 
