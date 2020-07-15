import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

// components
import IconButton from '@material-ui/core/IconButton';
import ArrowForward from '@material-ui/icons/ArrowForward';

// styles
import './SidePanel.scss';

const SidePanel = ({ children, title, afterCloseRoute }) => {
    const history = useHistory();

    function closePanel() {
        const bodyShadowElement = document.querySelector('.pg-body-shadow');
        const sidePanelContainerElement = document.querySelector('.pg-side-panel-container');

        bodyShadowElement.classList.remove('pg-body-shadow');
        bodyShadowElement.classList.add('pg-body-no-shadow');

        sidePanelContainerElement.classList.remove('pg-side-panel-container');
        sidePanelContainerElement.classList.add('pg-side-panel-container-shutdown');

        setTimeout(
            () => history.replace(afterCloseRoute),
            1000
        );
    }

    return (
        <>
            <div
                className="pg-body-shadow"
                onClick={closePanel}
            />
            <div className="pg-side-panel-container">
                <div className="pg-side-panel-header">
                    <IconButton
                        className="pg-side-panel-close-button"
                        onClick={closePanel}
                    >
                        <ArrowForward className="pg-side-panel-close-icon" />
                    </IconButton>
                    <h3 className="pg-side-panel-title">{ title }</h3>
                </div>
                { children }
            </div>
        </>
    );
};

SidePanel.propTypes = {
    children: PropTypes.any.isRequired,
    title: PropTypes.string.isRequired,
    afterCloseRoute: PropTypes.string.isRequired,
    className: PropTypes.string,
    style: PropTypes.object
};

export default SidePanel;