# Collaborative Todo App

A modern, real-time collaborative task management application built with the MERN stack. Teams can manage tasks together with live updates, user assignments, drag & drop functionality, and comprehensive activity tracking.

## ✨ Features

### Core Functionality

- **Real-time Collaboration** - Live task updates across all connected users via Socket.io
- **User Authentication** - Secure JWT-based authentication with registration and login
- **Task Management** - Create, edit, delete, and organize tasks with full CRUD operations
- **User Assignment** - Assign tasks to team members with smart assignment feature
- **Drag & Drop Interface** - Intuitive drag and drop functionality to move tasks between columns
- **Status Tracking** - Todo, In Progress, and Done columns with visual status management
- **Priority Levels** - High, Medium, and Low priority tasks with color coding
- **Activity Logging** - Comprehensive audit trail of all task activities with real-time updates

### User Experience

- **Kanban Board** - Intuitive card-based interface with drag & drop functionality
- **Responsive Design** - Mobile-first design that works seamlessly on all devices
- **Modern UI** - Clean interface with light theme and excellent visual hierarchy
- **Real-time Notifications** - Beautiful toast notifications for all user actions
- **Interactive Task Cards** - Rich task cards with user information and priority indicators
- **Conflict Resolution** - Smart handling of concurrent edits with user confirmation
- **Custom Scrollbars** - Styled scrollbars throughout the application
- **User Identification** - Shows "(You)" for current user's tasks and activities
- **Smart Delete Confirmation** - Interactive toast confirmations for safe task deletion

### Advanced Features

- **Socket.io Real-time Events** - Dedicated events for task creation, updates, moves, and deletions
- **Optimistic Updates** - Immediate UI feedback with error rollback capability
- **Network Exposure** - Development server can be accessed from network devices
- **Touch Support** - Mobile-friendly drag and drop with touch events
- **Visual Feedback** - Drag states, hover effects, and drop zone highlighting

## 🛠 Tech Stack

### Frontend

- **React 18** - Modern React with hooks and functional components
- **React Router v6** - Client-side routing with protected routes
- **Tailwind CSS** - Utility-first CSS framework with custom light theme
- **React Hot Toast** - Beautiful toast notifications with custom styling
- **Socket.io Client** - Real-time bidirectional communication
- **Axios** - HTTP client for API calls with interceptors and error handling
- **Vite** - Fast build tool and development server with network exposure

### Backend

- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework with middleware support
- **MongoDB** - NoSQL database with Mongoose ODM
- **Socket.io** - Real-time bidirectional event-based communication
- **JWT (jsonwebtoken)** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing and verification
- **CORS** - Cross-origin resource sharing with multiple origin support
- **Cookie Parser** - Parse cookies for session management

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MongoDB** (local installation or MongoDB Atlas)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Khanr7433/collab-todo-app.git
   cd collab-todo-app
   ```

2. **Backend Setup**

   ```bash
   cd backend
   npm install
   ```

3. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   ```

### Environment Variables

#### Backend (.env)

Create a `.env` file in the `backend` directory:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/collab-todo-app
# For MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/collab-todo-app
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRES_IN=30d
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

#### Frontend (.env)

Create a `.env` file in the `frontend` directory:

```env
VITE_API_URL=http://localhost:3000/api
VITE_WEBSOCKET_URL=http://localhost:3000
# For network access:
# VITE_API_URL=http://192.168.1.100:3000/api
# VITE_WEBSOCKET_URL=http://192.168.1.100:3000
```

### Running the Application

#### Development Mode

1. **Start the Backend Server**

   ```bash
   cd backend
   npm run dev
   ```

   Backend will run on `http://localhost:3000`

2. **Start the Frontend Development Server**

   ```bash
   cd frontend
   npm run dev
   ```

   Frontend will run on `http://localhost:5173`

3. **For Network Access (Optional)**

   ```bash
   cd frontend
   npm run dev -- --host
   ```

   This will expose the frontend on your local network

#### Production Mode

1. **Build the Frontend**

   ```bash
   cd frontend
   npm run build
   ```

