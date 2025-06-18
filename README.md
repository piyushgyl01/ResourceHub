# **ResourceHub - Engineering Resource Management System**

A comprehensive full-stack application for managing engineering team assignments, tracking capacity allocation, and optimizing resource utilization across projects. Features role-based access control with separate interfaces for Managers and Engineers, real-time capacity monitoring, and analytics dashboard.

## **Demo Link**
- **Frontend Application**: [https://erm-v2.vercel.app/login](https://erm-v2.vercel.app/login)
- **Backend API**: [https://erm-server-v1.onrender.com](https://erm-server-v1.onrender.com)

## **Login**
**Manager** (Full Access): `manager@company.com` Password: `password123`  
**Senior Engineer**: `john@company.com` Password: `password123`  
**Backend Engineer**: `alice@company.com` Password: `password123`  
**Frontend Engineer**: `bob@company.com` Password: `password123`

## **Quick Start**

```bash
git clone https://github.com/piyushgyl01/erm-fullstack
cd engineering-resource-management

# Backend Setup
cd server
npm install
echo "MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secure_jwt_secret
PORT=3004" > .env
npm run dev

# Frontend Setup (new terminal)
cd ../client
npm install
echo "VITE_API_URL=http://localhost:3004/api" > .env
npm run dev
```

## **Technologies**
* **Frontend**: React 19, TypeScript, Vite, Tailwind CSS, ShadCN UI
* **Backend**: Node.js, Express, MongoDB, Mongoose
* **Authentication**: JWT with bcrypt
* **Charts**: Recharts
* **Forms**: React Hook Form + Zod validation
* **Deployment**: Vercel (Frontend), Render (Backend)

## **Demo Video**
Watch a walkthrough (5 minutes) of all major features of this app: [Video Link](https://youtu.be/ieuyr1FEawk)

## **Features**

### **Team Management**
* Role-based access control (Manager/Engineer dashboards)
* Engineer profiles with skills tracking and seniority levels
* Real-time capacity monitoring with visual indicators

### **Project Management** 
* Complete project lifecycle tracking (Planning → Active → Completed)
* Skill matching and team size planning
* Project creation, editing, and deletion (Manager only)

### **Assignment System**
* Smart allocation with real-time capacity checks
* Conflict detection and over-allocation prevention
* Flexible date range management with role assignments

### **Analytics Dashboard**
* Team utilization metrics and performance insights
* Capacity planning recommendations
* Interactive charts for data visualization

### **Authentication & Security**
* JWT-based secure session management
* Password encryption with bcrypt
* Protected routes with role-based access control

## **API Reference**

### **Authentication**
**POST /api/auth/login**  
Authenticate user with email/password  
Sample Response: `{ token, user: { id, name, email, role, skills, ... } }`

**POST /api/auth/register**  
Create new user account  
Sample Response: `{ token, user: { id, name, email, role, ... } }`

**GET /api/auth/profile**  
Get current user profile (protected)  
Sample Response: `{ user: { id, name, email, role, ... } }`

### **Engineers**
**GET /api/engineers**  
List all engineers with capacity info (protected)  
Sample Response: `{ engineers: [{ _id, name, skills, currentAllocation, ... }] }`

**GET /api/engineers/:id/capacity**  
Check engineer availability for date range  
Sample Response: `{ availableCapacity: 60 }`

### **Projects**
**GET /api/projects**  
List all projects (protected)  
Sample Response: `{ projects: [{ _id, name, status, requiredSkills, ... }] }`

**POST /api/projects**  
Create new project (manager only)  
Sample Response: `{ project: { _id, name, description, status, ... } }`

**PUT /api/projects/:id**  
Update project (manager only)  

**DELETE /api/projects/:id**  
Delete project (manager only)

### **Assignments**
**GET /api/assignments**  
List assignments (filtered by role)  
Sample Response: `{ assignments: [{ _id, engineerId, projectId, allocation, ... }] }`

**POST /api/assignments**  
Create assignment (manager only)  
Sample Response: `{ assignment: { _id, engineerId, projectId, role, ... } }`

### **Analytics**
**GET /api/analytics/utilization**  
Team utilization data (manager only)  
Sample Response: `{ utilizationData: [{ engineerId, name, utilizationPercentage, ... }] }`

## **Contact**

For bugs or feature requests, please reach out to piyush2022ug@gmail.com

*Built with ❤️ and 🤖 AI assistance for accelerated learning and development*