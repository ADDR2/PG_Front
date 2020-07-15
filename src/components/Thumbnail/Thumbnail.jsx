import React from 'react';
import PropTypes from 'prop-types';

// styles
import './Thumbnail.scss';

const Thumbnail = ({ activity, className = '', style = {} }) => {
    return (
        <div
            className={`pg-thumbnail ${className}`}
            style={style}
        >
            <img
                className="pg-thumbnail-image"
                src={activity.image}
                alt={activity.name}
            />

            <div className="pg-thumbnail-info">
                <p className="info-name">{ activity.name }</p>
                <p className="info-type"><b>Type: </b>{ activity.type }</p>
                <p className="info-access"><b>Accessibility: </b>{ activity.accessibility }</p>
                <p className="info-price"><b>{ activity.price } USD</b></p>
            </div>
        </div>
    );
};

Thumbnail.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    activity: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        price: PropTypes.number,
        accessibility: PropTypes.number,
        type: PropTypes.string,
        isFavorite: PropTypes.bool
    }).isRequired
};

export default Thumbnail;