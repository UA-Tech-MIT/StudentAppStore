import * as ActionTypes from '../constants/actionTypes';
import { filter } from '../utils/helperFunctions';
import {
    GET_ALL_APPS,
    GET_APP_BY_ID,
    GET_ALL_USERS,
    GET_USER_BY_ID,
    GET_ALL_REVIEWS,
    GET_REVIEW_BY_ID,
    CREATE_APP,
    SEARCH_APPS_QUERY,
    REGISTER_USER,
    LOGIN_USER
} from './queries';
// note: by using this syntax we are almost ompletely independent from the apollo stack
// please do NOT USE THE Apollo Query element (its fine for bootstrapping components without redux in place)

const createFetchConfig = (query, vars) => {
    let body;
    if(vars) {
        body = JSON.stringify({
            query,
            variables: vars,
        });
    } else {
        body = JSON.stringify({
            query,
        });
    }

    return {//NOTE: although this says POST, this is a query.
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        mode: 'cors',
        body,
    };
};


const queryUri = 'http://localhost:8080/graphql';

// NOTE THESE ARE THUNKS
export const fetchApps = () => dispatch => {
    fetch(queryUri, createFetchConfig(GET_ALL_APPS))
        /* eslint-disable no-undef*/
        .then(res => res.json())
        .then(res => {
            if (res.errors) {
                console.log(res.errors);
                // return false;
            }
            const filteredApps = filter(res.data, (app) => { // leaving this filtering example
                return app.email === null; // all emails are null atm so it should return every app
            });
            console.log("filtered apps", filteredApps);
            dispatch({
                type: ActionTypes.LOAD_APPS,
                payload: res.data
            });
        });
    // add error handling
};

export const customFetch = (query) => dispatch => {
    fetch(queryUri, createFetchConfig(query))
        /* eslint-disable no-undef*/
        .then(res => res.json())
        .then(res => {
            dispatch({
                type: ActionTypes.LOAD_APPS,
                payload: res.data
            });
        });
};


// note 2 ways to do the same thing
export const fetchAppByID = (id) => {
    fetch(queryUri, {
        query: GET_ALL_APPS,
        variables: { ID: id }
    })
        .then(res => console.log(res.data));
};


export const postApp = postData => dispatch => { // find out how to post data to graphql?? or some other end point
    fetch(queryUri, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(postData)
    })
        .then(res => res.json())
        .then(data => console.log(data));
};

export const createApp = (args) => dispatch => {
    let vars = { isofficialresource: JSON.parse(args.isofficialresource) };

    //TODO(yaatehr) add varification?
    const query = CREATE_APP(args);
    fetch(queryUri, createFetchConfig(query, vars))
        .then(res => res.json())
        .then(data => console.log(data));
};

export const createUser = (args) => dispatch =>  {
    const query = REGISTER_USER(args);
    return fetch(queryUri, createFetchConfig(query))
        .then(res => res.json())
        .then(data => data);
};

export const login = (args) => dispatch =>  {
    const query = LOGIN_USER(args);
    return fetch(queryUri, createFetchConfig(query))
        .then(res => res.json())
        .then(data => data);
};

