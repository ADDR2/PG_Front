export default class CacheService {
    static async addFavorite(favoriteId = '') {
        try {
            const result = localStorage.getItem('favorites');

            if (result) {
                const currentFavorites = JSON.parse(result);
                !currentFavorites.includes(favoriteId) && localStorage.setItem(
                    'favorites',
                    JSON.stringify([ ...currentFavorites, favoriteId ])
                );
            } else {
                localStorage.setItem(
                    'favorites',
                    JSON.stringify([ favoriteId ])
                );
            }

            return true;
        } catch(error) {
            console.warn(error);
            return false;
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

            return true;
        } catch(error) {
            console.warn(error);
            return false;
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
}