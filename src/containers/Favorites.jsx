import React from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

// components
import ProgressSpinner from '../components/ProgressSpinner/ProgressSpinner';
import SidePanel from '../components/SidePanel/SidePanel';
import ThumbnailList from '../components/Thumbnail/ThumbnailList';

// reducer methods
import InitFavorites from '../ducks/Favorites/methods/InitFavorite';

// constants
import { USER_FEEDBACK } from '../constants';

// styles
import '../styles/Favorites.scss';

const Favorites = ({ InitFavorites, favoriteActivities }) => {
    const [ isLoading, setLoadingState ] = React.useState(false);

    React.useEffect(
        () => {
            let stillMounted = true;
            setLoadingState(true);

            InitFavorites()
                .then(({ error, loaded, size }) => {
                    if (!stillMounted) return;

                    error && toast.error(USER_FEEDBACK.COULD_NOT_LOAD_INFO);
                    loaded && !size && toast.info(USER_FEEDBACK.NO_DATA);
                })
                .catch(error => {
                    console.warn(error);
                    toast.error(USER_FEEDBACK.UNEXPECTED_ERROR);
                })
                .finally(() => stillMounted && setLoadingState(false))
            ;

            return () => {
                stillMounted = false;
            };
        },
        [ InitFavorites ]
    );

    return (
        <SidePanel
            title="Favorite Activities"
            afterCloseRoute="/activities"
        >
            { isLoading
                ? <ProgressSpinner size={100} className="pg-favorites-loader" />
                : <ThumbnailList activities={favoriteActivities} />
            }
        </SidePanel>
    );
};

const mS = ({ Favorites }) => ({ ...Favorites });
const mD = { InitFavorites };

export default connect(mS, mD)(Favorites);