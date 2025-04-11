# Todo App with Contacts

A full-stack Todo application with contact management built with React, Express, and MongoDB.

## Features

- Create, read, update, and delete todos
- Mark todos as completed, pending, or postponed
- Add notes and images to todos
- Manage contacts with name, email, phone, and notes
- Modern UI with Material-UI
- Responsive design

## Tech Stack

- Frontend: React with Vite
- UI: Material-UI
- Backend: Express.js
- Database: MongoDB
- Deployment: Vercel (Frontend) and MongoDB Atlas (Database)

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account
- Git

### Backend Setup

1. Navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file and add your MongoDB connection string:
```
MONGODB_URI=your_mongodb_connection_string
PORT=5000
```

4. Start the development server:
```bash
npm run dev
```

### Frontend Setup

1. Navigate to the root directory:
```bash
cd ..
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

## Deployment

### Frontend Deployment (Vercel)

1. Push your code to GitHub
2. Create a Vercel account
3. Import your repository
4. Configure environment variables if needed
5. Deploy!

### Backend Deployment

1. Create a MongoDB Atlas account
2. Create a new cluster
3. Get your connection string
4. Update your `.env` file with the production connection string

## Environment Variables

Create a `.env` file in the server directory with the following variables:

```
MONGODB_URI=your_mongodb_connection_string
PORT=5000
```

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is licensed under the MIT License. 