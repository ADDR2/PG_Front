/* 3rd party libraries */
import React from 'react';
import MainRouter from './routers/Main';
import { connect } from 'react-redux';

/* Local libraries */

const App = () => {
    return (
        <>
            <MainRouter/>
        </>
    );
};

const mS = () => ({});
const mD = {};

export default connect(mS, mD)(App);
