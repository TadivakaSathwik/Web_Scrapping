import React, { useEffect, useState } from 'react';
import axios from 'axios';

const LeadingCompanies = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:3001/api/leading-companies');
        setCompanies(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleRefresh = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:3001/api/refresh-leading-companies');
      setCompanies(response.data);
    } catch (error) {
      console.error('Error refreshing data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Top 5 Leading Companies</h1>
      <button onClick={handleRefresh}>Refresh</button>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {companies.map(company => (
            <li key={company.ticker}>
              {company.name}: ${company.price}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LeadingCompanies;
