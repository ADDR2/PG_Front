import update from 'immutability-helper';
import { update as updateState } from '../Dashboard.reducer';

// services
import CacheService from '../../../services/Cache.service';

export default activity => async (dispatch, getState) => {
    try {
        const result = await CacheService.addLocalActivity(activity);
        if (!result) throw new Error('Could not create local activity');

        const { DashBoard: { activities } } = getState();
        const updatedActivities = update(
            activities,
            { $push: [result] }
        );

        dispatch(updateState({ activities: updatedActivities }));

        return true;
    } catch(error) {
        console.warn(error);
        return false;
    }
};