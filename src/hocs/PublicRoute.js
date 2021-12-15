import React from "react";
import { Navigate } from "react-router-dom";
import { HOMEPAGE } from '../utils/constants';

export default function PublicRoute({ authenticated, children }) {
  return !authenticated ?  children : <Navigate to={`${HOMEPAGE}/`} />;
};