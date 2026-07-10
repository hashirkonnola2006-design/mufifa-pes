# MUFIFA

A premium web application for managing and tracking MUFIFA tournaments.

## Tech Stack
- **Frontend:** React, Tailwind CSS, Vite
- **Backend:** Node.js, Express
- **Database:** MongoDB
- **Deployment:** Vercel

## Setup Instructions

1. **Clone the Repository:**
   ```bash
   git clone <repository-url>
   cd pes
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   - Copy `.env.example` to `.env`:
     ```bash
     cp .env.example .env
     ```
   - Open `.env` and populate the required values (`MONGODB_URI`, `JWT_SECRET`, `ADMIN_USERNAME`, `ADMIN_PASSWORD_HASH`).

4. **Run the Development Server:**
   ```bash
   npm run dev
   ```

## Folder Structure Overview
- `/src` - Frontend source code (React components, hooks, assets)
  - `/src/components` - React components (Fixtures, Groups, Home, etc.)
- `/api` - Backend API routes (Express/Node.js) deployed as serverless functions on Vercel
- `/server` - Local/development server utilities and configuration
