# Spanish Digital Nomad Visa TODO App

A full-stack web application to track your progress through the Spanish Digital Nomad Visa application process.

## Features

- Track all the steps needed to obtain a Spanish Digital Nomad Visa
- Organize tasks by categories (Pre-Application, Documentation, Application, etc.)
- Mark tasks as completed
- Add custom tasks specific to your situation
- Filter tasks by category
- Track your overall progress

## Tech Stack

- Frontend: React with Tailwind CSS
- Backend: Node.js with Express
- Database: PostgreSQL with Prisma ORM
- Deployment: Ready for one-click deployment on Railway

## Quick Start for Railway Deployment

1. Fork this repository
2. Create a new project on [Railway](https://railway.app/)
3. Connect your forked repository to Railway
4. Add a PostgreSQL database to your project in Railway
5. Deploy!

## Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Environment Variables

The application expects the following environment variable:

- `DATABASE_URL`: PostgreSQL connection string

## License

MIT
