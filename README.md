# Collaborative Todo App

A modern, real-time collaborative task management application built with the MERN stack. Teams can manage tasks together with live updates, user assignments, and comprehensive activity tracking.

## ✨ Features

### Core Functionality

- **Real-time Collaboration** - Live task updates across all connected users via Socket.io
- **User Authentication** - Secure JWT-based authentication with registration and login
- **Task Management** - Create, edit, delete, and organize tasks with full CRUD operations
- **User Assignment** - Assign tasks to team members with smart assignment feature
- **Status Tracking** - Todo, In Progress, and Done columns with drag-and-drop functionality
- **Priority Levels** - High, Medium, and Low priority tasks with color coding
- **Activity Logging** - Comprehensive audit trail of all task activities with timestamps

### User Experience

- **Kanban Board** - Intuitive card-based interface with responsive grid layout
- **Responsive Design** - Mobile-first design that works seamlessly on all devices
- **Dark Theme** - Modern dark UI with excellent contrast and custom styling
- **Real-time Notifications** - Beautiful toast notifications for all user actions
- **Conflict Resolution** - Smart handling of concurrent edits with user confirmation
- **Custom Scrollbars** - Thin, styled scrollbars throughout the application
- **User Identification** - Shows "(You)" for current user's tasks and activities

## 🛠 Tech Stack

### Frontend

- **React 18** - Modern React with hooks and functional components
- **React Router v6** - Client-side routing with protected routes
- **Tailwind CSS** - Utility-first CSS framework with custom dark theme
- **React Hot Toast** - Beautiful toast notifications with custom styling
- **Socket.io Client** - Real-time bidirectional communication
- **Axios** - HTTP client for API calls with error handling
- **Vite** - Fast build tool and development server

### Backend

- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework with middleware support
- **MongoDB** - NoSQL database with Mongoose ODM
- **Socket.io** - Real-time bidirectional event-based communication
- **JWT (jsonwebtoken)** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing and verification
- **CORS** - Cross-origin resource sharing configuration
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
PORT=5000
MONGODB_URI=mongodb://localhost:27017/collab-todo-app
JWT_SECRET=your_super_secret_jwt_key_here
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

#### Frontend (.env)

Create a `.env` file in the `frontend` directory:

```env
VITE_API_URL=http://localhost:3000/api
VITE_WEBSOCKET_URL=http://localhost:3000
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
│   │   ├── app.js                        # Express app configuration
│   │   ├── index.js                      # Server entry point
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
│   │   │   ├── TaskCard.jsx              # Individual task display with delete
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
│   │   │   └── TaskModal.jsx             # Task creation/editing modal
│   │   │
│   │   ├── pages/
│   │   │   ├── index.js                  # Page component exports
│   │   │   ├── Home.jsx                  # Landing page
│   │   │   ├── Register.jsx              # User registration page
│   │   │   ├── Login.jsx                 # User login page
│   │   │   ├── Logout.jsx                # Logout functionality
│   │   │   ├── KanbanBoard.jsx           # Main kanban board with task management
│   │   │   └── ActionLog.jsx             # Activity log page with user identification
│   │   │
│   │   ├── routes/
│   │   │   ├── Routes.jsx                # Route definitions with protection
│   │   │   └── ProtectedRoutes.jsx       # Protected route wrapper
│   │   │
│   │   └── services/
│   │       ├── authApi.js                # Authentication API calls
│   │       ├── taskApi.js                # Task management API calls
│   │       └── actionLogApi.js           # Activity log API calls
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
- `PATCH /updatetaskstatus/:id` - Update task status (Todo, in-progress, completed)
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
3. **Delete Tasks** - Use the delete button on task cards with custom confirmation toast
4. **Smart Assignment** - Use the "Smart Assign" button in edit mode to automatically assign tasks
5. **Status Updates** - Tasks are organized in Todo, In Progress, and Done columns

### Real-time Features

- **Live Updates** - See real-time updates when other users modify tasks
- **Activity Tracking** - Monitor all team activities in the Activity Log page
- **User Identification** - See "(You)" indicator for your own tasks and activities

## 🔄 Real-time Features

The application uses Socket.io for comprehensive real-time functionality:

### Socket Events

- **taskCreated** - Broadcast when new tasks are created
- **taskUpdated** - Broadcast when tasks are modified
- **taskDeleted** - Broadcast when tasks are removed
- **statusChanged** - Broadcast when task status changes

### Live Updates

- **Task Synchronization** - All connected clients receive instant updates
- **Activity Notifications** - Real-time activity log updates
- **Conflict Resolution** - Handle concurrent edits with user confirmation
- **User Status** - Visual indicators for current user's content

## 🎨 UI/UX Features

### Design System

- **Dark Theme** - Consistent dark color scheme with proper contrast ratios
- **Responsive Grid** - Mobile-first design with CSS Grid layout
- **Custom Components** - Reusable components with consistent styling
- **Typography** - Inter font family for optimal readability

### Interactive Elements

- **Toast Notifications** - Custom styled notifications for all user actions
- **Loading States** - Smooth loading indicators for better user experience
- **Hover Effects** - Subtle animations and transitions throughout the app
- **Form Validation** - Client-side validation with helpful error messages

### Accessibility

- **Keyboard Navigation** - Full keyboard accessibility support
- **Screen Reader** - Proper ARIA labels and semantic HTML
- **Color Contrast** - WCAG compliant color combinations
- **Focus Management** - Clear focus indicators for interactive elements

## 🔧 Configuration Files

### Frontend Configuration

- **vite.config.js** - Vite build tool configuration with Tailwind plugin
- **tailwind.config.js** - Tailwind CSS customization and theme configuration
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
# Deploy dist/ folder to your hosting service
```

### Backend Deployment

```bash
cd backend
npm start
# Configure environment variables on your hosting platform
```

### Environment Setup

- Set `NODE_ENV=production` for production builds
- Configure MongoDB connection string for production database
- Update CORS_ORIGIN to match your frontend domain

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style and patterns
- Add comments for complex logic
- Test thoroughly before submitting PR
- Update documentation if needed

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

## 🐛 Known Issues

- None currently reported

## 🔮 Future Enhancements

- [ ] Drag and drop functionality for task status changes
- [ ] File attachments for tasks
- [ ] Task comments and discussions
- [ ] Team management and permissions
- [ ] Email notifications
- [ ] Mobile app development
- [ ] Advanced filtering and search
- [ ] Task templates and recurring tasks
