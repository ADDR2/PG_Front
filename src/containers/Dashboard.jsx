import React from 'react';
import { connect } from 'react-redux';
import { EventEmitter } from 'events';
import { toast } from 'react-toastify';

// components
import ProgressBar from '../components/ProgressBar/ProgressBar';
import PGTable from '../components/PGTable/PGTable';
import ActivitiesRouter from '../routers/Activities.router';

// reducer methods
import initDashBoard from '../ducks/Dashboard/methods/InitDashboard';

// constants
import { USER_FEEDBACK } from '../constants';

// styles
import '../styles/Dashboard.scss';

const ComponentSignal = new EventEmitter();

const Dashboard = ({ initDashBoard, activities }) => {
    const [ isLoading, setLoadingState ] = React.useState(false);

    React.useEffect(
        () => {
            let stillMounted = true;
            setLoadingState(true);

            initDashBoard(ComponentSignal)
                .then(({ error, loaded, aborted, size }) => {
                    if (!stillMounted || aborted) return;

                    error && toast.error(USER_FEEDBACK.COULD_NOT_LOAD_INFO);
                    loaded && !size && toast.info(USER_FEEDBACK.NO_DATA);
                })
                .catch(error => {
                    console.warn(error);
                    toast.error(USER_FEEDBACK.UNEXPECTED_ERROR);
                })
                .finally(() => setLoadingState(false))
            ;

            return () => {
                stillMounted = false;
                ComponentSignal.emit('unMounted');
            };
        },
        [ initDashBoard ]
    );

    if (isLoading) return <ProgressBar />;

    return (
        <>
            <div className="pg-dashboard-container">
                <PGTable activities={activities}/>
            </div>
            <ActivitiesRouter/>
        </>
    );
};

const mS = ({ DashBoard }) => ({ ...DashBoard });
const mD = { initDashBoard };

export default connect(mS, mD)(Dashboard);