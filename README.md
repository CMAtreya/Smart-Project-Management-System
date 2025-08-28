# Smart Project Management System

## Overview
The Smart Project Management System is a full-stack web application designed to streamline project and team management for organizations. It features real-time collaboration, AI-powered stress monitoring, advanced calendar and notification systems, and robust project/task tracking for both users and administrators.

## Features

- **User & Admin Dashboards:**
  - Personalized dashboards for users and admins with analytics, project/task overviews, and quick actions.
- **Authentication & Authorization:**
  - Secure login, registration, and protected routes using JWT and middleware.
- **Project & Task Management:**
  - Create, view, update, and delete projects and tasks. Assign team members, set deadlines, and track progress.
- **Real-Time Chat:**
  - Team chat with Socket.IO for instant communication within project rooms.
- **Calendar Integration:**
  - Visual calendar for event scheduling, task deadlines, and project milestones. CRUD operations for calendar events.
- **AI-Powered Stress Monitor:**
  - Monitors user workload, screen time, overdue tasks, and missed deadlines. Uses AI to analyze and suggest actions.
- **Screen Time Tracking:**
  - Logs and visualizes daily screen time and app usage for productivity insights.
- **Notifications:**
  - Real-time notifications for deadlines, messages, and project updates.
- **Requirement Modelling & Analytics:**
  - AI-driven requirement gathering and project analytics for admins.
- **Responsive UI:**
  - Modern, mobile-friendly interface built with React, Tailwind CSS, and Vite.

## Technology Stack

- **Frontend:** React, Vite, Tailwind CSS, React Router, Framer Motion
- **Backend:** Node.js, Express, Socket.IO, Mongoose
- **Database:** MongoDB
- **AI Service:** OpenAI/GPT (for stress analysis, suggestions, and requirement modelling)

## Project Structure

```
Smart-Project-Management-System/
├── backend/
│   ├── index.js
│   ├── routes/           # API endpoints (auth, projects, tasks, chat, calendar, AI, etc.)
│   ├── models/           # Mongoose models (User, Project, Task, Calendar, etc.)
│   ├── middleware/       # Auth and other middleware
│   └── ...
├── frontend/
│   ├── src/
│   │   ├── components/   # UI components (Navbar, StressMonitor, etc.)
│   │   ├── pages/        # Page views (dashboard, calendar, chat, etc.)
│   │   ├── contexts/     # React context providers (Auth, Project, Task, etc.)
│   │   ├── services/     # API service files
│   │   └── ...
│   └── ...
├── README.md
└── ...
```

## Workflow

### 1. Authentication
- Users and admins register and log in via the frontend.
- JWT tokens are issued and validated by backend middleware for protected routes.

### 2. Project & Task Management
- Users can create, view, update, and delete projects and tasks.
- Admins have access to all projects and analytics.
- Team members are assigned to projects and tasks.

### 3. Real-Time Chat
- Users join project-specific chat rooms via Socket.IO.
- Messages are broadcast in real-time and stored in MongoDB.

### 4. Calendar & Notifications
- Calendar events are managed via dedicated routes and visualized in the frontend.
- Notifications are sent for deadlines, messages, and updates.

### 5. AI-Powered Stress Monitoring
- The StressMonitor component fetches real-time screen time, overdue tasks, and missed deadlines.
- Data is sent to the backend, which uses OpenAI/GPT for stress analysis and suggestions.
- Results are visualized in the dashboard.

### 6. Screen Time Tracking
- The frontend logs app usage and screen time, sending data to the backend for aggregation and analysis.

## How to Run

1. **Install dependencies:**
   - Backend: `cd backend && npm install`
   - Frontend: `cd frontend && npm install`
2. **Configure environment variables:**
   - Set up `.env` files for backend (MongoDB URI, JWT secret, etc.) and frontend (API URLs).
3. **Start the backend server:**
   - `npm start` (from the `backend` directory)
4. **Start the frontend dev server:**
   - `npm run dev` (from the `frontend` directory)
5. **Access the app:**
   - Open `http://localhost:5173` (or the port shown in the terminal)

##  Architecture Diagram

![System Architecture](assets/architecture.png)


## License

This project is for educational and demonstration purposes.



need to develop on 
| **Industry Problem**                      | **Current Struggle**                                                                      | **Your System’s Solution**                                                                                                |
| ----------------------------------------- | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| **Too many tools → context switching**    | Teams juggle Jira (tasks), Slack (chat), Zoom (meetings), Google Calendar, GitHub (code). | Unified platform → Projects, tasks, chat, calendar, meetings, notifications all in one place.                             |
| **Manual requirement gathering**          | After meetings, someone must type requirements into Jira/Azure manually.                  | **AI Meeting Automation** → Transcribes meetings, extracts requirements, auto-generates tasks & deadlines.                |
| **Unclear workloads → burnout**           | Employees get overloaded, deadlines missed, no system warns in advance.                   | **AI-Powered Stress Monitor + Screen Tracking** → Detects overwork, overdue tasks, suggests breaks & task redistribution. |
| **Customization mess (“Jira sprawl”)**    | Teams define workflows differently, making cross-team reporting messy.                    | Standardized **requirement modeling + AI analytics** → Ensures consistent task structures & project templates.            |
| **Lack of proactive risk alerts**         | PMs often discover delays only when it’s too late.                                        | AI analytics → Predicts project slippage, workload imbalance, and notifies admins early.                                  |
| **Expensive enterprise tools**            | Jira/Azure DevOps licenses cost heavily at scale.                                         | Self-hostable MERN-based platform → cost-effective, customizable, scalable.                                               |
| **Employee resistance to tracking tools** | People feel micromanaged by strict dashboards.                                            | Stress monitor framed as **well-being tool** (not surveillance). Transparent data & personal insights increase adoption.  |
