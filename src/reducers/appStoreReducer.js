
import {getFormattedDateTime} from '../utils/dates';
import * as helperFuncs from '../actions/AppPageActions';
import * as ActionTypes from '../constants/actionTypes';
import initialState from './initialState';
import { getFormattedNumber } from '../utils/numberFormat';
import { toASCII } from 'punycode';

const testState = {
    apps: {
        123: "123",
        456: "456",
        789: "789",
        1: "1",
        0: "0",
    },
    lastUpdated: "default"
};

//TODO make real state
//TODO fill out all crud endpoints (delete, add?)
//TODO Make reducer tests


export default function appStoreReducer(state = testState, action) {
    const { type, payload } = action;
    const currentTime  = getFormattedDateTime();
    process.env.NODE_ENV === 'development' ? console.log(action) : null;

    switch(type) {
        case ActionTypes.CLEAR_APPS:
        console.log(payload);
        return {
            ...state,
            apps: payload.apps,
            lastUpdated: currentTime
        };
        case ActionTypes.LOAD_APPS:
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
        
        default:
            return state;
        // case "UPDATE_APP": 
        // newApps ={
        //     ...state.apps, 
        //     action.playload.updateApp  }
        //     return {
        //         apps: ,
        //         lastUpdated: currentTime
        //     }
        }
    }
