import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import PropTypes from 'prop-types';

const PGProgressBar = withStyles(() => ({
    colorPrimary: {
      backgroundColor: '#d2ccc4',
    },
    bar: {
      borderRadius: 5,
      backgroundColor: '#2f4353',
    },
}))(LinearProgress);

const ProgressBar = ({ className = '', style = {} }) => {

    return (
        <PGProgressBar
            className={`app-progress-bar ${className}`}
            style={style}
        />
    );
}

ProgressBar.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object
};

export default ProgressBar;