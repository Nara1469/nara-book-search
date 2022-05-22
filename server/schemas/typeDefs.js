const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    bookCount: Int
    savedBooks: [Book]!
  }

  type Book {
    _id: ID!
    authors: [String]
    description: String!
    bookId: String!
    image: String
    link: String
    title: String
  }

  type Query {
    users: [User]
    books: [Book]!
    me(userId: ID!): User
  }

  type Mutation {
    addUser(thoughtText: String!, thoughtAuthor: String!): Thought
    login(thoughtId: ID!, commentText: String!): Thought
    saveBook(thoughtId: ID!): Thought
    removeBook(thoughtId: ID!, commentId: ID!): Thought
  }
`;

module.exports = typeDefs;
