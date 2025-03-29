// IsLoggedIn.js
import React from "react";
import { Navigate } from "react-router-dom";

const IsLoggedIn = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
};

export default IsLoggedIn;
