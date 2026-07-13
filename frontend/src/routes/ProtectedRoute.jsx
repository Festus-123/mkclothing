

// import { Navigate } from 'react-router-dom';

// const ProtectedRoute = ({ session, children }) => {
//   if (!session) {
//     return <Navigate to="/signin" replace />;
//   }

//   return children;
// };

// export default ProtectedRoute;

import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ session, children }) => {
  if (!session) {
    return <Navigate to="/signin" replace />;
  }

  // Check if the authenticated account has an admin role set in their metadata
  // const isAdmin = session.user?.user_metadata?.role === 'admin'; 

  // if (!isAdmin) {
  //   return <Navigate to="/" replace />;
  // }

  return children;
};

export default ProtectedRoute;