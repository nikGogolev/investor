import React from "react";
import { Route, Redirect } from "react-router-dom";
import { HOMEPAGE } from '../utils/constants';

export default function PublicRoute({ authenticated, ...rest }) {
  return !authenticated ? <Route {...rest} /> : <Redirect to={`${HOMEPAGE}/main`} />;
};