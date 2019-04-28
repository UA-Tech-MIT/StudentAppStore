import * as ActionTypes from "../constants/actionTypes";
import {
  GET_ALL_APPS,
  GET_APP_BY_ID,
  CREATE_APP,
  SEARCH_APPS_QUERY,
  REGISTER_USER,
  LOGIN_USER,
  LIKE_APP,
  UNLIKE_APP,
  VIEW_APP,
  GET_ALL_THUMBNAILS,
  GET_ALL_THUMBNAILS_BETA
} from "./queries";
// import { getCiphers } from 'tls'; // what was this for?
// note: by using this syntax we are almost ompletely independent from the apollo stack
// please do NOT USE THE Apollo Query element (its fine for bootstrapping components without redux in place)

const createFetchConfig = (query, vars) => {
  let body;
  if (vars) {
    body = JSON.stringify({
      query,
      variables: vars
    });
  } else {
    body = JSON.stringify({
      query
    });
  }

  return {
    //NOTE: although this says POST, this is a query.
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    mode: "cors",
    body
  };
};

const queryUri = "http://localhost:8080/graphql";

// NOTE THESE ARE THUNKS
/* eslint-disable no-unused-vars*/
export const allApps = () => dispatch => {
  return (
    fetch(queryUri, createFetchConfig(GET_ALL_APPS))
      /* eslint-disable no-undef*/
      .then(res => res.json())
      .then(data => data)
  );
  //     if (res.errors) {
  //         console.log(res.errors);
  //         // return false;
  //     }
  //     const filteredApps = filter(res.data, (app) => { // leaving this filtering example
  //         return app.email === null; // all emails are null atm so it should return every app
  //     });
  //     console.log("filtered apps", filteredApps);
  //     dispatch({
  //         type: ActionTypes.LOAD_APPS,
  //         payload: res.data
  //     });
  // });
  // add error handling
};

export const customFetch = query => dispatch => {
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

// DEPRECATED, see other examples, this is just to illustrate what the basic fetch looks like
export const fetchAppByID = id => {
  fetch(queryUri, {
    query: GET_ALL_APPS,
    variables: { ID: id }
  })
    /* eslint-disable no-console*/
    .then(res => console.log(res.data));
};
/* eslint-disable no-unused-vars*/
export const createApp = args => dispatch => {
  let vars = { isofficialresource: JSON.parse(args.isofficialresource) };

  //TODO(yaatehr) add varification?
  const query = CREATE_APP(args);
  fetch(queryUri, createFetchConfig(query, vars))
    .then(res => res.json())
    .then(data => console.log(data));
};
export const getAppByID = id => dispatch => {
  const query = GET_APP_BY_ID(id);
  return fetch(queryUri, createFetchConfig(query))
    .then(res => res.json())
    .then(data => data);
};

export const createUser = args => dispatch => {
  const query = REGISTER_USER(args);
  return fetch(queryUri, createFetchConfig(query))
    .then(res => res.json())
    .then(data => data);
};

export const login = args => dispatch => {
  const query = LOGIN_USER(args);
  return fetch(queryUri, createFetchConfig(query))
    .then(res => res.json())
    .then(data => data);
};

export const searchApps = args => dispatch => {
  const query = SEARCH_APPS_QUERY(args);
  return fetch(queryUri, createFetchConfig(query, args))
    .then(res => res.json())
    .then(data => data);
};

export const likeApp = args => dispatch => {
  return fetch(queryUri, createFetchConfig(LIKE_APP(args)))
    .then(res => res.json())
    .then(payload => payload);
};
export const unlikeApp = args => dispatch => {
  return fetch(queryUri, createFetchConfig(UNLIKE_APP(args)))
    .then(res => res.json())
    .then(payload => payload);
};

export const viewApp = args => dispatch => {
  return fetch(queryUri, createFetchConfig(VIEW_APP(args)))
    .then(res => res.json())
    .then(payload => console.log("view app " + payload));
};

export const getThumbnails = args => dispatch => {
  return fetch(queryUri, createFetchConfig(GET_ALL_THUMBNAILS))
    .then(res => res.json())
    .then(data => data);
};

export const getBetaThumbnails = args => dispatch => {
  return fetch(queryUri, createFetchConfig(GET_ALL_THUMBNAILS_BETA))
    .then(res => res.json())
    .then(data => data);
};
