import React from 'react';
import {
    Switch,
    Route,
    Redirect
} from "react-router-dom";

// containers
import Favorites from '../containers/Favorites';
import AddActivity from '../containers/AddActivity';

const ActivitiesRouter = () => (
    <Switch>
        <Route path="/activities/favorites" component={ Favorites } />
        <Route path="/activities/add" component={ AddActivity } />
        <Route path="/activities/*">
            <Redirect to="/activities"/>
        </Route>
    </Switch>
);

export default ActivitiesRouter;