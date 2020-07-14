import React from 'react';
import MainRouter from './routers/Main';
import { connect } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// components
import AppHeader from './components/AppHeader/AppHeader';

// helpers
import { HEADER_OPTIONS } from './constants';

// images
import Logo from './assets/app-logo.png';

// styles
import './App.scss';

const App = () => {
    return (
        <div className="pg-app-container">
            <AppHeader Logo={Logo} options={HEADER_OPTIONS}/>
            <MainRouter />
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                limit={4}
                pauseOnHover
            />
        </div>
    );
};

const mS = () => ({});
const mD = {};

export default connect(mS, mD)(App);
