export const FETCH_SETTINGS_REQUEST = 'FETCH_SETTINGS_REQUEST';
export const FETCH_SETTINGS_SUCCESS = 'FETCH_SETTINGS_SUCCESS';
export const FETCH_SETTINGS_ERROR = 'FETCH_SETTINGS_ERROR';
export const SELECT_MODE = 'SELECT_MODE';
export const SET_TABLE = 'SET_TABLE';

export const fetchSettingsRequest = () => ({ type: FETCH_SETTINGS_REQUEST });
export const fetchSettingsSuccess = (data) => ({ type: FETCH_SETTINGS_SUCCESS, data });
export const fetchSettingsError = (error) => ({ type: FETCH_SETTINGS_ERROR, error });
export const selectMode = (option) => ({ type: SELECT_MODE, option });
export const setTable = (table) =>({type:SET_TABLE, table});