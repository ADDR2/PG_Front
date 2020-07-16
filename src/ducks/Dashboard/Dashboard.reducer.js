const actions = {
    create: 'DASHBOARD_CREATE',
    update: 'DASHBOARD_UPDATE',
    clear: 'DASHBOARD_CLEAR'
};

export const create = payload => {
    return {
        type: actions.create,
        payload
    };
};

export const update = payload => {
    return {
        type: actions.update,
        payload
    };
};

export const clear = () => {
    return {
        type: actions.clear
    };
};
  

const initialState = {
    activities: [],
    differentTypes: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case actions.create: return action.payload;
        case actions.update: return { ...state, ...action.payload };
        case actions.clear: return initialState;
        default: return state;
    }
};