import React from 'react';
import PropTypes from 'prop-types';

// components
import Thumbnail from './Thumbnail';

// styles
import './ThumbnailList.scss';

const ThumbnailList = ({ activities, className = '', style = {} }) => {
    return (
        <div
            className={`pg-thumbnail-list ${className}`}
            style={style}
        >
            {
                activities.map(activity => (
                    <Thumbnail
                        key={`pg-thumbnail-${activity.id}`}
                        activity={activity}
                    />
                ))
            }
        </div>
    );
};

ThumbnailList.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    activities: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            image: PropTypes.string.isRequired,
            price: PropTypes.number,
            accessibility: PropTypes.number,
            type: PropTypes.string,
            isFavorite: PropTypes.bool
        })
    ).isRequired
};

export default ThumbnailList;