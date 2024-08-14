const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const { exec } = require('child_process');
const path = require('path');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection URI and database name
const MONGO_URI = 'mongodb://localhost:27017/';
const DB_NAME = 'finance_db';

let db;

// Connect to MongoDB
MongoClient.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(client => {
    db = client.db(DB_NAME);
    console.log('Connected to MongoDB');
  })
  .catch(error => {
    console.error('Error connecting to MongoDB:', error);
  });

// Function to run the scraper
const runScraper = () => {
  return new Promise((resolve, reject) => {
    exec('python Scrape.py', (error, stdout, stderr) => {
      if (error) {
        reject(`Error running scraper: ${stderr}`);
      } else {
        resolve(stdout);
      }
    });
  });
};

// Endpoint to get leading companies data with optional refresh
app.get('/api/leading-companies', async (req, res) => {
  try {
    if (!db) {
      throw new Error('Database not initialized');
    }

    // Check for refresh parameter
    if (req.query.refresh === 'true') {
      console.log('Running scraper...');
      await runScraper();
      console.log('Scraper finished running.');
    }

    // Fetch data from MongoDB
    const collection = db.collection('leading_companies');
    const companies = await collection.find({}).toArray();
    res.json(companies);
  } catch (error) {
    console.error('Error fetching leading companies data:', error);
    res.status(500).json({ message: 'Error fetching data', error: error.message });
  }
});

// Endpoint to get marginal companies data with optional refresh
app.get('/api/marginal-companies', async (req, res) => {
  try {
    if (!db) {
      throw new Error('Database not initialized');
    }

    // Check for refresh parameter
    if (req.query.refresh === 'true') {
      console.log('Running scraper...');
      await runScraper();
      console.log('Scraper finished running.');
    }

    // Fetch data from MongoDB
    const collection = db.collection('marginal_companies');
    const companies = await collection.find({}).toArray();
    res.json(companies);
  } catch (error) {
    console.error('Error fetching marginal companies data:', error);
    res.status(500).json({ message: 'Error fetching data', error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
