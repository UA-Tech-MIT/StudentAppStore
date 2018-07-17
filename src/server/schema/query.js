export default `

type Query {

    #APP QUERIES

    getApp(id: ID!): App!
    allApps: [App!]!
    searchApps(id: ID, 
        keyword: String, 
        genre: String, 
        isOfficialResource: 
        boolean, 
        medium: String, 
        date: String): [App]!

    # USER QUERIES

    getUser(id: ID!): User!
    allUsers: [User!]!
    getAllUserApps(id: ID!): [App!]!
    getUserTeams(id: ID!): [Team!]!

    #REVIEW QUERIES

    allReviews: [Review!]!
    appReviews(appId: ID!): [Review!]!

    #TEAM QUERIES

    allTeams: [Team!]!
    getTeam: Team!
    
}
`;