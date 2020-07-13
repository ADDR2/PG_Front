import { update } from '../Dashboard.reducer';

// services
import HttpService from '../../../services/Http.service';

export default componentSignal => async dispatch => {
    try {
        const result = await HttpService.getActivities(componentSignal);
        if (result && result.aborted) return { aborted: true };

        const mappedActivities = result.map(item => {

            return {
                id: item.id,
                name: item.activity,
                image: item.imageUrl,
                price: item.price,
                type: item.type
            };
        });

        dispatch(update({ activities: mappedActivities }));

        return true;
    } catch(error) {
        console.warn(error);
        return false;
    }
};