export default `

  type Review {
    id: ID!
    title: String!
    content: String!
    rating: Float!
    foundThisHelpful: Int
    reviewNo: Int!
    userId: User!
    appId: App!
    createdAt: String!
    updatedAt: String!
  }

`;