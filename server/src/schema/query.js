export default `

type Query {

    #APP QUERIES

    getApp(id: ID!): App!
    allApps: [App!]!
    searchApps(id: ID, 
        keyword: String, 
        genre: String, 
        isOfficialResource: Boolean, 
        medium: String, 
        date: String): [App!]!
    getTeamApps(id: ID!): [App!]!

    # USER QUERIES

    getUser(id: ID!): User!
    allUsers: [User!]!
    getAppCreators(id: ID!): [User!]!
    getTeamUsers(id: ID!): [User!]!

    #REVIEW QUERIES

    allReviews: [Review!]!
    getAppReviews(appId: ID!): [Review!]!

    #TEAM QUERIES

    allTeams: [Team!]!
    getTeam: Team!
    
}
`;