import React from "react";
import { Navigate, useLocation } from "react-router-dom";


/**
 * 
 * children and context being passed down to make sure user is authenticated and if not redirect.
 */
function PrivateRoute({ children, context }) {
  const location = useLocation();
  let isAuthenticated = context.authenticatedUser;
  return isAuthenticated ? children : <Navigate to="/signin" replace state={{from: location}}/>;
}

export default PrivateRoute;