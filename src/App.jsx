import React from 'react';
import MainRouter from './routers/Main';
import { connect } from 'react-redux';

// components
import AppHeader from './components/AppHeader/AppHeader';

// helpers
import { HEADER_OPTIONS } from './constants';

// images
import Logo from './assets/app-logo.png';

const App = () => {
    return (
        <>
            <AppHeader Logo={Logo} options={HEADER_OPTIONS}/>
            <MainRouter />
        </>
    );
};

const mS = () => ({});
const mD = {};

export default connect(mS, mD)(App);
