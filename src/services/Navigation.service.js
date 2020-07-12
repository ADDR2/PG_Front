import { EventEmitter } from 'events';
import { parseUrl } from 'query-string';

class NavigationService extends EventEmitter {
    constructor(keepTrackOfChanges = false) {
        super();

        this.routeChanges = [];
        this.keepTrackOfChanges = keepTrackOfChanges;
    }

    navigate(params = {}) {
        this.emit('navigate', params, error => {
            if (error || !this.keepTrackOfChanges) return;

            const currentState = parseUrl(window.location.href);
            this.routeChanges.push({ currentState, nextState: params });
        });
    }

    shutdown() {
        this.removeAllListeners('navigate');
    }
}

export default Object.seal(new NavigationService());