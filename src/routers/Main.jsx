import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

// components
import ConnectedRoutes from '../components/ConnectedRoute/ConnectedRoute';

// containers
import Dashboard from '../containers/Dashboard';
import NotFound from '../containers/NotFound';

const MainRouter = () => (
    <Router>
        <Switch>
            <ConnectedRoutes>
                <Route path="/" component={ Dashboard } />
                <Route path="*" component={ NotFound } />
            </ConnectedRoutes>
        </Switch>
    </Router>
);

export default MainRouter;