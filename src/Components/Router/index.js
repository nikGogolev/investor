import React, { useCallback, useEffect, useState } from 'react';
import { HashRouter as MyRouter, Link, Route, Switch } from 'react-router-dom';
import Main from '../Main';
import PrivateRoute from '../../hocs/PrivateRoute';
import PublicRoute from '../../hocs/PublicRoute';
import { auth } from '../../services/firebase';
import { HOMEPAGE } from '../../utils/constants';
import { onAuthStateChanged, signOut } from "firebase/auth";
import SignUp from '../SignUp';
import LogIn from '../LogIn';
import Profile from '../Profile';

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

    const signOutUser = useCallback(() => {
		signOut(auth).then(() => {
		}).catch((error) => {
		});
	},[]);

    return (
        <MyRouter>
            <header>
                <Link to={`${HOMEPAGE}/`}>Main</Link>
                <Link to={`${HOMEPAGE}/profile`}>Profile</Link>
                <Link to={`${HOMEPAGE}/signup`}>Registration</Link>
                <Link to={`${HOMEPAGE}/login`}>Login</Link>
                <button onClick={signOutUser}>Sign Out</button>
            </header>
            <Switch>
                <PrivateRoute authenticated={authed} exact path={`${HOMEPAGE}/`}>
                    <Main />
                </PrivateRoute>
                <PrivateRoute authenticated={authed} exact path={`${HOMEPAGE}/profile`}>
                    <Profile />
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
        </MyRouter>
    );
}

export default Router;