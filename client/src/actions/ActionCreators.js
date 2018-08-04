import * as ActionTypes from '../constants/actionTypes';
import { filter } from '../utils/helperFunctions';

export const loadApps = (apps) => dispatch => {
    return {
        type: ActionTypes.LOAD_APPS,
        payload: apps
    };
};