import React from 'react';
import MaterialTable from 'material-table';
import { forwardRef } from 'react';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Checkbox from '@material-ui/core/Checkbox';
import Star from '@material-ui/icons/Star';
import StarBorder from '@material-ui/icons/StarBorder';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import Search from '@material-ui/icons/Search';
import PropTypes from 'prop-types';

const tableIcons = {
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />)
};

const PGTable = ({ activities, onChecked, className = '', style = {} }) => {
    return (
        <MaterialTable
            title="Activities"
            columns={[
                {
                    title: '',
                    field: 'image',
                    sorting: false,
                    searchable: false,
                    width: 120,
                    cellStyle: { backgroundColor: '#d2ccc4', borderColor: '#d2ccc4' },
                    headerStyle: { backgroundColor: '#d2ccc4', borderColor: '#d2ccc4' },
                    render: ({ image }) => (
                        <img
                            alt="Avatar"
                            src={image}
                            style={{ width: 120, borderRadius: '5px' }}
                        />
                    )
                },
                { title: 'Name', field: 'name' },
                { title: 'Price', field: 'price', type: 'numeric' },
                { title: 'Accessibility', field: 'accessibility', type: 'numeric' },
                { title: 'Type', field: 'type' },
                {
                    title: '',
                    field: 'isFavorite',
                    type: 'boolean',
                    searchable: false,
                    render: ({ isFavorite, id, ...otherKeys }) => (
                        <Checkbox
                            icon={<StarBorder />}
                            checkedIcon={<Star />}
                            checked={isFavorite}
                            color="primary"
                            onClick={() => onChecked(id, !isFavorite, otherKeys)}
                        />
                    )
                }
            ]}
            data={activities}        
            options={{
                search: true,
                maxBodyHeight: 'calc(100vh - 70px - 60px - 120px)'
            }}
            icons={tableIcons}
            className={`pg-dashboard-table ${className}`}
            style={style}
        />
    );
};

PGTable.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    onChecked: PropTypes.func.isRequired,
    activities: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            image: PropTypes.string,
            price: PropTypes.number,
            accessibility: PropTypes.number,
            type: PropTypes.string
        })
    ).isRequired
};

export default PGTable;