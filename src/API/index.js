import { fetchSettingsRequest, fetchSettingsSuccess, fetchSettingsError } from '../actions/settingsActions';

const BASE_PATH = 'https://starnavi-frontend-test-task.herokuapp.com/';
const SETTING_PATH = 'game-settings';
const WINNERS_PATH = 'winners';

export const fetchSettings = () => async (dispatch) => {
    try {
        dispatch(fetchSettingsRequest());
        const response = await fetch(`${BASE_PATH}${SETTING_PATH}`);
        const data = await response.json();
        dispatch(fetchSettingsSuccess(data));
    } catch (error) {
        dispatch(fetchSettingsError(error.message));
    }
};

export const getWinners = async () => {
    return await fetch(`${BASE_PATH}${WINNERS_PATH}`).then((response) => response.json()).catch((error) => error);
};

export const setNewWinner = async (data) => {
    return await fetch(`${BASE_PATH}${WINNERS_PATH}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
}