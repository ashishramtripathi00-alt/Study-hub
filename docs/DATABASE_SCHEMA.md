# Study Hub Database Schema

Complete MongoDB database schema for Study Hub application.

## Collections

### Users Collection

Stores user account and profile information.

```javascript
{
  _id: ObjectId,
  name: String (required),
  email: String (required, unique),
  password: String (hashed, required),
  profilePicture: String (URL),
  bio: String,
  phoneNumber: String,
  enrolledCourses: [ObjectId], // References to Course
  downloadedVideos: [ObjectId], // References to Video
  watchlist: [ObjectId], // References to Video
  isActive: Boolean (default: true),
  role: String (enum: ['user', 'admin', 'instructor'], default: 'user'),
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes:**
- `email` (unique)
- `createdAt` (for sorting)

---

### Courses Collection

Stores course information and metadata.

```javascript
{
  _id: ObjectId,
  title: String (required),
  description: String (required),
  category: String (enum: ['JEE Main', 'JEE Advanced', 'NEET', 'Class 11', 'Class 12', ...]),
  difficulty: String (enum: ['Beginner', 'Intermediate', 'Advanced']),
  thumbnail: String (URL),
  instructor: ObjectId (Reference to User),
  isFree: Boolean (default: true),
  originalPrice: Number (default: 0),
  chapters: [
    {
      chapterId: ObjectId,
      title: String,
      description: String,
      videoCount: Number
    }
  ],
  totalVideos: Number,
  totalDuration: Number, // in minutes
  enrollmentCount: Number,
  rating: Number (min: 0, max: 5),
  reviews: [
    {
      userId: ObjectId,
      rating: Number,
      comment: String,
      createdAt: Date
    }
  ],
  tags: [String],
  language: String (default: 'English'),
  isActive: Boolean (default: true),
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes:**
- `category` + `difficulty`
- `title` (text search) + `description` (text search)
- `instructor`

---

### Videos Collection

Stores video content and streaming information.

```javascript
{
  _id: ObjectId,
  title: String (required),
  description: String,
  courseId: ObjectId (Reference to Course, required),
  chapterId: String (required),
  videoUrl: String (HLS stream URL, required),
  thumbnailUrl: String,
  duration: Number (in seconds, required),
  fileSize: Number (in bytes),
  quality: String (enum: ['360p', '480p', '720p', '1080p'], default: '720p'),
  sequence: Number (required),
  views: Number (default: 0),
  isFree: Boolean (default: true),
  isActive: Boolean (default: true),
  isDownloadable: Boolean (default: true),
  subtitles: [
    {
      language: String,
      url: String (VTT format)
    }
  ],
  resources: [
    {
      title: String,
      url: String,
      type: String (pdf, doc, zip, etc)
    }
  ],
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes:**
- `courseId` + `sequence`
- `title` (text search) + `description` (text search)
- `createdAt`

---

### Progress Collection

Tracks user's learning progress.

```javascript
{
  _id: ObjectId,
  userId: ObjectId (Reference to User, required),
  courseId: ObjectId (Reference to Course, required),
  videoId: ObjectId (Reference to Video, required),
  watchedDuration: Number (in seconds, default: 0),
  totalDuration: Number (in seconds),
  isCompleted: Boolean (default: false),
  completionPercentage: Number (0-100, auto-calculated),
  lastWatchedAt: Date,
  completedAt: Date,
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes:**
- `userId` + `courseId` + `videoId` (unique compound)
- `userId` + `courseId`
- `userId` + `isCompleted`
- `lastWatchedAt` (for recent activity)

---

### Assignments Collection

Stores assignments and practice problems.

```javascript
{
  _id: ObjectId,
  courseId: ObjectId (Reference to Course, required),
  title: String (required),
  description: String,
  dueDate: Date,
  totalPoints: Number,
  questions: [
    {
      id: ObjectId,
      type: String (enum: ['mcq', 'short-answer', 'long-answer']),
      question: String,
      options: [String], // For MCQ
      correctAnswer: String/Number,
      explanation: String,
      points: Number
    }
  ],
  createdAt: Date,
  updatedAt: Date
}
```

---

### Submissions Collection

Tracks assignment submissions.

```javascript
{
  _id: ObjectId,
  assignmentId: ObjectId (Reference to Assignment),
  userId: ObjectId (Reference to User),
  courseId: ObjectId (Reference to Course),
  answers: [
    {
      questionId: ObjectId,
      userAnswer: String/Number,
      isCorrect: Boolean,
      pointsAwarded: Number
    }
  ],
  totalScore: Number,
  submittedAt: Date,
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes:**
- `assignmentId` + `userId` (unique)
- `userId` + `courseId`

---

### Downloads Collection

Tracks downloaded videos for offline access.

```javascript
{
  _id: ObjectId,
  userId: ObjectId (Reference to User),
  videoId: ObjectId (Reference to Video),
  courseId: ObjectId (Reference to Course),
  fileName: String,
  fileSize: Number (in bytes),
  localPath: String (device storage path),
  quality: String,
  downloadedAt: Date,
  expiresAt: Date,
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes:**
- `userId` + `videoId`
- `userId`
- `expiresAt` (for cleanup)

---

### Announcements Collection

Stores course announcements and notifications.

```javascript
{
  _id: ObjectId,
  courseId: ObjectId (Reference to Course),
  instructorId: ObjectId (Reference to User),
  title: String (required),
  content: String (required),
  image: String (URL),
  isPinned: Boolean (default: false),
  recipients: [ObjectId], // User IDs
  createdAt: Date,
  updatedAt: Date
}
```

---

### Doubts Collection

Tracks doubt/question discussions.

```javascript
{
  _id: ObjectId,
  userId: ObjectId (Reference to User),
  courseId: ObjectId (Reference to Course),
  videoId: ObjectId (Reference to Video),
  title: String (required),
  description: String (required),
  attachments: [String], // URLs
  isResolved: Boolean (default: false),
  replies: [
    {
      id: ObjectId,
      userId: ObjectId,
      comment: String,
      attachments: [String],
      createdAt: Date
    }
  ],
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes:**
- `courseId`
- `userId`
- `isResolved`

---

## Relationships

```
User (1) ------(M)------ Course (enrolled)
   |                          |
   |                          |
   +---------(M)------------ Video
   |                          |
   +---------(M)------------ Progress
   |
   +---------(M)------------ Assignment (submissions)
   |
   +---------(M)------------ Download
   |
   +---------(M)------------ Doubt

Course (1) ------(M)------ Video
   |                        |
   +---------(M)-----------Progress
   |
   +---------(M)-----------Announcement
```

---

## Data Integrity Rules

### User
- Email must be unique
- Password must be hashed (bcrypt)
- Role must be one of: user, admin, instructor

### Course
- Title and Description are required
- Category must be from predefined list
- Difficulty defaults to 'Beginner'
- All courses have isFree = true

### Video
- Must belong to an existing Course
- Duration must be greater than 0
- Quality must be from predefined list
- All videos have isFree = true

### Progress
- userId, courseId, videoId compound unique
- completionPercentage auto-calculated from watched/total duration
- isCompleted = true when completion >= 90%
- completedAt set when completion = 100%

### Download
- userId + videoId should be unique
- expiresAt can be set for auto-cleanup (e.g., 30 days from download)

---

## Query Optimization

### Common Queries

#### Get all courses with enrollment count
```javascript
db.courses.aggregate([
  {
    $lookup: {
      from: "users",
      localField: "_id",
      foreignField: "enrolledCourses",
      as: "enrollments"
    }
  },
  {
    $addFields: {
      enrollmentCount: { $size: "$enrollments" }
    }
  }
])
```

#### Get user progress summary
```javascript
db.progress.aggregate([
  { $match: { userId: ObjectId("user_id") } },
  { $group: {
      _id: "$courseId",
      totalVideos: { $sum: 1 },
      completedVideos: { $sum: { $cond: ["$isCompleted", 1, 0] } },
      avgProgress: { $avg: "$completionPercentage" }
    }
  }
])
```

#### Get trending courses
```javascript
db.courses.aggregate([
  { $addFields: { trendScore: { $add: ["$enrollmentCount", { $multiply: ["$rating", 10] }] } } },
  { $sort: { trendScore: -1 } },
  { $limit: 10 }
])
```

---

## Backup & Recovery

- Daily automated backups to MongoDB Atlas
- Point-in-time recovery available
- Regular testing of recovery procedures

---

## Migration Guide

For future schema updates:

1. Create migration scripts in `backend/migrations/`
2. Test in development environment
3. Backup production database
4. Run migration on staging first
5. Verify data integrity
6. Deploy to production
