export default class CacheService {
    static async addFavorite(favoriteId = '') {
        try {
            const result = localStorage.getItem('favorites');

            if (result) {
                const currentFavorites = JSON.parse(result);
                if (currentFavorites.includes(favoriteId)) return { duplicated: true };

                localStorage.setItem(
                    'favorites',
                    JSON.stringify([ ...currentFavorites, favoriteId ])
                );
            } else {
                localStorage.setItem(
                    'favorites',
                    JSON.stringify([ favoriteId ])
                );
            }

            return { duplicated: false };
        } catch(error) {
            console.warn(error);
            return { error: true };
        }
    }

    static async removeFavorite(favoriteId = '') {
        try {
            const result = localStorage.getItem('favorites');

            if (result) {
                const currentFavorites = JSON.parse(result);
                const itemIndex = currentFavorites.indexOf(favoriteId);

                if (itemIndex > -1) {
                    currentFavorites.splice(itemIndex, 1);

                    localStorage.setItem(
                        'favorites',
                        JSON.stringify(currentFavorites)
                    );
                } else {
                    throw new Error('Could not find id');
                }
                
            } else {
                throw new Error('Could not find id');
            }

            return { error: false };
        } catch(error) {
            console.warn(error);
            return { error: true };
        }
    }

    static async getFavorites() {
        try {
            const result = localStorage.getItem('favorites');
            if (result) return JSON.parse(result);

            return [];
        } catch(error) {
            console.warn(error);
            return false;
        }
    }

    static async addLocalActivity(activity = {}) {
        try {
            const localActivities = localStorage.getItem('local_activities');
            const newId = `local-${localActivities.length}`;
            const newActivity = { ...activity, id: newId };

            if (localActivities) {
                const activities = JSON.parse(localActivities);
                activities.push(newActivity);

                localStorage.setItem('local_activities', JSON.stringify(activities));
            } else {
                localStorage.setItem('local_activities', JSON.stringify([ newActivity ]));
            }

            return newActivity;
        } catch(error) {
            console.warn(error);
            return false;
        }
    }

    static async getLocalActivities() {
        try {
            const result = localStorage.getItem('local_activities');
            if (result) return JSON.parse(result);

            return [];
        } catch(error) {
            console.warn(error);
            return false;
        }
    }
}