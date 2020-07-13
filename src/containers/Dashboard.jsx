import React from 'react';
import { connect } from 'react-redux';
import { EventEmitter } from 'events';

// components
import ProgressBar from '../components/ProgressBar/ProgressBar';

// reducer methods
import initDashBoard from '../ducks/Dashboard/methods/InitDashboard';

// styles
import '../styles/Dashboard.scss';

const ComponentSignal = new EventEmitter();

const Dashboard = ({ initDashBoard }) => {
    const [ isLoading, setLoadingState ] = React.useState(false);

    React.useEffect(
        () => {
            setLoadingState(true);

            initDashBoard(ComponentSignal)
                .then(loaded => {

                })
                .catch(error => {
                    // Handle error
                })
                .finally(() => setLoadingState(false))
            ;

            return () => {
                ComponentSignal.emit('unMounted');
            };
        },
        [ initDashBoard ]
    );

    if (isLoading) return <ProgressBar />;

    return (
        <></>
    );
};

const mS = ({ DashBoard }) => ({ ...DashBoard });
const mD = { initDashBoard };

export default connect(mS, mD)(Dashboard);