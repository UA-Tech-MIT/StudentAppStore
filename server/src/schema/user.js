export default `

  type User {
    id: ID!
    firstName: String
    lastName: String
    username: String!
    email: String!
    password: String!
    userNo: Int!
    createdAt: String!
    updatedAt: String!
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