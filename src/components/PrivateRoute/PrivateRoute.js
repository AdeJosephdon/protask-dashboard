// import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useData } from '../DataContext/Datacontext';

const PrivateRoute = ({ children }) => {
  const { user } = useData();
  //   const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/register" />;
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoute;
