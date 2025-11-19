# Todo App

A simple todo application to manage your tasks.

## What's Inside

- **client_new/** - React frontend
- **server/** - Node.js backend with MongoDB

## Requirements

- Node.js (version 18 or higher)
- npm
- MongoDB

## Quick Start

### Step 1: Setup Backend

```bash
cd server
npm install
```

Create `server/.env` file:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/todo-app
CLIENT_URL=http://localhost:5173
```

Start the server:

```bash
npm run dev
```

Server runs at http://localhost:5000

### Step 2: Setup Frontend

Open a new terminal:

```bash
cd client_new
npm install
```

Create `client_new/.env` file:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the app:

```bash
npm run dev
```

App runs at http://localhost:5173

### Step 3: Use the App

Open your browser and go to http://localhost:5173

## MongoDB Setup

**Local Installation:**
1. Download from mongodb.com
2. Install and start MongoDB service
3. Use `MONGO_URI=mongodb://localhost:27017/todo-app`

**Cloud (MongoDB Atlas):**
1. Create free account at mongodb.com/cloud/atlas
2. Create cluster and get connection string
3. Use that connection string as MONGO_URI

## Features

- Create and delete todos
- Mark todos as complete
- Add tags to organize tasks
- Filter by status (All/Active/Completed)

## Tech Stack

**Frontend:** React, Vite, Material-UI  
**Backend:** Node.js, Express, MongoDB

## Troubleshooting

**Backend won't start:**
- Check if MongoDB is running
- Verify .env file exists with correct values

**Frontend can't connect:**
- Make sure backend is running first
- Check VITE_API_URL in frontend .env

**Port conflicts:**
- Change PORT in backend .env
- Vite will auto-select available port for frontend

## Need More Details?

- See [client_new/README.md](./client_new/README.md) for frontend details
- See [server/README.md](./server/README.md) for backend details
