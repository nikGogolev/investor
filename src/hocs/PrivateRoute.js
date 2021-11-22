import React from "react";
import { Navigate } from "react-router-dom";
import {HOMEPAGE} from '../utils/constants';

export default function PrivateRoute({ authenticated, children }) {
  return authenticated ? (
    children
  ) : (
    <Navigate to={{ pathname: `${HOMEPAGE}/login` }} />
  );
};