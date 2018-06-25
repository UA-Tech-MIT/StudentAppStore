
import { getFormattedDateTime } from '../utils/dates';
import * as helperFuncs from '../actions/AppPageActions';
import initialState from './initialState';
import { getFormattedNumber } from '../utils/numberFormat';
import reducer from './appStoreReducer';
import * as ActionTypes from '../constants/actionTypes';

const testState = () => {
    return {
        apps: {
            123: "123",
            456: "456",
            789: "789",
            1: "1",
            0: "0",
        },
        lastUpdated: "default"
    };
};

//TODO make a workaround test for the date
//TODO test all paths


describe('Reducers::AppStoreReducer', () => {
    const getInitialState = () => {
        return {
            apps: {},
            lastModified: "default"
        };
    };

    const testDateTime = getFormattedDateTime();

    it('should initilaize with no apps and default time', () => {
        expect(reducer(undefined, "default")).toEqual(getInitialState())
        ;
    });

    it('should load apps', () => {
        const action = {
            type: ActionTypes.LOAD_APPS, payload: {
                apps: { 1: "testApp1" }
            }
        };

        expect(reducer(undefined, action)).toEqual({ apps: { 1: "testApp1" } });
    });

    it("should clear all loaded apps"), () => { // may not work work
        const action = { type: ActionTypes.CLEAR_APPS };
        expect(reducer(testState(), action)).toEqual({ apps: {}, lastModified: getFormattedDateTime() });
    };
});