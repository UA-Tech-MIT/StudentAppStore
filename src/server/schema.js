// import { GraphQLInt, GraphQLObjectType, GraphQLString, GraphQLList, GraphQLID, GraphQLSchema, GraphQLFloat, GraphQLBoolean} from 'graphql';
// import models from './models';

// //graphQL Schema
// //TODO make an actual DB Schema and figure out the Relationship network for basic components (add teams if you're up to it)
// /**
//  * these are known as Data Models or Data Transfer Objects
//  * The resolve method is unpackaging value from the the sequlize object connected t the  
//  */
// const User = new GraphQLObjectType({
//     name: 'User',
//     description: 'An App Store User',
//     fields: () => {
//         return {
//             firstName: {
//                 type: GraphQLString,
//                 resolve(user) {
//                     return user.firstName;
//                 }
//             },
//             lastName: {
//                 type: GraphQLString,
//                 resolve(user) {
//                     return user.lastName;
//                 }
//             },
//             email: {
//                 type: GraphQLString,
//                 resolve(user) {
//                     return user.email;
//                 }
//             },
//             id: {
//                 type: GraphQLID,
//                 resolve(user) {
//                     return user.id;
//                 }
//             },
//             userNo: {
//                 type: GraphQLInt,
//                 resolve(user) {
//                     return user.userNo;
//                 }
//             },       
//             createdAt: {
//                 type: GraphQLString,
//                 resolve(user) {
//                     return user.createdAt;
//                 }
//             },
//             updatedAt: {
//                 type: GraphQLString,
//                 resolve(user) {
//                     return user.updatedAt;
//                 }
//             },
//             // appHashes: {
//             //     type: new GraphQLList(GraphQLID),
//             //     resolve(user) {
//             //         return user.appHashes;
//             //     }
//             // },
//             // reviewHashes: {
//             //     type: new GraphQLList(GraphQLID),
//             //     resolve(user) {
//             //         return user.reviewHashes;
//             //     }
//             // },
//         };
//     }
// });


// const Review = new GraphQLObjectType({ 
//     name: 'Review',
//     description: ' A review on an App',
//     fields: () => {
//         return {
//             title: {
//                 type: GraphQLString,
//                 resolve(review) {
//                     return review.title;
//                 }
//             },
//             content: {
//                 type: GraphQLString,
//                 resolve(review) {
//                     return review.content;
//                 }
//             },
//             // authorName: {
//             //     type: GraphQLString,
//             //     resolve(review) {
//             //         return review.authorName;
//             //     }
//             // },
//             rating: {
//                 type: GraphQLFloat,
//                 resolve(review) {
//                     return review.rating;
//                 }
//             },
//             foundThisHelpful: {
//                 type: GraphQLInt,
//                 resolve(review) {
//                     return review.foundThisHelpful;
//                 }
//             },
//             id: {
//                 type: GraphQLID,
//                 resolve(review) {
//                     return review.id;
//                 }
//             },
//             reviewNo: {
//                 type: GraphQLInt,
//                 resolve(review) {
//                     return review.reviewNo;
//                 }
//             },
//             // userHash: {
//             //     type: GraphQLID,
//             //     resolve(review) {
//             //         return review.userHash;
//             //     }
//             // },
//             createdAt: {
//                 type: GraphQLString,
//                 resolve(review) {
//                     return review.createdAt;
//                 }
//             },
//             updatedAt: {
//                 type: GraphQLString,
//                 resolve(review) {
//                     return review.updatedAt;
//                 }
//             },
//         };
//     }
// });

