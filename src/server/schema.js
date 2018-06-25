import { GraphQLInt, GraphQLObjectType, GraphQLString, GraphQLList, GraphQLID, GraphQLSchema, GraphQLFloat} from 'graphql';
import Database from './database';


//graphQL Schema
//TODO make an actual DB Schema and figure out the Relationship network for basic components (add teams if you're up to it)
/**
 * these are known as Data Models or Data Transfer Objects
 * The resolve method is unpackaging value from the the sequlize object connected t the  
 */
const User = new GraphQLObjectType({
    name: 'User',
    description: 'An App Store User',
    fields: () => {
        return {

            // id: {
            //     type: new GraphQLInt,
            //     resolve(user) {
            //         return user.id;
            //     }
            // },

            firstName: {
                type: GraphQLString,
                resolve(user) {
                    console.log('resolving user first name');
                    return user.firstName;
                }
            },
            lastName: {
                type: GraphQLString,
                resolve(user) {
                    return user.lastName;
                }
            },
            email: {
                type: GraphQLString,
                resolve(user) {
                    return user.email;
                }
            },
            userHash: {
                type: GraphQLID,
                resolve(user) {
                    return user.userHash;
                }
            },

            // appHashes: {
            //     type: new GraphQLList(GraphQLID),
            //     resolve(user) {
            //         return user.appHashes;
            //     }
            // },
            // reviewHashes: {
            //     type: new GraphQLList(GraphQLID),
            //     resolve(user) {
            //         return user.reviewHashes;
            //     }
            // },
        };
    }
});


const Review = new GraphQLObjectType({ 
    name: 'Review',
    description: ' A review on an App',
    fields: () => {
        return {

            // id: {
            //     type: new GraphQLInt,
            //     resolve(review) {
            //         return review.id;
            //     }
            // },

            title: {
                type: GraphQLString,
                resolve(review) {
                    return review.title;
                }
            },

            content: {
                type: GraphQLString,
                resolve(review) {
                    return review.content;
                }
            },

            authorName: {
                type: GraphQLString,
                resolve(review) {
                    return review.authorName;
                }
            },

            rating: {
                type: GraphQLFloat,
                resolve(review) {
                    return review.rating;
                }
            },

            reviewHash: {
                type: GraphQLID,
                resolve(review) {
                    return review.reviewHash;
                }
            },

            userHash: {
                type: new GraphQLList(GraphQLID),
                resolve(review) {
                    return review.userHash;
                }
            }
        };
    }
});

const App = new GraphQLObjectType({ 
    name: 'App',
    description: ' An App entry',
    fields: () => {
        return {

            // id: {
            //     type: new GraphQLInt,
            //     resolve(app) {
            //         return app.id;
            //     }
            // },

            name: {
                type: GraphQLString,
                resolve(app) {
                    return app.name;
                }
            },

            author: {
                type: GraphQLString,
                resolve(app) {
                    return app.author;
                }
            },

            type: {
                type: GraphQLString,
                resolve(app) {
                    return app.type;
                }
            },

            email: {
                type: GraphQLString,
                resolve(app) {
                    return app.email;
                }
            },

            appHash: {
                type: GraphQLID,
                resolve(app) {
                    return app.appHash;
                }
            },

            reviewHashes: {
                type: new GraphQLList(GraphQLID),
                resolve(app) {
                    return app.reviewHashes;
                }
            },
        };
    }
});


const Query = new GraphQLObjectType({
    name: 'Query',
    description: 'This is a root query',
    fields: () => {
        return {
            users: {
                type: new GraphQLList(User),
                args: {
                    id: {
                        type: GraphQLInt
                    },
                    keyword: {
                        type: GraphQLString
                    }
                },
                resolve(root, args) {
                    return Database.models.user.findAll({where: args});
                }
            },
            apps: {
                type: new GraphQLList(App),
                args: {
                    id: {
                        type: GraphQLInt
                    },
                    keyword: {
                        type: GraphQLString
                    }
                },
                resolve(root, args) {
                    return Database.models.app.findAll({where: args});
                }
            },
            reviews: {
                type: new GraphQLList(Review),
                args: {
                    id: {
                        type: GraphQLInt
                    },
                    keyword: {
                        type: GraphQLString
                    }
                },
                resolve(root, args) {
                    return Database.models.review.findAll({where: args});
                }
            }
        };
    }
});

const Schema = new GraphQLSchema({
    query: Query
});

export default Schema;
