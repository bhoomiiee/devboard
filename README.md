# 📋 DevBoard

A full-stack task management app built to demonstrate modern DevOps practices.

## 🌐 Live Demo
> Coming soon (AWS deployment)

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React (Vite) |
| Backend | Node.js + Express |
| Database | Supabase (PostgreSQL) |
| Containerization | Docker + Docker Compose |
| CI/CD | GitHub Actions |

## ✨ Features
- Add tasks with deadlines
- Mark tasks as complete
- Delete tasks
- Color coded deadlines (green / orange / red)
- Fully containerized with Docker
- Automated CI/CD pipeline

## 🚀 Getting Started

### Prerequisites
- Docker Desktop installed
- Supabase account

### Run Locally

1. Clone the repo
   ```bash
   git clone https://github.com/YOUR_USERNAME/devboard.git
   cd devboard
Add your environment variables
# create backend/.env
SUPABASE_URL=your_url
SUPABASE_ANON_KEY=your_key
Start with Docker
docker-compose up --build
Open http://localhost:5173
⚙️ CI/CD Pipeline
Every push to main automatically:
Installs dependencies
Builds the frontend
Builds Docker images
📁 Project Structure
devboard/
├── backend/          # Express API
│   ├── index.js
│   └── Dockerfile
├── frontend/         # React App
│   ├── src/
│   └── Dockerfile
├── .github/
│   └── workflows/
│       └── deploy.yml
└── docker-compose.yml
🔗 Author
Made by Bhoomika
Then push it:
```bash
