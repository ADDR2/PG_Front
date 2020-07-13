export default class HttpService {
    static requestHandler(
        url = '',
        options = {},
        componentSignal
    ) {
        const controller = new AbortController();
        const request = fetch(
            url,
            { ...options, signal: controller.signal }
        );

        const abortFunction = () => controller.abort();
        componentSignal && componentSignal.once('unMounted', abortFunction);

        return request
            .then(result => {
                if (result.status >= 400) {
                    console.warn(result);
                    throw new Error(`${result.url} responded with ${result.status}`);
                }
                return result.json();
            })
            .catch(error => {
                if (error.name === 'AbortError') {
                    console.warn('Request aborted');
                    return { aborted: true };
                } else throw error;
            })
            .finally(() => {
                componentSignal && componentSignal.removeListener('unMounted', abortFunction);
            })
        ;
    }

    static getActivities(componentSignal) {
        return HttpService.requestHandler(
            'https://bored-api.firebaseapp.com/api/activity/list',
            {},
            componentSignal
        );
    }
}