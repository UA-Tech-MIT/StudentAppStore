export default {
    Query: {
      getUser: (parent, { id }, { models }) => models.User.findOne({ where: { id } }),
      allUsers: (parent, args, { models }) => models.User.findAll(),
      getAllUserApps: async (parent, args, {models}) => {
        models.User.findAll({where: { ...args }, include: [ // include syntax?
            models.App
        ]});
      }
    },
    Mutation: {
      createUser: (parent, args, { models }) => models.User.create(args),
    },
  };