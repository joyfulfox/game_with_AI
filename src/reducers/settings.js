import {
    FETCH_SETTINGS_REQUEST,
    FETCH_SETTINGS_SUCCESS,
    FETCH_SETTINGS_ERROR,
    SELECT_MODE,
    SET_TABLE,
} from '../actions/settingsActions';

const initialState = {
    loading: true,
    data: {},
    error: null,
    selectedMode: {
        delay: 2000,
        field: 5
    },
    table: [],
};

const settings = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_SETTINGS_REQUEST:
            return { ...state, loading: true };
        case FETCH_SETTINGS_SUCCESS:
            return { ...state, loading: false, data: action.data };
        case FETCH_SETTINGS_ERROR:
            return { ...state, loading: false, error: action.error };
        case SELECT_MODE:
            return { ...state, selectedMode: state.data[action.option] || state.selectedMode };
        case SET_TABLE:
            return {...state, table: action.table}
        default:
            return state;
    }
};

export default settings;