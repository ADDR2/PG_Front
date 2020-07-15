import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";

// containers
import Dashboard from '../containers/Dashboard';
import NotFound from '../containers/NotFound';

// components
import AppHeader from '../components/AppHeader/AppHeader';

// helpers
import { HEADER_OPTIONS } from '../constants';

// images
import Logo from '../assets/app-logo.png';

const MainRouter = () => (
    <Router>
        <AppHeader Logo={Logo} options={HEADER_OPTIONS}/>
        <Switch>
            <Route exact path="/">
                <Redirect to="/activities"/>
            </Route>
            <Route path="/activities" component={ Dashboard } />
            <Route path="*" component={ NotFound } />
        </Switch>
    </Router>
);

export default MainRouter;