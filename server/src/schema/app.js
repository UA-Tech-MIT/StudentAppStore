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
        id: String!
        appNo: Int!
        createdAt: String!
        updatedAt: String!
    }

    type AppQueryResponse {
        ok: Boolean!
        apps: [App!]
        errors: [Error!]
      }

`;