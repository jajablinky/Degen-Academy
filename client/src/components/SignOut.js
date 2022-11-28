

import { useEffect } from "react";
import { Navigate } from "react-router-dom";


/**
 * UserSignOut ---/
 * @param {*} param0 accesses context for helper function to sign out.
 * @returns navigation back to home screen after successful sign out.
 */
const UserSignOut = ({ context }) => {
  useEffect(() => {
    context.actions.signOut();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Navigate to="/" />;
};

export default UserSignOut;