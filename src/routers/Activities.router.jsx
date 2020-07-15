import React from 'react';
import {
    Switch,
    Route,
    Redirect
} from "react-router-dom";

// containers
import Favorites from '../containers/Favorites';

const ActivitiesRouter = () => (
    <Switch>
        <Route path="/activities/favorites" component={ Favorites } />
        <Route path="/activities/*">
            <Redirect to="/activities"/>
        </Route>
    </Switch>
);

export default ActivitiesRouter;