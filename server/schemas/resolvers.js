const { User, Book } = require('../models');
const bookSchema = require('../models/Book');

const resolvers = {
  Query: {
    // me: async (parent, { _id }) => {
    //   const params = _id ? { _id } : {};
    //   return await User.findOne(params);
    // },
    users: async () => {
      return await User.find({});
    },
    books: async (parent, { _id }) => {
      const params = _id ? { _id } : {};
      return Book.find(params);
    },
  },
  // Mutation: {
  //   createUser: async (parent, args) => {
  //     const user = await User.create(args);
  //     return user;
  //   },
  //   login: async (parent, { _id, techNum }) => {
  //     const vote = await Matchup.findOneAndUpdate(
  //       { _id },
  //       { $inc: { [`tech${techNum}_votes`]: 1 } },
  //       { new: true }
  //     );
  //     return vote;
  //   },
  // },
};

module.exports = resolvers;
