import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import LeadingCompanies from './components/LeadingCompanies';
import MarginalCompanies from './components/MarginalCompanies';
import Search from './components/search';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/leading-companies">Top 5 Leading Companies</Link></li>
            <li><Link to="/marginal-companies">Top 5 Marginal Companies</Link></li>
            <li><Link to="/search">Search</Link></li> {/* Add Search Link */}
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/leading-companies" element={<LeadingCompanies />} />
          <Route path="/marginal-companies" element={<MarginalCompanies />} />
          <Route path="/search" element={<Search />} /> {/* Add Search Route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
