const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const path = require('path');

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../client/dist')));

// API Routes

// Get all tasks
app.get('/api/tasks', async (req, res) => {
  try {
    const tasks = await prisma.task.findMany({
      orderBy: { createdAt: 'asc' },
    });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new task
app.post('/api/tasks', async (req, res) => {
  const { title, description, category } = req.body;
  
  try {
    const newTask = await prisma.task.create({
      data: {
        title,
        description,
        category,
      },
    });
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a task
app.patch('/api/tasks/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, category, completed } = req.body;
  
  try {
    const updatedTask = await prisma.task.update({
      where: { id },
      data: {
        title,
        description,
        category,
        completed,
      },
    });
    res.json(updatedTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a task
app.delete('/api/tasks/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    await prisma.task.delete({
      where: { id },
    });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Default route: serve React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
});

// Seed initial tasks for Spanish Digital Nomad Visa
async function seedInitialTasks() {
  try {
    const tasks = [
      {
        title: 'Check eligibility requirements',
        description: 'Verify you meet the digital nomad visa requirements: non-EU citizen, remote work for non-Spanish companies, sufficient income, health insurance, etc.',
        category: 'Pre-Application'
      },
      {
        title: 'Gather proof of remote work or freelance status',
        description: 'Collect employment contract or client agreements showing remote work for non-Spanish companies/clients.',
        category: 'Documentation'
      },
      {
        title: 'Prepare proof of sufficient income',
        description: 'Gather bank statements showing you earn at least 200% of Spanish minimum monthly wage (approximately €2,000/month).',
        category: 'Documentation'
      },
      {
        title: 'Obtain health insurance',
        description: 'Purchase comprehensive private health insurance valid in Spain for the duration of your stay.',
        category: 'Documentation'
      },
      {
        title: 'Criminal background check',
        description: 'Get criminal record certificate from countries where you lived in the past 5 years, apostilled.',
        category: 'Documentation'
      },
      {
        title: 'Medical certificate',
        description: 'Obtain a medical certificate confirming you have no diseases of public health concern.',
        category: 'Documentation'
      },
      {
        title: 'Prepare application form',
        description: 'Complete the official visa application form for the Spanish Digital Nomad Visa.',
        category: 'Application'
      },
      {
        title: 'Book appointment at Spanish consulate',
        description: 'Schedule an appointment at the Spanish consulate in your country of residence.',
        category: 'Application'
      },
      {
        title: 'Submit application documents',
        description: 'Attend your appointment and submit all required documents in person at the Spanish consulate.',
        category: 'Application'
      },
      {
        title: 'Pay visa application fee',
        description: 'Pay the required visa application fee (approximately €80).',
        category: 'Application'
      },
      {
        title: 'Wait for visa approval',
        description: 'Processing typically takes 15-30 days. Check status online or contact the consulate for updates.',
        category: 'Processing'
      },
      {
        title: 'Collect your visa',
        description: 'Once approved, collect your visa from the Spanish consulate.',
        category: 'Processing'
      },
      {
        title: 'Book flights to Spain',
        description: 'Book your travel to Spain within the validity period of your visa.',
        category: 'Travel'
      },
      {
        title: 'Arrange accommodation in Spain',
        description: 'Secure temporary or permanent accommodation in Spain.',
        category: 'Travel'
      },
      {
        title: 'Apply for TIE card within 30 days',
        description: 'Schedule appointment at the foreign office (Extranjería) to apply for your TIE (Foreigner Identity Card).',
        category: 'In Spain'
      },
      {
        title: 'Obtain NIE number',
        description: 'Get your NIE (Foreigner Identification Number) when you receive your TIE card.',
        category: 'In Spain'
      },
      {
        title: 'Register with local authorities',
        description: 'Complete the "empadronamiento" process to register with your local town hall.',
        category: 'In Spain'
      },
      {
        title: 'Open Spanish bank account',
        description: 'Open a local bank account for easier financial management.',
        category: 'In Spain'
      }
    ];

    await prisma.task.createMany({ data: tasks });
    console.log('Database seeded with initial tasks');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}

// Initialize database and start server
const startServer = async () => {
  try {
    await prisma.();
    console.log('Connected to database');
    
    // Check if tasks table exists by attempting a query
    try {
      // Seed initial data if database is empty
      const taskCount = await prisma.task.count();
      if (taskCount === 0) {
        await seedInitialTasks();
      }
    } catch (error) {
      if (error.code === 'P2021') {
        console.log('Table not found, but migrations should have created it. Will retry on next deployment.');
      } else {
        console.error('Error checking task count:', error);
      }
    }
    
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
