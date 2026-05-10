# Study Hub - Setup Guide

Complete setup instructions for the Study Hub application.

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- Firebase account
- MongoDB (or MongoDB Atlas)

## Backend Setup

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the `backend` directory:

```bash
cp .env.example .env
```

Fill in the required values:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/study-hub
JWT_SECRET=your_secret_key_here
FIREBASE_PROJECT_ID=your_project_id
# ... add other Firebase credentials
```

### 3. Start MongoDB

```bash
# If using local MongoDB
mongod

# Or use MongoDB Atlas connection string in .env
```

### 4. Start the Backend Server

```bash
npm run dev
```

The server will start at `http://localhost:5000`

## Mobile App Setup

### 1. Install Dependencies

```bash
cd mobile
npm install
# or
yarn install
```

### 2. Configure Environment Variables

Create a `.env` file in the `mobile` directory:

```bash
cp .env.example .env
```

Fill in the Firebase and API configuration:

```env
REACT_APP_API_BASE_URL=http://localhost:5000/api
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
# ... add other Firebase credentials
```

### 3. Start the App

```bash
# Start Expo development server
npm start

# For iOS simulator
npm run ios

# For Android emulator
npm run android

# For web (development)
npm run web
```

### 4. Using Expo Go (Mobile)

- Download Expo Go app from App Store or Google Play
- Scan the QR code displayed in terminal
- App will load on your phone

## Firebase Setup

### 1. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create a new project
3. Enable authentication (Email/Password)
4. Create Firestore database
5. Set up Storage for media files

### 2. Get Firebase Credentials

- Go to Project Settings
- Download service account key (for backend)
- Copy Web SDK config (for frontend)

### 3. Update Configuration Files

Add Firebase credentials to both backend and mobile `.env` files.

## Database Setup

### Using MongoDB Atlas (Recommended)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create a database user
4. Get connection string
5. Add to backend `.env`:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/study-hub
```

### Using Local MongoDB

1. Install MongoDB Community Edition
2. Start MongoDB service
3. Update `.env`:

```env
MONGODB_URI=mongodb://localhost:27017/study-hub
```

## API Testing

### Using Postman

1. Import the API endpoints
2. Set up environment variables
3. Test endpoints with JWT authentication

### Health Check

```bash
curl http://localhost:5000/api/health
```

Expected response:
```json
{
  "success": true,
  "message": "Study Hub Backend is running"
}
```

## Common Issues

### Port Already in Use

```bash
# Kill process on port 5000
lsof -i :5000
kill -9 <PID>
```

### MongoDB Connection Error

- Verify MongoDB is running
- Check connection string in `.env`
- Ensure IP whitelist in MongoDB Atlas (for cloud)

### Expo Go Issues

- Update Expo CLI: `npm install -g expo-cli@latest`
- Clear cache: `expo start --clear`
- Check Node.js version compatibility

### Firebase Configuration

- Verify Firebase credentials are correct
- Enable necessary APIs in Firebase Console
- Check authentication providers are enabled

## Development Workflow

1. Make changes to code
2. Backend changes automatically reload with nodemon
3. Mobile app hot reloads in Expo
4. Test thoroughly before committing

## Building for Production

### Android APK

```bash
cd mobile
expo build:android
```

### iOS App

```bash
cd mobile
expo build:ios
```

### Backend Deployment

Deploy to services like:
- Heroku
- AWS
- DigitalOcean
- Render

See deployment documentation for specific instructions.

## Next Steps

1. Review API documentation in `docs/API.md`
2. Check database schema in `docs/DATABASE_SCHEMA.md`
3. Review architecture in `docs/ARCHITECTURE.md`
4. Start developing features!