2. **Start the Backend Server**
   ```bash
   cd backend
   npm start
   ```

## 📁 Project Structure

```
collab-todo-app/
├── backend/
│   ├── src/
│   │   ├── app.js                        # Express app configuration with CORS
│   │   ├── index.js                      # Server entry point with Socket.io
│   │   ├── constants.js                  # App constants and configurations
│   │   │
│   │   ├── controllers/
│   │   │   ├── actionLog.controller.js   # Activity logs management
│   │   │   ├── auth.controller.js        # Authentication logic (register, login, logout)
│   │   │   └── task.controller.js        # Task CRUD operations and status updates
│   │   │
│   │   ├── db/
│   │   │   └── index.js                  # MongoDB connection configuration
│   │   │
│   │   ├── middlewares/
│   │   │   ├── auth.middleware.js        # JWT authentication middleware
│   │   │   └── errorHandler.js           # Global error handling middleware
│   │   │
│   │   ├── models/
│   │   │   ├── actionLog.model.js        # Activity log schema
│   │   │   ├── tasks.model.js            # Task schema with validation
│   │   │   └── user.model.js             # User schema with authentication
│   │   │
│   │   ├── routes/
│   │   │   ├── actionLog.route.js        # Activity log API routes
│   │   │   ├── auth.route.js             # Authentication API routes
│   │   │   └── task.route.js             # Task management API routes
│   │   │
│   │   └── utils/
│   │       ├── apiError.js               # Custom API error class
│   │       ├── apiResponse.js            # Standard API response format
│   │       ├── asyncHandler.js           # Async error handling wrapper
│   │       ├── smartAssign.js            # Smart task assignment logic
│   │       └── socket.js                 # Socket.io event handlers
│   │
│   ├── .env                              # Environment variables
│   ├── .gitignore                        # Git ignore rules
│   ├── .prettierignore                   # Prettier ignore rules
│   ├── .prettierrc                       # Prettier configuration
│   └── package.json                      # Backend dependencies and scripts
│
├── frontend/
│   ├── public/
│   │   └── (static assets)               # Favicon and other static files
│   │
│   ├── src/
│   │   ├── App.jsx                       # Main app component with router
│   │   ├── main.jsx                      # React entry point with providers
│   │   ├── index.css                     # Global styles and custom scrollbars
│   │   ├── Layout.jsx                    # Main layout with header and footer
│   │   │
│   │   ├── assets/                       # Static assets (images, icons)
│   │   │
│   │   ├── components/
│   │   │   ├── index.js                  # Component exports
│   │   │   ├── Header.jsx                # Navigation header with auth status
│   │   │   ├── Footer.jsx                # Application footer
│   │   │   ├── TaskCard.jsx              # Rich task cards with drag support
│   │   │   ├── ConflictResolver.jsx      # Conflict resolution modal
│   │   │   └── ProtectedRoute.jsx        # Route protection component
│   │   │
│   │   ├── context/
│   │   │   └── AuthContext.jsx           # Authentication context provider
│   │   │
│   │   ├── hooks/
│   │   │   └── useSocket.js              # Socket.io custom hook for real-time updates
│   │   │
│   │   ├── modal/
│   │   │   └── TaskModal.jsx             # Task creation/editing modal with Socket.io
│   │   │
│   │   ├── pages/
│   │   │   ├── index.js                  # Page component exports
│   │   │   ├── Home.jsx                  # Landing page
│   │   │   ├── Register.jsx              # User registration page
│   │   │   ├── Login.jsx                 # User login page
│   │   │   ├── Logout.jsx                # Logout functionality
│   │   │   ├── KanbanBoard.jsx           # Main kanban board with drag & drop
│   │   │   └── ActionLog.jsx             # Real-time activity log page
│   │   │
│   │   ├── routes/
│   │   │   ├── Routes.jsx                # Route definitions with protection
│   │   │   └── ProtectedRoutes.jsx       # Protected route wrapper
│   │   │
│   │   └── services/
│   │       ├── authApi.js                # Authentication API calls
│   │       ├── taskApi.js                # Task management API calls
│   │       ├── actionLogApi.js           # Activity log API calls
│   │       └── socketService.js          # Centralized Socket.io service
│   │
│   │
│   ├── .env                              # Frontend environment variables
│   ├── .gitignore                        # Git ignore rules
│   ├── .prettierignore                   # Prettier ignore rules
│   ├── .prettierrc                       # Prettier configuration
│   ├── eslint.config.js                  # ESLint configuration
│   ├── index.html                        # HTML template
│   ├── package.json                      # Frontend dependencies and scripts
│   ├── postcss.config.js                 # PostCSS configuration
│   ├── tailwind.config.js                # Tailwind CSS configuration
│   └── vite.config.js                    # Vite configuration
│
├── .gitignore                            # Root git ignore
├── Logic_Document.md                     # Logic Document
└── README.md                             # Project documentation
```

