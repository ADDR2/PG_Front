import { update } from '../Dashboard.reducer';

// services
import HttpService from '../../../services/Http.service';
import CacheService from '../../../services/Cache.service';

export default componentSignal => async dispatch => {
    try {
        const result = await HttpService.getActivities(componentSignal);
        if (result && result.aborted) return { aborted: true };

        const localActivities = await CacheService.getLocalActivities();
        if (!localActivities) throw new Error('Could not load local activities');

        const favorites = await CacheService.getFavorites();
        const types = [];

        const mappedActivities = [ ...result, ...localActivities ].map(item => {
            types.push(item.type);

            return {
                id: item.id,
                name: item.activity,
                image: item.imageUrl,
                price: item.price,
                accessibility: item.accessibility,
                type: item.type,
                isFavorite: favorites.includes(item.id)
            };
        });

        dispatch(update({ activities: mappedActivities, differentTypes: Array.from(new Set( types )) }));

        return { loaded: true, size: mappedActivities.length };
    } catch(error) {
        console.warn(error);
        return { error: true };
    }
};