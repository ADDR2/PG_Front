import React from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';

// components
import ProgressSpinner from '../components/ProgressSpinner/ProgressSpinner';
import SidePanel from '../components/SidePanel/SidePanel';

// reducer methods
import CreateActivity from '../ducks/Dashboard/methods/CreateActivity';

// constants
import { USER_FEEDBACK } from '../constants';

// styles
import '../styles/AddActivity.scss';

const Favorites = ({ CreateActivity }) => {
    const history = useHistory();

    async function create(event) {
        event.preventDefault();

        try {
            const result = await CreateActivity();

            if (!result) {
                toast.error(USER_FEEDBACK.COULD_NOT_SAVE_INFO);
            } else {
                toast.success(USER_FEEDBACK.SAVED_INFO);
                history.replace('/activities');
            }
        } catch(error) {
            console.warn(error);
            toast.error(USER_FEEDBACK.UNEXPECTED_ERROR);
        }
    }

    return (
        <SidePanel
            title="Create Activity"
            afterCloseRoute="/activities"
        >
            <form
                className="pg-add-form"
                onSubmit={create}
            >

            </form>
        </SidePanel>
    );
};

const mS = () => ({});
const mD = { CreateActivity };

export default connect(mS, mD)(Favorites);