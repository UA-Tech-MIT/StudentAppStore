export default `

    type Team {
        owner: ID!
        members: [User]!
    }

    type Mutation {
        addUser(userId: ID!): Boolean!
        removeUser(userID: ID!): Boolean!
    }

`;