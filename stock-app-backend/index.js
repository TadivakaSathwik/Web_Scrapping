const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/finance_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const companySchema = new mongoose.Schema({
  ticker: String,
  name: String,
  price: Number,
  market_cap: Number,
  day_high: Number,
  day_low: Number,
  "52_week_high": Number,
  "52_week_low": Number,
  volume: Number,
  avg_volume: Number,
});

const MarginalCompany = mongoose.model('MarginalCompany', companySchema);
const LeadingCompany = mongoose.model('LeadingCompany', companySchema);

// Routes
app.get('/api/marginal-companies', async (req, res) => {
  const companies = await MarginalCompany.find();
  res.json(companies);
});

app.get('/api/leading-companies', async (req, res) => {
  const companies = await LeadingCompany.find();
  res.json(companies);
});

app.get('/', (req, res) => {
  res.send('Server is up and running!');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Search Route
app.get('/api/search', async (req, res) => {
    const query = req.query.q;
    if (!query) {
      return res.status(400).json({ error: "Query parameter 'q' is required" });
    }
  
    const marginalCompanies = await MarginalCompany.find({
      $or: [
        { name: new RegExp(query, 'i') },
        { ticker: new RegExp(query, 'i') }
      ]
    });
  
    const leadingCompanies = await LeadingCompany.find({
      $or: [
        { name: new RegExp(query, 'i') },
        { ticker: new RegExp(query, 'i') }
      ]
    });
  
    res.json({ marginalCompanies, leadingCompanies });
  });
  
