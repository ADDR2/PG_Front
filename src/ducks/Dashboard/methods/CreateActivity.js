import update from 'immutability-helper';
import { update as updateState } from '../Dashboard.reducer';

// services
import CacheService from '../../../services/Cache.service';

export default activity => async (dispatch, getState) => {
    try {
        const result = await CacheService.addLocalActivity(activity);
        if (!result) throw new Error('Could not create local activity');

        const parsedActivity = {
            id: result.id,
            name: result.activity,
            image: result.imageUrl,
            price: result.price,
            accessibility: result.accessibility,
            type: result.type,
            isFavorite: false
        };

        const { DashBoard: { activities } } = getState();
        const updatedActivities = update(
            activities,
            { $push: [parsedActivity] }
        );

        dispatch(updateState({ activities: updatedActivities }));

        return true;
    } catch(error) {
        console.warn(error);
        return false;
    }
};