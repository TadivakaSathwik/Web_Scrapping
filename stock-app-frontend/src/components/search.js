import React, { useState } from 'react';
import axios from 'axios';

const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState({ marginalCompanies: [], leadingCompanies: [] });

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query) return;

    try {
      const response = await axios.get(`http://localhost:5000/api/search?q=${query}`);
      setResults(response.data);
    } catch (error) {
      console.error('Error searching for companies:', error);
    }
  };

  return (
    <div>
      <h1>Search for Companies</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter company name or ticker"
        />
        <button type="submit">Search</button>
      </form>
      <div>
        <h2>Marginal Companies</h2>
        <ul>
          {results.marginalCompanies.map(company => (
            <li key={company.ticker}>{company.name}: ${company.price}</li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Leading Companies</h2>
        <ul>
          {results.leadingCompanies.map(company => (
            <li key={company.ticker}>{company.name}: ${company.price}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Search;
