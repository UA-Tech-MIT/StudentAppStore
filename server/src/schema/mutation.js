export default `
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

    #USER MUTATIONS

    createUser(username: String!, email: String!): Boolean!
    addApp(appId: ID!, teamId: ID): Boolean!
    removeApp(appId: ID!, teamID: ID): Boolean!
    joinTeam(teamID: ID!): Boolean!

    #REVIEW MUTATIONS

    createReview(appId: ID!, text: String!): Boolean!
    editReview(id: ID!, content: String!, rating: Float): Boolean!

    #TEAM MUTATIONS 
    
    addUser(userId: ID!): Boolean!
    removeUser(userID: ID!): Boolean!

}
`;