import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Main from '../Main';

function Router() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path='/'>
                    <Main />
                </Route>
                <Route>
                    <h4>404</h4>
                </Route>
            </Switch>
        </BrowserRouter>
    );
}

export default Router;