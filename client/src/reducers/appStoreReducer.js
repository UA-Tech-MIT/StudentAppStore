
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
        case ActionTypes.LOAD_SEARCH_APPS:
        return {
            ...state,
            searchApps: payload.apps,
            lastUpdated: "testMode"
        };
        case ActionTypes.CLEAR_SEARCH_APPS:
        return {
            ...state,
            searchApps: [],
            lastUpdated: "testMode"
        };
        case ActionTypes.FILTER_SEARCH_APPS:
        return {
            ...state,
            searchApps: helperFuncs.filter(state.apps, payload.predicate),
            lastUpdated: "testMode"
        };
        case ActionTypes.UPDATE_SEARCH_APPS: {
            const newAppState = updateApps(state.apps, payload.updatedApps);
            return {
                ...state,
                searchApps: newAppState,
                lastUpdated: "testMode"
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