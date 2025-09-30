import PropTypes from 'prop-types';
import Header from '../components/Header/Header.js';
import SidePane from './../components/SidePane/SidePane.js';

function PageStructure({ children }) {
  return (
    <div className="page-structure">
      <Header />
      <SidePane />
      {children}
    </div>
  );
}

PageStructure.propTypes = {
  children: PropTypes.node,
};

export default PageStructure;
