import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from 'prop-types';

const PGProgressSpinner = withStyles(() => ({
    colorPrimary: {
      color: '#d2ccc4',
    },
    circle: {
      stroke: '#2f4353',
    },
}))(CircularProgress);

const ProgressSpinner = ({ className = '', style = {}, ...otherProps }) => {

    return (
        <PGProgressSpinner
            className={`app-progress-spinner ${className}`}
            style={style}
            { ...otherProps }
        />
    );
}

ProgressSpinner.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object
};

export default ProgressSpinner;