## 🔗 API Endpoints

### Authentication Routes (`/api/auth`)

- `POST /register` - User registration with validation
- `POST /login` - User login with JWT token generation
- `POST /logout` - User logout (protected route)

### Task Routes (`/api/tasks`)

- `GET /gettask` - Get all tasks with user population
- `POST /createtask` - Create new task with activity logging
- `PATCH /updatetask/:id` - Update task details
- `PATCH /updatetaskstatus/:id` - Update task status via drag & drop
- `DELETE /deletetask/:id` - Delete task with activity logging
- `POST /assigntask/:id` - Smart assign task to available user

### Activity Log Routes (`/api/actionlogs`)

- `GET /getlogs` - Get activity logs with user and task population

## 🎯 Usage Guide

### Getting Started

1. **Register/Login** - Create an account or sign in to access the application
2. **Dashboard Navigation** - Use the header navigation to switch between Kanban Board and Activity Logs

### Task Management

1. **Create Tasks** - Click "Add Task" button to open the task creation modal
2. **Edit Tasks** - Click on any task card to edit title, description, status, or priority
3. **Move Tasks** - Drag and drop tasks between Todo, In Progress, and Done columns
4. **Delete Tasks** - Use the delete button on task cards with interactive confirmation
5. **Smart Assignment** - Use the "Smart Assign" button in edit mode to automatically assign tasks
6. **Priority Management** - Set High, Medium, or Low priority with visual color coding

### Drag & Drop Features

1. **Visual Feedback** - Tasks become semi-transparent when dragging
2. **Drop Zones** - Columns highlight with blue borders when hovering with a task
3. **Instant Updates** - Changes are immediately visible to all connected users
4. **Error Handling** - Failed moves are automatically reverted with error messages

### Real-time Features

- **Live Updates** - See real-time updates when other users modify tasks
- **Activity Tracking** - Monitor all team activities in the Activity Log page
- **User Identification** - See "(You)" indicator for your own tasks and activities
- **Socket Notifications** - Get notified when teammates make changes

## 🔄 Real-time Features

The application uses Socket.io for comprehensive real-time functionality:

### Socket Events

- **taskCreated** - Broadcast when new tasks are created
- **taskUpdated** - Broadcast when tasks are modified
- **taskMoved** - Broadcast when tasks are moved via drag & drop
- **taskDeleted** - Broadcast when tasks are removed
- **newActivityLog** - Broadcast new activity entries

### Live Updates

- **Task Synchronization** - All connected clients receive instant updates
- **Drag & Drop Sync** - Real-time task movement across all users
- **Activity Notifications** - Real-time activity log updates with toast notifications
- **Conflict Resolution** - Handle concurrent edits with user confirmation
- **User Status** - Visual indicators for current user's content

## 🎨 UI/UX Features

### Design System

- **Light Theme** - Clean, modern light color scheme with excellent contrast
- **Responsive Grid** - Mobile-first design with CSS Grid layout
- **Custom Components** - Reusable components with consistent styling
- **Typography** - Optimized font hierarchy for readability

### Interactive Elements

