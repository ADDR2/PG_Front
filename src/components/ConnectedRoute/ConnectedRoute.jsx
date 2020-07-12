import React from 'react';
import PropTypes from 'prop-types';
import { useHistory, useLocation } from 'react-router-dom';

// services
import NavigationService from '../../services/Navigation.service';

// helpers
import { stringifyUrl } from 'query-string';

const ConnectedRoute = ({ children }) => {
    const location = useLocation();
    const history = useHistory();

    React.useEffect(
        () => {
            NavigationService.shutdown();
            NavigationService.on('navigate', (search, callback) => {
                try {
                    const currentURL = location.pathname + location.search;
                    history.push(stringifyUrl({ url: currentURL, query: { ...search } }));

                    callback();
                } catch(error) {
                    console.warn(error);
                    callback(error);
                }
            });

            return () => {
                NavigationService.shutdown();
            };
        },
        [ history, location.pathname, location.search ]
    );

    return children;
};

ConnectedRoute.propTypes = {
    children: PropTypes.any.isRequired
};

export default ConnectedRoute;