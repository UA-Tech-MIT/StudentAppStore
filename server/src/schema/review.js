export const typeDef = `

  type Review {
    id: Int!
    title: String!
    content: String!
    rating: Float!
    foundThisHelpful: Int
    reviewHash: ID!
    userId: User!
    appId: App!
    createdAt: String!
    updatedAt: String!
  }

`;