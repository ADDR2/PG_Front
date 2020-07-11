/* 3rd party libraries */
import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

/* Local libraries */
import Dashboard from '../containers/Dashboard';
import NotFound from '../containers/NotFound';

const MainRouter = () => {
    return (
        <Router>
            <Switch>
                <Route path="/" component={Dashboard} />
                <Route path="*" component={NotFound} />
            </Switch>
        </Router>
    );
};

export default MainRouter;