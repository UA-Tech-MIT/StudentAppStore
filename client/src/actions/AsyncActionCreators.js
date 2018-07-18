import * as ActionTypes from '../constants/actionTypes';
import {getAppsById, filter} from '../utils/helperFunctions';
// note: by using this syntax we are almost ompletely independent from the apollo stack
// please do NOT USE THE Apollo Query element (its fine for bootstrapping components without redux in place)

const createFetchConfig = (query) => {
    return {//NOTE: although this says POST, this is a query.
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
          },
          mode: 'cors',
          body: JSON.stringify({query})
    };
};


const queryUri = 'http://localhost:8080/graphql';


export const GET_ALL_APPS = `
query GetAllApps {
    apps {
      name
      author
      genre
      email
      id
    } 
}
`;
//NOTE you must fill in what fields you want like the example above
/* eslint-disable no-unused-vars*/
export const GET_APP_BY_ID = `
    query GetAppsByID($ID:String!) {
        apps(id: $ID) 
    }
`;

export const GET_ALL_USERS = `
    query GetAllUsers {
        users 
    }
`;

export const GET_USER_BY_ID = `
    query GetUserByID($ID:String!) {
        users(id: $ID ) 
    }
`;

export const GET_ALL_REVIEWS = `
    query GetAllReviews {
        reviews 
    }
`;

export const GET_REVIEW_BY_ID = `
    query GetReviewByID($ID:String!) {
        reviews(id: $ID) 
    }
`;

export const fetchApps = () => dispatch => {
    fetch(queryUri, createFetchConfig(GET_ALL_APPS))
        /* eslint-disable no-undef*/
        .then(res => res.json())
        .then(res => {
            const filteredApps = filter(res.data, (app) => { // leaving this filtering example
                return app.email === null; // all emails are null atm so it should return every app
            });
            console.log("filtered apps", filteredApps);
            dispatch({
                type: ActionTypes.LOAD_APPS,
                payload: res.data});
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
                payload: res.data});
    });
};


// note 2 ways to do the same thing
export const fetchAppByID = (id) =>  {
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