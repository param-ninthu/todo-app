# Todo App - Backend

Node.js and Express API server with MongoDB database.

## Requirements

- Node.js (version 18 or higher)
- npm
- MongoDB (local installation or MongoDB Atlas account)

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Setup MongoDB

**Option A: Local MongoDB**
- Install MongoDB from mongodb.com
- Start MongoDB service

**Option B: MongoDB Atlas (Cloud)**
- Create free account at mongodb.com/cloud/atlas
- Create a cluster and get connection string

### 3. Create Environment File

Create a `.env` file in this folder and add:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/todo-app
CLIENT_URL=http://localhost:5173
```

Replace `MONGO_URI` with your MongoDB Atlas connection string if using cloud database.

### 4. Start Development Server

```bash
npm run dev
```

The server will run at `http://localhost:5000`

## Available Commands

- `npm run dev` - Start development server with auto-reload
- `npm start` - Start production server

## API Endpoints

- `GET /api/todos` - Get all todos
- `GET /api/todos/:id` - Get one todo
- `POST /api/todos` - Create todo
- `PUT /api/todos/:id` - Update todo
- `PATCH /api/todos/:id/toggle` - Toggle complete status
- `DELETE /api/todos/:id` - Delete todo

## Technologies Used

- Node.js
- Express
- MongoDB
- Mongoose

## Common Issues

**Problem: Can't connect to MongoDB**
- Check if MongoDB is running
- Verify MONGO_URI in .env file
- For Atlas, check your IP whitelist and credentials

**Problem: Port 5000 is busy**
- Change PORT in .env to another number
- Update frontend VITE_API_URL accordingly
