import React from "react";
import { Route, Redirect } from "react-router-dom";
import isAuthenticated from "../_methods/isAuthenticated";

const PrivateRoute = ({ children, user, ...rest }) => {
  return (
    <Route
      {...rest}
      render={() => {
        if (isAuthenticated()) {
          return children;
        } else {
          return <Redirect {...rest} to="/login" />;
        }
      }}
    />
  );
};

export default PrivateRoute;
