import * as ActionTypes from '../constants/actionTypes';
import { filter } from '../utils/helperFunctions';

export const loadApps = (apps) => dispatch => {
    dispatch({
        type: ActionTypes.LOAD_APPS,
        payload: { apps }
    });
};
export const updateSearch = (apps) => dispatch => {
    dispatch({
        type: ActionTypes.LOAD_SEARCH_APPS,
        payload: { apps }
    });
};