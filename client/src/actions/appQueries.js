//CRUD on a single app

//Query default app streams (query a bunch of apps based on x param?
//TODO figure out how we are going to stream

// SEARCH functionality (custom query params

//need to make search reducer/repository
// search repo functinoality
//      seearch query (and advanced ooptions)
//      check out elastic search beofre putting things in there
//      


import { customFetch } from './AsyncActionCreators';


const generalAppQuery = `
id,
name,
author,
appNo,
createdAt,
url,
email,
description,
medium,
genre,
isOfficialResource,
image
`;

const searchAppQuery = `
id,
name,
author,
appNo,
createdAt,
url,
email,
description,
`;

export const GET_ALL_APPS = `
query GetAllApps {
    apps {
        ${generalAppQuery}
      }
}
`;

export const GET_APP_BY_ID = (id) =>  {
    `
    query GetAppsByID {
        apps(id: ${id}) {
            ${generalAppQuery}
        }  
    }
`;};

export const SEARCH_APPS_QUERY = (params) => {
    let queryStringBuilder = "";
    const entryList = Object.entries(params);
    for(let i = 0; i < entryList.legnth; i++ ) {
        if( i != 0) {
            queryStringBuilder += ", ";
        }
        const {key, value} = entryList[i];
        queryStringBuilder += `${key}: ${value}`;


    } 
    return `
        query SearchAppsQuery {
            apps(${queryStringBuilder}) {
                ${generalAppQuery}
            }  
        }
    `;
};



