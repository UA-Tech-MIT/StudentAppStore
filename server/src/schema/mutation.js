export const typeDef = `
    type Mutation {

        #APP MUTATIONS

        createApp(author: String!
            name: String!
            isOfficialResource: Boolean!
            genre: String
            medium: String!
            image: String
            email: String!
            dateLaunched: String
            description: String!
            url:  String!
            ownerHomePage: String): Boolean!


        incrementAppLikes(id: Int!): Boolean!
        incrementAppViews(id: Int!): Boolean!

        #USER MUTATIONS

        login(username: String!, password: String!): LoginResponse!
        addApp(appHash: ID!, teamHash: ID): Boolean!
        removeApp(appHash: ID!, teamHash: ID): Boolean!
        joinTeam(teamHash: ID!): Boolean!
        createUser(username: String!
            email: String!
            password: String!
            firstName: String
            lastName: String): RegisterResponse!

        #REVIEW MUTATIONS

        createReview(appHash: ID!, text: String!): Boolean!
        editReview(id: Int!, content: String!, rating: Float): Boolean!

        #TEAM MUTATIONS 
        
        addUser(userHash: ID!): Boolean!
        removeUser(userHash: ID!): Boolean!

    }
`;