// const App = new GraphQLObjectType({ 
//     name: 'App',
//     description: ' An App entry',
//     fields: () => {
//         return {
//             author: {
//                 type: GraphQLString,
//                 resolve(app) {
//                     return app.author;
//                 }
//             },
//             name: {
//                 type: GraphQLString,
//                 resolve(app) {
//                     return app.name;
//                 }
//             },
//             isOfficialResource: {
//                 type: GraphQLBoolean,
//                 resolve(app) {
//                     return app.isOfficialResource;
//                 }
//             },
//             genre: {
//                 type: GraphQLString,
//                 resolve(app) {
//                     return app.genre;
//                 }
//             },
//             medium: {
//                 type: GraphQLString,
//                 resolve(app) {
//                     return app.medium;
//                 }
//             },
//             image: {
//                 type: GraphQLString,
//                 resolve(app) {
//                     return app.image;
//                 }
//             },
//             email: {
//                 type: GraphQLString,
//                 resolve(app) {
//                     return app.email;
//                 }
//             },
//             dateLaunched: {
//                 type: GraphQLString,
//                 resolve(app) {
//                     return app.dateLaunched;
//                 }
//             },
//             description: {
//                 type: GraphQLString,
//                 resolve(app) {
//                     return app.description;
//                 }
//             },
//             url: {
//                 type: GraphQLString,
//                 resolve(app) {
//                     return app.url;
//                 }
//             },
//             ownerHomePage: {
//                 type: GraphQLString,
//                 resolve(app) {
//                     return app.ownerHomePage;
//                 }
//             },
//             id: {
//                 type: GraphQLID,
//                 resolve(app) {
//                     return app.id;
//                 }
//             },
//             appNo: {
//                 type: GraphQLInt,
//                 resolve(app) {
//                     return app.appNo;
//                 }
//             },
//             createdAt: {
//                 type: GraphQLString,
//                 resolve(app) {
//                     return app.createdAt;
//                 }
//             },
//             updatedAt: {
//                 type: GraphQLString,
//                 resolve(app) {
//                     return app.updatedAt;
//                 }
//             },
//             // reviewHashes: {
//             //     type: new GraphQLList(GraphQLID),
//             //     resolve(app) {
//             //         return app.reviewHashes;
//             //     }
//             // },
//         };
//     }
// });

// const graphqlMappings = {
//     users: {
//         type: new GraphQLList(User),
//         args: {
//             id: {
//                 type: GraphQLID
//             },
//             keyword: {
//                 type: GraphQLString
//             },
//             email: {
//                 type: GraphQLString
//             }
//         },
//         resolve(root, args) {
//             return models.user.findAll({where: args,         // Add order conditions here....
//                 order: [
//                     ['id', 'DESC'],
//                     ['name', 'ASC'],
//                 ],});
//         }
//     },
//     apps: {
//         type: new GraphQLList(App),
//         args: {
//             id: {
//                 type: GraphQLID
//             },
//             keyword: {
//                 type: GraphQLString
//             },
//             genre: {
//                 type: GraphQLString
//             },
//             isOfficialResource: {
//                 type: GraphQLBoolean
//             },
//             medium: {
//                 type: GraphQLString
//             },
//             date: {
//                 type: GraphQLString
//             }
//         },
//         resolve(root, args) {
//             return models.app.findAll({where: args,         // Add order conditions here....
//                 order: [
//                     ['id', 'DESC'],
//                     ['name', 'ASC'],
//                 ],});
//         }
//     },
//     reviews: {
//         type: new GraphQLList(Review),
//         args: {
//             id: {
//                 type: GraphQLID
//             },
//             keyword: {
//                 type: GraphQLString
//             }
//         },
//         resolve(root, args) {
//             return models.review.findAll({where: args,         // Add order conditions here....
//                 order: [
//                     ['id', 'DESC'],
//                     ['name', 'ASC'],
//                 ],});
//         }
//     }
// };


// const Query = new GraphQLObjectType({
//     name: 'Query',
//     description: 'This is a root query',
//     fields: () => {
//         return graphqlMappings;
//     }
// });

// // const ElasticQuery = new GraphQLObjectType({
// //     name: 'ElasticQuery',
// //     fields: () => {
// //         return  {
// //             elastic50: elasticApiFieldConfig(
// //                 // you may provide existed Elastic Client instance
// //                 new elasticsearch.Client({
// //                     host: 'http://localhost:9875',
// //                     apiVersion: '6.3',
// //                     logs: 'trace'
// //                 })
// //             ),
// //         }
// //     }
// // });

// const Schema = new GraphQLSchema({
//     query: Query
// });

// export default Schema;
