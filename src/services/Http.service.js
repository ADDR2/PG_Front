const {
    REACT_APP_BACKEND_PROTOCOL,
    REACT_APP_BACKEND_PORT,
    REACT_APP_BACKEND_DOMAIN
} = process.env;
const BACKEND_PORT = REACT_APP_BACKEND_PORT ? `:${REACT_APP_BACKEND_PORT}` : '';
const BACKEND_PREFIX_URL = `${REACT_APP_BACKEND_PROTOCOL}://${REACT_APP_BACKEND_DOMAIN}${BACKEND_PORT}`;
const ACTIVITIES_DOMAIN = 'api/activity';

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
            `${BACKEND_PREFIX_URL}/${ACTIVITIES_DOMAIN}/list`,
            {},
            componentSignal
        );
    }
}