import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header/Header.js';
// import Footer from '../components/Home copy/Footer.js';

function PageStructure({ children }) {
  const location = useLocation();

  return (
    <div className="page-structure">
      {/* <Header /> */}
      {!(
        location.pathname === '/login' || location.pathname === '/register'
      ) && <Header />}

      {children}
    </div>
  );
}

PageStructure.propTypes = {
  children: PropTypes.node,
};

export default PageStructure;
