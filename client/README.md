# Todo App - Frontend

React-based frontend for the Todo application.

## Requirements

- Node.js (version 18 or higher)
- npm

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Create Environment File

Create a `.env` file in this folder and add:

```env
VITE_API_URL=http://localhost:5000/api
```

### 3. Start Development Server

```bash
npm run dev
```

The app will open at `http://localhost:5173`

## Available Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Technologies Used

- React 19
- Vite
- Material-UI
- Axios

## Common Issues

**Problem: Can't connect to backend**
- Make sure the backend server is running
- Check that VITE_API_URL matches your backend URL

**Problem: Port 5173 is busy**
- Vite will automatically use the next available port
- Check the terminal for the actual port number
