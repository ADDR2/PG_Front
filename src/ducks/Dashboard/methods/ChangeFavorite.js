import update from 'immutability-helper';
import { update as updateState } from '../Dashboard.reducer';

// services
import CacheService from '../../../services/Cache.service';

export default (itemId, isFavorite) => async (dispatch, getState) => {
    try {
        const result = await (isFavorite ? CacheService.addFavorite(itemId) : CacheService.removeFavorite(itemId));
        if (!result) throw new Error('Could not add or remove favorite');

        const { DashBoard: { activities } } = getState();
        const itemIndex = activities.findIndex(({ id }) => id === itemId);
        const updatedActivities = update(
            activities,
            { [itemIndex]: { isFavorite: { $set: isFavorite } } }
        );

        dispatch(updateState({ activities: updatedActivities }));

        return true;
    } catch(error) {
        console.warn(error);
        return false;
    }
};