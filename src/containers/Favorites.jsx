import React from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';

// components
import ProgressSpinner from '../components/ProgressSpinner/ProgressSpinner';
import IconButton from '@material-ui/core/IconButton';
import ArrowForward from '@material-ui/icons/ArrowForward';

// reducer methods
import initFavorites from '../ducks/Favorites/methods/initFavorites';

// constants
import { USER_FEEDBACK } from '../constants';

// styles
import '../styles/Favorites.scss';

const Favorites = ({ initFavorites, favoriteActivities }) => {
    const [ isLoading, setLoadingState ] = React.useState(false);
    const history = useHistory();

    React.useEffect(
        () => {
            let stillMounted = true;
            setLoadingState(true);

            initFavorites()
                .then(({ error, loaded, size }) => {
                    if (!stillMounted) return;

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
            };
        },
        [ initFavorites ]
    );

    function closePanel() {
        const bodyShadowElement = document.querySelector('.pg-body-shadow');
        const favoritesContainerElement = document.querySelector('.pg-favorites-container');

        bodyShadowElement.classList.remove('pg-body-shadow');
        bodyShadowElement.classList.add('pg-body-no-shadow');

        favoritesContainerElement.classList.remove('pg-favorites-container');
        favoritesContainerElement.classList.add('pg-favorites-container-shutdown');

        setTimeout(
            () => history.replace('/activities'),
            1000
        );
    }

    return (
        <>
            <div
                className="pg-body-shadow"
                onClick={closePanel}
            />
            <div className="pg-favorites-container">
                <div className="pg-favorites-header">
                    <IconButton
                        className="pg-favorites-close-button"
                        onClick={closePanel}
                    >
                        <ArrowForward className="pg-favorites-close-icon" />
                    </IconButton>
                    <h2 className="pg-favorites-title">Favorite Activities</h2>
                </div>

                { isLoading
                    ? <ProgressSpinner size={100} className="pg-favorites-loader" />
                    : <></>
                }
            </div>
        </>
    );
};

const mS = ({ Favorites }) => ({ ...Favorites });
const mD = { initFavorites };

export default connect(mS, mD)(Favorites);