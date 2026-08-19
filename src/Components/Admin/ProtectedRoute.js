import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { user, loading } = useAuth();

  if (loading) return null;

  return (
    <Route
      {...rest}
      render={(props) =>
        user ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/admin/login", state: { from: props.location } }} />
        )
      }
    />
  );
};

export default ProtectedRoute;
