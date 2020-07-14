export default class CacheService {
    static async addFavorites(favorites = []) {
        try {
            const result = localStorage.getItem('favorites');

            if (result) {
                const currentFavorites = JSON.parse(result);
                localStorage.setItem(
                    'favorites',
                    JSON.stringify([ ...favorites, ...currentFavorites ])
                );
            } else {
                localStorage.setItem(
                    'favorites',
                    JSON.stringify(favorites)
                );
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