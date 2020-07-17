import update from 'immutability-helper';
import { update as updateState } from '../Dashboard.reducer';

// services
import CacheService from '../../../services/Cache.service';

export default (itemId, isFavorite, { name: itemName }) => async (dispatch, getState) => {
    try {
        const { error, duplicated } = await (isFavorite ? CacheService.addFavorite(itemId) : CacheService.removeFavorite(itemId));
        if (error) throw new Error('Could not add or remove favorite');
        if (duplicated) return { duplicated: true };

        const { DashBoard: { activities } } = getState();
        const itemIndex = activities.findIndex(({ id, name }) => id === itemId && name === itemName);
        const updatedActivities = update(
            activities,
            { [itemIndex]: { isFavorite: { $set: isFavorite } } }
        );

        dispatch(updateState({ activities: updatedActivities }));

        return { error: false };
    } catch(error) {
        console.warn(error);
        return { error: true };
    }
};