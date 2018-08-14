export const typeDef = `

  type User {
    id: Int!
    firstName: String
    lastName: String
    username: String!
    email: String!
    password: String!
    userHash: ID!
    createdAt: String!
    updatedAt: String!
    tags: [Tag!]
  }

  type RegisterResponse {
    ok: Boolean!
    user: User
    errors: [Error!]
  }

  type LoginResponse {
    ok: Boolean!
    token: String
    refreshToken: String
    errors: [Error!]
  }
`;