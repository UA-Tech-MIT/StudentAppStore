export const typeDef = `

    type Query {

        #APP QUERIES

    getApp(id: Int!): AppQueryResponse!
    allApps: AppQueryResponse!
    spotlightApps: AppQueryResponse!
    searchApps(id: Int, 
        keyword: String, 
        genre: String, 
        isOfficialResource: Boolean, 
        medium: String, 
        date: String): [App!]!
    searchAppsMulti(id: [Int], 
            name:[String]): AppQueryResponse!
    getTeamApps(id: Int!): [App!]!

        # USER QUERIES

        getUser(id: Int!): User!
        allUsers: [User!]!
        getAppCreators(id: Int!): [User!]!
        getTeamUsers(id: Int!): [User!]!

        #REVIEW QUERIES

        allReviews: [Review!]!
        getAppReviews(id: Int!): [Review!]!

        #TEAM QUERIES

        allTeams: [Team!]!
        getTeam: Team!
        
        allFiles(id: Int, url: String, filetype: String): [File!]


        #Testing Queries
        getAllTags: [Tag]!
    }
`;