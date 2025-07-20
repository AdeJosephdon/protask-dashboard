import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import Header from '../components/Home copy/Header.js';
// import Footer from '../components/Home copy/Footer.js';

function PageStructure({ children }) {
  const location = useLocation();

  return (
    <div className="page-structure">
      <Header />

      {children}

      {!(
        location.pathname === '/about' || location.pathname === '/techstack'
      ) && <Header />}
    </div>
  );
}

PageStructure.propTypes = {
  children: PropTypes.node,
};

export default PageStructure;
