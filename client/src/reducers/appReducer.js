//  const App = {
//     name: String,
//     author: Object,
//     type: String,
//     reivews: Object,
//     url: String,
//     rating: Number,
//     img: String,
//     tags: Array
// }

// IF WE WNAT TO MAINTAIN PERSISTANT STATE THINGS FOR THIS IN THE DATABASE
// how can we do that? firebase look into fucntions 
// gotta attach items to other items (doable with firebase)


const testState = {
    author: "MIT",
    type: "App",
    name: 'Stellar',
    img: 'stellar.png',
    url: 'https://stellar.mit.edu',
    rating: 4,
    tags: ["school", "management", "software", "this sucks"]
};



export default function appReducer(state = testState, action) {
    switch (action.type) {
        case 'SET_APP':
            return action.payload.app; // APP object is APP state

        case 'INIT_APP':
        return {
                ...state,
                name: String,
                author: Object,
                type: String,
                reivews: Object,
                url: String,
                rating: Number,
                img: String,
                tags: Array
            };
        case 'SET_APP_AUTHOR':
        
            return {
                ...state,
                author: action.payload.author
            };
        case 'SET_APP_NAME':
    
        return {
            ...state,
            name: action.payload.name
        };
        case 'SET_APP_TYPE':
        return {
            ...state,
            type: action.payload.type
        };
        case 'SET_APP_REVEIWS':
            return {
                ...state,
                email: action.payload.email
            };
        case 'SET_APP_URL':
            return {
                ...state,
                kerberos: action.payload.kerberos
            };
        case 'SET_APP_RATING':
            return {
                ...state,
                library: action.payload.library
            };
        case 'SET_APP_REQUESTS':
            return {
                ...state,
                requests: action.payload.requests
            };
        case 'SET_APP_REIVEWS': // these four methods are maingly for testing
            return {
                ...state,
                reviews: action.payload.reviews
                
            };
    

        
        default:
            return state;
    }
}