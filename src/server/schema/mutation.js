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
        ownerHomePage: String
        id: String!
        appNo: Int!
        createdAt: String!
        updatedAt: String!): App!

    #USER MUTATIONS

    createUser(username: String!, email: String!): User!
    addApp(appId: ID!, teamId: ID): Boolean!
    removeApp(appId: ID!, teamID: ID): Boolean!
    joinTeam(teamID: ID!): Boolean!

    #REVIEW MUTATIONS

    createMessage(appId: ID!, text: String!): Boolean!
    editMessage(id: ID!, content: String!, rating: Float): Boolean!

    #TEAM MUTATIONS 
    
    addUser(userId: ID!): Boolean!
    removeUser(userID: ID!): Boolean!

}
`;