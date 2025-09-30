import React from 'react';
import { Link } from 'react-router-dom';
import './NonExistentPage.css';

const NonExistentPage = () => {
  return (
    <main className="non-existent-page-main">
      <h3>404 not found.</h3>
      <div>Page not found</div>
      <button>
        <Link to={'/'}>click here to go home.</Link>
      </button>
    </main>
  );
};

export default NonExistentPage;
