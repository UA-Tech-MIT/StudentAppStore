
import {getFormattedDateTime} from '../utils/dates';
import * as helperFuncs from '../utils/helperFunctions';
import * as ActionTypes from '../constants/actionTypes';
import initialState from './initialState';

//TODO make real state
//TODO fill out all crud endpoints (delete, add?)
//TODO Make reducer tests


export default function appStoreReducer(state = initialState.appStore, action) {
    const { type, payload } = action;
    const currentTime  = getFormattedDateTime();
    process.env.NODE_ENV === 'development' ? console.log(action) : null;

    switch(type) {
        case ActionTypes.LOAD_APPS:
        console.log(payload);
        return {
            ...state,
            apps: payload.apps,
            lastUpdated: currentTime
        };
        case ActionTypes.CLEAR_APPS:
        return {
            ...state,
            apps: {},
            lastUpdated: currentTime
        };
        case ActionTypes.FILTER_APPS: 
            return {
                apps: helperFuncs.filter(state.apps, payload.predicate),
                lastUpdated: currentTime
            };
        case ActionTypes.TEST_LOAD_APPS:
            return {
                ...state,
                apps: payload.apps,
                lastUpdated: "testMode"
            };
        case ActionTypes.UPDATE_APPS: // not pure but its ok
        {
            const newAppState = updateApps(state.apps, payload.updatedApps);
            return {
                ...state,
                apps: newAppState,
                lastUpdated: currentTime
            };
        }
        default:
            return state;
        }


    }


function updateApps(currentApps, updatedApps) {
    const newAppState = currentApps.map(app => {
        if(updateApps.keys().indexOf(app.id) != -1) {
            return updateApps[app.id]; //return new app if its been updated
        }
        return app;
    });
    return newAppState;
}