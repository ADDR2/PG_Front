import { update } from '../Dashboard.reducer';

// services
import HttpService from '../../../services/Http.service';
import CacheService from '../../../services/Cache.service';

export default componentSignal => async dispatch => {
    try {
        const result = await HttpService.getActivities(componentSignal);
        if (result && result.aborted) return { aborted: true };

        const favorites = await CacheService.getFavorites();

        const mappedActivities = result.map(item => ({
            id: item.id,
            name: item.activity,
            image: item.imageUrl,
            price: item.price,
            type: item.type,
            isFavorite: favorites.includes(item.id)
        }));

        dispatch(update({ activities: mappedActivities }));

        return { loaded: true, size: mappedActivities.length };
    } catch(error) {
        console.warn(error);
        return { error: true };
    }
};