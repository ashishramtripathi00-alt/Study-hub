# Study Hub API Documentation

Complete API endpoints for Study Hub backend.

## Authentication Endpoints

### Sign Up
- **POST** `/api/auth/signup`
- Create a new user account

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response:**
```json
{
  "success": true,
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### Login
- **POST** `/api/auth/login`
- Authenticate user

```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response:** Same as Sign Up

### Validate Token
- **GET** `/api/auth/validate`
- Validate JWT token (requires authentication header)

**Headers:**
```
Authorization: Bearer jwt_token_here
```

## Course Endpoints

### Get All Courses
- **GET** `/api/courses`
- Fetch all courses with filters

**Query Parameters:**
- `category` - Filter by category (JEE Main, NEET, etc.)
- `difficulty` - Filter by difficulty (Beginner, Intermediate, Advanced)
- `search` - Search by course name
- `page` - Pagination page number
- `limit` - Items per page

**Response:**
```json
{
  "success": true,
  "courses": [
    {
      "id": "course_id",
      "title": "JEE Main Physics",
      "description": "Complete Physics course for JEE Main",
      "category": "JEE Main",
      "difficulty": "Intermediate",
      "isFree": true,
      "totalVideos": 150,
      "totalDuration": 500,
      "rating": 4.8,
      "thumbnail": "url"
    }
  ]
}
```

### Get Course Details
- **GET** `/api/courses/:courseId`
- Get detailed information about a course

**Response:**
```json
{
  "success": true,
  "course": {
    "id": "course_id",
    "title": "JEE Main Physics",
    "description": "...",
    "chapters": [
      {
        "id": "chapter_1",
        "title": "Mechanics",
        "videos": [...]
      }
    ],
    "videos": [...],
    "instructor": {...},
    "reviews": [...]
  }
}
```

### Enroll in Course
- **POST** `/api/courses/:courseId/enroll`
- Enroll user in a course (requires authentication)

**Response:**
```json
{
  "success": true,
  "message": "Successfully enrolled in course"
}
```

## Video Endpoints

### Get Course Videos
- **GET** `/api/courses/:courseId/videos`
- Get all videos for a course

**Query Parameters:**
- `chapter` - Filter by chapter ID
- `page` - Pagination

**Response:**
```json
{
  "success": true,
  "videos": [
    {
      "id": "video_id",
      "title": "Introduction to Motion",
      "duration": 1200,
      "quality": "720p",
      "videoUrl": "https://...",
      "thumbnailUrl": "https://...",
      "sequence": 1,
      "isFree": true
    }
  ]
}
```

### Get Video Details
- **GET** `/api/videos/:videoId`
- Get detailed information about a video

**Response:**
```json
{
  "success": true,
  "video": {
    "id": "video_id",
    "title": "Introduction to Motion",
    "description": "...",
    "duration": 1200,
    "videoUrl": "https://...",
    "subtitles": [
      {
        "language": "English",
        "url": "https://..."
      }
    ],
    "resources": [
      {
        "title": "Lecture Notes",
        "url": "https://...",
        "type": "pdf"
      }
    ]
  }
}
```

## Progress Endpoints

### Update Video Progress
- **POST** `/api/progress/:videoId`
- Update user's watch progress

```json
{
  "watchedDuration": 600,
  "totalDuration": 1200
}
```

**Response:**
```json
{
  "success": true,
  "progress": {
    "videoId": "video_id",
    "watchedDuration": 600,
    "totalDuration": 1200,
    "completionPercentage": 50,
    "isCompleted": false
  }
}
```

### Get User Progress
- **GET** `/api/progress/user`
- Get all progress records for authenticated user

**Response:**
```json
{
  "success": true,
  "progress": [
    {
      "videoId": "video_id",
      "courseId": "course_id",
      "completionPercentage": 50,
      "isCompleted": false,
      "lastWatchedAt": "2024-01-01T10:00:00Z"
    }
  ]
}
```

### Get Course Progress
- **GET** `/api/progress/course/:courseId`
- Get progress for a specific course

## User Endpoints

### Get User Profile
- **GET** `/api/users/:userId`
- Get user profile information

**Response:**
```json
{
  "success": true,
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "profilePicture": "url",
    "enrolledCourses": [...],
    "completedCourses": [...],
    "createdAt": "2024-01-01T00:00:00Z"
  }
}
```

### Update User Profile
- **PUT** `/api/users/:userId`
- Update user profile (requires authentication)

```json
{
  "name": "John Updated",
  "bio": "Physics enthusiast",
  "phoneNumber": "+1234567890"
}
```

### Upload Profile Picture
- **POST** `/api/users/:userId/avatar`
- Upload user profile picture

**Form Data:**
```
Content-Type: multipart/form-data
avatar: [image_file]
```

## Search Endpoints

### Search Courses
- **GET** `/api/search/courses`
- Search courses by title, description

**Query Parameters:**
- `q` - Search query
- `category` - Filter by category
- `difficulty` - Filter by difficulty

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "message": "Invalid request parameters"
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "message": "Authentication required"
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## Authentication

All authenticated endpoints require the JWT token in the Authorization header:

```
Authorization: Bearer <jwt_token>
```

## Rate Limiting

API endpoints are rate limited to prevent abuse:
- 100 requests per minute for public endpoints
- 500 requests per minute for authenticated endpoints

## Pagination

List endpoints support pagination:
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 20, max: 100)

## Response Format

All responses follow a consistent format:

```json
{
  "success": true/false,
  "message": "Response message",
  "data": {...}
}
```

## Versioning

Current API version: **v1**

Future versions will use `/api/v2/` prefix while maintaining backward compatibility.
