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
    appHash,
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
    appHash,
    createdAt,
    url,
    email,
    description,
`;

const basicAppQuery = `
    name,
    author,
    url,
    id
`;

const generalReviewQuery = `
    id,
    content,
    title,
    userHash,
    reviewHash,
`;

const generalUserQuery = `
    firstName,
    lastName,
    email,
    id,
    userHash,
`;

export const GET_ALL_APPS = `
    query GetAllApps {
        allApps {
            ok
            apps{
                ${basicAppQuery}
            }
            errors{
                path
                message
            }
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


export const REGISTER_USER = ({ username, password, email, ...args }) => {
    const query = buildQueryString(args);
    //NOTE: all required fields must be passed. Other fields can be build with the helper func
    // otherwise graphql won't recognize the mutation and you'll get a strange error
    return `
     mutation registerUser {
            createUser(username: "${username}",
                    password: "${password}",
                    email: "${email}",
                    ${query}) {
                ok
                user {${generalUserQuery}}
                errors {
                path
                message
                }
            }
        }
    `;
};

export const LOGIN_USER = ({ username, password }) => {
    return `
        mutation loginUser {
            login(username: "${username}", password: "${password}") {
                ok
                token
                refreshToken
                errors {
                  path
                  message
            }
        }
    }
`;
};



export const SEARCH_APP_QUERY = (args) => {
    const query = buildQueryString(args);

    return `
        query SearchAppsQuery {
            searchApps(${query}) {
                ${generalAppQuery}
            }  
        }
    `;
};

export const SEARCH_APPS_QUERY = (args) => {
    let query = "", params = "";
    // if (args.name && args.name.length) {
    //     query += "name: $name";
    //     params += "$name: [String],";
    // }
    if (args.id && args.id.length) {
        query += "id: $id";
        params += "$id: [Int],";
    }

    // For some reason appHash causes problems in the search bar
    // TODO (figure out how to congfig searchbar class)

    return `
        query SearchAppsQuery(${params}) {
            searchAppsMulti(${query}) {
                ok
                apps{
                    ${generalAppQuery}
                }
                errors{
                    path
                    message
                }
            } 
        }
    `;
};


function buildQueryString(params) {
    let queryStringBuilder = "";
    const entryList = Object.entries(params);
    for (let i = 0; i < entryList.length; i++) {
        const [key, value] = entryList[i];
        if (!value || typeof value !== 'string')
            continue; // skip null values so they aren't entered as strings
        if (i !== 0)
            queryStringBuilder += ", ";
        queryStringBuilder += `${key}: "${value}"`;
    }
    return queryStringBuilder;
}
