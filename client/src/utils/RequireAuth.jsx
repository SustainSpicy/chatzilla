import React from "react";
import { connect } from "react-redux";
import { useLocation, Navigate, Outlet } from "react-router-dom";

const RequireAuth = ({ auth }) => {
  const location = useLocation();
  return auth ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

const mapStateToProps = ({ auth }) => {
  return {
    auth: auth?.authData,
  };
};

export default connect(mapStateToProps)(RequireAuth);
