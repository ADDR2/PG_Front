import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// components
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import HamburguerMenu from '@material-ui/icons/Menu';

// styles
import './AppHeader.scss';

const AppHeader = ({ Logo, options, className = '', style = {} }) => {
    const [ anchorEl, setAnchorEl ] = React.useState(null);

    return (
        <div
            className={`pg-app-header ${className}`}
            style={style}
        >
            <Link to="/">
                <img
                    alt="App Logo"
                    className="pg-app-logo"
                    src={Logo}
                />
            </Link>
            

            <IconButton
                aria-label="more"
                aria-controls="long-menu"
                aria-haspopup="true"
                className="app-header-menu-button"
                onClick={({ currentTarget }) => setAnchorEl(currentTarget)}
            >
                <HamburguerMenu className="app-header-menu" />
            </IconButton>

            <Menu
                id="long-menu"
                anchorEl={anchorEl}
                keepMounted
                open={!!anchorEl}
                onClose={() => setAnchorEl(null)}
            >
                { options.map(option => (
                    <MenuItem
                        key={option.name}
                        onClick={() => setAnchorEl(null)}
                    >
                        <Link
                            className="app-menu-link"
                            to={option.route}
                        >{ option.name }</Link>
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
};

AppHeader.propTypes = {
    Logo: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            route: PropTypes.string.isRequired
        })
    ).isRequired,
    className: PropTypes.string,
    style: PropTypes.object
};

export default AppHeader;