- **Drag & Drop Interface** - Smooth, intuitive task movement with visual feedback
- **Toast Notifications** - Rich notifications with custom actions and confirmations
- **Loading States** - Smooth loading indicators for better user experience
- **Hover Effects** - Subtle animations and transitions throughout the app
- **Form Validation** - Client-side validation with helpful error messages

### Accessibility

- **Keyboard Navigation** - Full keyboard accessibility support
- **Screen Reader** - Proper ARIA labels and semantic HTML
- **Color Contrast** - WCAG compliant color combinations
- **Focus Management** - Clear focus indicators for interactive elements
- **Touch Support** - Mobile-friendly interactions with touch events

## 🔧 Configuration Files

### Frontend Configuration

- **vite.config.js** - Vite build tool configuration with host support for network access
- **tailwind.config.js** - Tailwind CSS customization with light theme
- **eslint.config.js** - ESLint rules for code quality
- **postcss.config.js** - PostCSS configuration for CSS processing

### Backend Configuration

- **constants.js** - Application constants including CORS and cookie options
- **package.json** - Scripts for development and production environments

## 🚀 Deployment

### Frontend Deployment

```bash
cd frontend
npm run build
# Deploy dist/ folder to your hosting service (Vercel, Netlify, etc.)
```

### Backend Deployment

```bash
cd backend
npm start
# Configure environment variables on your hosting platform (Heroku, Railway, etc.)
```

### Environment Setup

- Set `NODE_ENV=production` for production builds
- Configure MongoDB connection string for production database
- Update CORS_ORIGIN to match your frontend domain
- Set JWT_SECRET to a secure random string in production

### Network Access Setup

For development across multiple devices:

1. **Frontend**: Use `npm run dev -- --host` to expose on network
2. **Backend**: Update CORS_ORIGIN to include your network IP
3. **Environment**: Update VITE_API_URL and VITE_WEBSOCKET_URL for network access

## 🔥 Key Features Highlights

### Advanced Drag & Drop

- **HTML5 Drag API** - Native browser drag and drop support
- **Visual Feedback** - Real-time visual cues during drag operations
- **Touch Support** - Mobile-friendly drag and drop
- **Error Recovery** - Automatic rollback on failed operations

### Real-time Collaboration

- **Socket.io Integration** - Dedicated events for all task operations
- **Optimistic Updates** - Immediate UI response with server sync
- **Conflict Resolution** - Smart handling of concurrent edits
- **Activity Tracking** - Comprehensive audit trail with real-time updates

### Modern Architecture

- **Component-based Design** - Reusable, maintainable React components
- **Custom Hooks** - Specialized hooks for Socket.io and authentication
- **Service Layer** - Centralized API and Socket service management
- **Error Boundaries** - Graceful error handling throughout the application

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style and patterns
- Add comments for complex logic
- Test drag & drop functionality thoroughly
- Update documentation if needed
- Test real-time features with multiple browser tabs

## 👨‍💻 Author

**Rashid Khan**

- GitHub: [@Khanr7433](https://github.com/Khanr7433)
- Email: [khan.rashid.7433@gmail.com](mailto:khan.rashid.7433@gmail.com)

## 🙏 Acknowledgments

- **React Team** - For the amazing frontend framework
- **MongoDB** - For the flexible NoSQL database
- **Socket.io** - For seamless real-time communication
- **Tailwind CSS** - For the utility-first CSS framework
- **Vite** - For the fast build tool and development experience
- **HTML5 Drag & Drop API** - For native browser drag and drop support

## 🐛 Known Issues

- None currently reported

## 🔮 Future Enhancements

- [x] ~~Drag and drop functionality for task status changes~~ ✅ **Completed**
- [ ] File attachments for tasks
- [ ] Task comments and discussions
- [ ] Team management and permissions
- [ ] Email notifications
- [ ] Mobile app development
- [ ] Advanced filtering and search
- [ ] Task templates and recurring tasks
- [ ] Keyboard shortcuts for power users
- [ ] Dark/Light theme toggle
- [ ] Task time tracking
- [ ] Gantt chart view
- [ ] Task dependencies
- [ ] Bulk operations
- [ ] Export functionality
