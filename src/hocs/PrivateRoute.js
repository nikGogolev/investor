import React from "react";
import { Route, Redirect } from "react-router-dom";
import {HOMEPAGE} from '../utils/constants';

export default function PrivateRoute({ authenticated, ...rest }) {
  return authenticated ? (
    <Route {...rest} />
  ) : (
    <Redirect to={{ pathname: `${HOMEPAGE}/login` }} />
  );
};