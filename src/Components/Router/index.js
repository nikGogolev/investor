import React, { useEffect, useState } from 'react';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import Main from '../Main';
import PrivateRoute from '../../hocs/PrivateRoute';
import PublicRoute from '../../hocs/PublicRoute';
import { auth } from '../../services/firebase';
import { HOMEPAGE } from '../../utils/constants';
import { onAuthStateChanged } from "firebase/auth";
import SignUp from '../SignUp';
import LogIn from '../LogIn';

function Router() {
    const [authed, setAuthed] = useState(false);

    useEffect(() => {

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setAuthed(true);
            } else {
                setAuthed(false);
            }
        });
        return unsubscribe;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <BrowserRouter>
            <header>
                <Link to={`${HOMEPAGE}/main`}>Main</Link>
                <Link to={`${HOMEPAGE}/signup`}>Registration</Link>
                <Link to={`${HOMEPAGE}/login`}>Login</Link>
            </header>
            <Switch>
                <PrivateRoute authenticated={authed} exact path={`${HOMEPAGE}/main`}>
                    <Main />
                </PrivateRoute>
                <PublicRoute authenticated={authed} path={`${HOMEPAGE}/signup`}>
                    <SignUp />
                </PublicRoute>
                <PublicRoute authenticated={authed} path={`${HOMEPAGE}/login`}>
                    <LogIn />
                </PublicRoute>
                <Route>
                    <h4>404</h4>
                </Route>
            </Switch>
        </BrowserRouter>
    );
}

export default Router;