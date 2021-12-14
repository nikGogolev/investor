import React, { useCallback, useEffect, useState } from 'react';
import { HashRouter as MyRouter, Link, Route, Routes } from 'react-router-dom';
import Main from '../Main';
import PrivateRoute from '../../hocs/PrivateRoute';
import PublicRoute from '../../hocs/PublicRoute';
import { auth } from '../../services/firebase';
import { HOMEPAGE } from '../../utils/constants';
import { onAuthStateChanged, signOut } from "firebase/auth";
import SignUp from '../SignUp';
import LogIn from '../LogIn';
import Profile from '../Profile';
import { makeStyles } from '@material-ui/core';
import TickerPage from '../TickerPage';

const useStyles = makeStyles((theme) => ({
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '450px'
    },

    link: {
        textDecoration: 'none',
        margin: '5px 10px',
        padding: '2px 5px',
        border: '1px solid black',
        borderRadius: '5px',
        backgroundColor: 'lightgray',
        color: 'black'
    }
}));

function Router() {
    const [authed, setAuthed] = useState(false);

    const classes = useStyles();

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
    }, []);

    return (
        <MyRouter>
            <header className={classes.header}>
                <Link to={`${HOMEPAGE}/`} className={classes.link}>Main</Link>
                <Link to={`${HOMEPAGE}/profile`} className={classes.link}>Profile</Link>
                <Link to={`${HOMEPAGE}/signup`} className={classes.link}>Registration</Link>
                <Link to={`${HOMEPAGE}/login`} className={classes.link}>Login</Link>
                <button onClick={signOutUser} className={classes.link}>Sign Out</button>
            </header>
            <Routes>

                <Route authenticated={authed} exact path={`${HOMEPAGE}/`}
                    element={
                        <PrivateRoute authenticated={authed}>
                            <Main />
                        </PrivateRoute>
                    }
                />

                <Route authenticated={authed} path=":ticker"
                    element={
                        <PrivateRoute authenticated={authed}>
                            <TickerPage />
                        </PrivateRoute>
                    }
                />

                <Route authenticated={authed} exact path={`${HOMEPAGE}/profile`}
                    element={
                        <PrivateRoute authenticated={authed}>
                            <Profile />
                        </PrivateRoute>
                    }
                />

                <Route authenticated={authed} path={`${HOMEPAGE}/signup`}
                    element={
                        <PublicRoute authenticated={authed}>
                            <SignUp />
                        </PublicRoute>
                    }
                />

                <Route authenticated={authed} path={`${HOMEPAGE}/login`}
                    element={
                        <PublicRoute authenticated={authed}>
                            <LogIn />
                        </PublicRoute>
                    }
                />
                <Route element={<h4>404</h4>} />


            </Routes>
        </MyRouter>
    );
}

export default Router;