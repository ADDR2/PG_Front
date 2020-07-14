const actions = {
    create: 'FAVORITES_CREATE',
    update: 'FAVORITES_UPDATE',
    clear: 'FAVORITES_CLEAR'
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
    favoriteActivities: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case actions.create: return action.payload;
        case actions.update: return { ...state, ...action.payload };
        case actions.clear: return initialState;
        default: return state;
    }
};