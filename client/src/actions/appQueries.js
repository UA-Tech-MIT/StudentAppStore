//CRUD on a single app

//Query default app streams (query a bunch of apps based on x param?
//TODO figure out how we are going to stream

// SEARCH functionality (custom query params

//need to make search reducer/repository
// search repo functinoality
//      seearch query (and advanced ooptions)
//      check out elastic search beofre putting things in there
//      

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

const generalReviewQuery = `
    content,
    title,
    userId,
    reviewNo,
`;

const generalUserQuery = `
    firstName,
    lastName,
    email,
    id,
    userNo,
`;

export const GET_ALL_APPS = `
    query GetAllApps {
        allApps {
            ${generalAppQuery}
        } 
    }
`;
//NOTE you must fill in what fields you want like the example above
/* eslint-disable no-unused-vars*/
export const GET_APP_BY_ID = (id) => `
    query GetAppsByID{
        searchApps(id: ${id}) {
           ${generalAppQuery}
        }
    }
`;

export const GET_ALL_USERS = `
    query GetAllUsers {
        allUsers {
            ${generalUserQuery}
        } 
    }
`;

export const GET_USER_BY_ID = (id) => `
    query GetUserByID {
        getUser(id: ${id} ) {
            ${generalUserQuery}
        }
    }
`;

export const GET_ALL_REVIEWS = `
    query GetAllReviews {
        allReviews {
            ${generalReviewQuery}
        } 
    }
`;

export const GET_REVIEW_BY_ID = (id) => `
    query GetReviewByID {
        getReview(id: ${id}) {
            ${generalReviewQuery}
        }
    }
`;

export const CREATE_APP = (args) => {
    let { author, name, genre, image, medium, description, url } = args;
    if (!genre) genre = "None";
    if (!image) image = "test.png";

    return `
        mutation CreateCustomApp($isofficialresource: Boolean!) {
            createApp(
                author: "${author}",
                name: "${name}",
                isOfficialResource: $isofficialresource,
                genre: "${genre}",
                medium: "${medium}",
                image: "${image}",
                email: "${author}@mit.edu",
                dateLaunched: null,
                description: "${description}",
                url:  "${url}")
    }
`;
};



export const SEARCH_APPS_QUERY = (params) => {
    let queryStringBuilder = "";
    const entryList = Object.entries(params);
    for (let i = 0; i < entryList.legnth; i++) {
        if (i != 0) {
            queryStringBuilder += ", ";
        }
        const { key, value } = entryList[i];
        queryStringBuilder += `${key}: ${value}`;
    }

    return `
        query SearchAppsQuery {
            searchApps(${queryStringBuilder}) {
                ${generalAppQuery}
            }  
        }
    `;
};



