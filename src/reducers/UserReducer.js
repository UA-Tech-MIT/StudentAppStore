
// // User Reducer
// // @fl
// const User = {
//    _id: String,
//    email: String,
//    kerberos: Object,
//    library: Object,
//    preferences: Object,
   

// };


// type checking must happrn in the action creator ie in the inpout 
// funct(user:User) action.payload.user = user 
// we should consider hashing out 
// this state is the user object 


                                                                                    // case 'LOAD_EVENT_':
                                                                                    //     for(token in state.currentUser.eventHistory) {
                                                                                    //         if(!state.currentUser.eventHistory.contains(token)) {
                                                                                    //     return state.currentUser.eventHistory s
export default function userReducer(state = {}, action) {
        switch (action.type) {
            case 'SET_USER':
                return action.payload.user; // User object is user state

            case 'INIT_USER':
            return {
                    ...state,
                    email: String,
                    kerberos: Object,
                    library: Object,
                    preferences: Object,
                    apps: Object,
                    reviews: Object,
                    requests: Object
                };
            case 'SET_PREFERECES':
            
                return {
                    ...state,
                    preferences: action.payload.preferences
                };
            case 'SET_EMAIL':
                return {
                    ...state,
                    email: action.payload.email
                };
            case 'SET_KERBEROS':
                return {
                    ...state,
                    kerberos: action.payload.kerberos
                };
            case 'SET_LIBRARY':
                return {
                    ...state,
                    library: action.payload.library
                };
            case 'SET_REQUESTS':
                return {
                    ...state,
                    requests: action.payload.requests
                };
            case 'SET_REIVEWS': // adds one or more items to event histroy
                return {
                    ...state,
                    reviews: action.payload.reviews
                    
                };
             case 'SET_APPS'://removes one or more items from event history
                return {
                    ...state,
                    apps: action.payload.apps
                };               

            
            default:
                return state;
        }
    }