import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

// components
import ConnectedRoute from '../components/ConnectedRoute/ConnectedRoute';

// containers
import Dashboard from '../containers/Dashboard';
import NotFound from '../containers/NotFound';

const MainRouter = () => (
    <Router>
        <Switch>
            <ConnectedRoute>
                <Route path="/" component={ Dashboard } />
            </ConnectedRoute>

            <ConnectedRoute>
                <Route path="*" component={ NotFound } />
            </ConnectedRoute>
        </Switch>
    </Router>
);

export default MainRouter;