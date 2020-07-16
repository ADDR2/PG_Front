import { update } from '../Favorites.reducer';

// services
import CacheService from '../../../services/Cache.service';

export default () => async (dispatch, getState) => {
    try {
        const favorites = await CacheService.getFavorites();
        const { DashBoard: { activities } } = getState();
        const favoriteIds = {};

        const mappedFavorites = activities.filter(({ id }) => {
            if (id in favoriteIds) return false;
            
            favoriteIds[id] = true;
            return favorites.includes(id);
        });

        dispatch(update({ favoriteActivities: mappedFavorites }));

        return { loaded: true, size: mappedFavorites.length };
    } catch(error) {
        console.warn(error);
        return { error: true };
    }
};