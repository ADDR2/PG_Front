import React from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import MenuItem from '@material-ui/core/MenuItem';

// components
import ProgressSpinner from '../components/ProgressSpinner/ProgressSpinner';
import SidePanel from '../components/SidePanel/SidePanel';
import FileInput from '../components/FileInput/FileInput';

// reducer methods
import CreateActivity from '../ducks/Dashboard/methods/CreateActivity';

// constants
import { USER_FEEDBACK } from '../constants';

// styles
import '../styles/AddActivity.scss';

const Favorites = ({ CreateActivity, differentTypes }) => {
    const [ isSaving, changeSavingState ] = React.useState(false);
    const [ currentFile, changeFile ] = React.useState(null);
    const [ state, changeState ] = React.useState({
        activity: '',
        price: 0,
        accessibility: 0,
        type: '',
        imageUrl: 'https://source.unsplash.com/random/896x504'
    });
    const history = useHistory();

    async function create(event) {
        event.preventDefault();

        try {
            changeSavingState(true);
            const result = await CreateActivity(state);

            if (!result) {
                toast.error(USER_FEEDBACK.COULD_NOT_SAVE_INFO);
                changeSavingState(false);
            } else {
                toast.success(USER_FEEDBACK.SAVED_INFO);
                changeSavingState(false);
                history.replace('/activities');
            }
        } catch(error) {
            console.warn(error);
            toast.error(USER_FEEDBACK.UNEXPECTED_ERROR);
            changeSavingState(false);
        }
    }

    function onDrop(file) {
        changeFile(file);
    }

    function onRejected() {
        toast.error(USER_FEEDBACK.REJECTED_FILE);
    }

    function changeSingleInput(inputKey, numeric, { target: { value } }) {
        changeState(
            state => ({ ...state, [inputKey]: (numeric ? Number(value) : value) })
        );
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
                <TextField
                    required
                    className="pg-add-input"
                    label="Name"
                    variant="outlined"
                    value={state.activity}
                    onChange={changeSingleInput.bind({}, 'activity', false)}
                />

                <TextField
                    required
                    className="pg-add-input"
                    label="Price"
                    variant="outlined"
                    type="number"
                    inputProps={{ step: "0.01", min: "0" }}
                    value={state.price}
                    onChange={changeSingleInput.bind({}, 'price', true)}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    }}
                />

                <TextField
                    required
                    className="pg-add-input"
                    label="Accessibility"
                    variant="outlined"
                    type="number"
                    inputProps={{ step: "0.1", min: "0" }}
                    value={state.accessibility}
                    onChange={changeSingleInput.bind({}, 'accessibility', true)}
                />

                <TextField
                    select
                    required
                    className="pg-add-input"
                    label="Type"
                    value={state.type}
                    onChange={changeSingleInput.bind({}, 'type', false)}
                    variant="outlined"
                >
                    {
                        differentTypes.map(option => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))
                    }
                </TextField>

                <FileInput
                    onDrop={onDrop}
                    onRejected={onRejected}
                    fileName={currentFile ? currentFile.name : ''}
                />

                <div className="pg-add-button-container">
                    <button
                        type="submit"
                        className="pg-add-submit-button"
                        disabled={isSaving || Object.values(state).some(value => value === '')}
                    >
                        { isSaving
                            ? <ProgressSpinner size={20} className="pg-add-button-loader"/>
                            : 'SAVE'
                        }
                    </button>
                </div>
            </form>
        </SidePanel>
    );
};

const mS = ({ DashBoard: { differentTypes } }) => ({ differentTypes });
const mD = { CreateActivity };

export default connect(mS, mD)(Favorites);