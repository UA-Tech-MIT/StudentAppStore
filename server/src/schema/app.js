export const typeDef = `

    type App {
        author: String!
        name: String!
        isOfficialResource: Boolean!
        rating: Float!
        genre: String
        medium: String!
        image: String
        email: String!
        dateLaunched: String
        description: String!
        url:  String!
        ownerHomePage: String
        id: Int!
        appHash: ID!
        createdAt: String!
        updatedAt: String!
        views: Int!
        likes: Int!
    }

    type AppQueryResponse {
        ok: Boolean!
        apps: [App!]
        errors: [Error!]
      }

`;