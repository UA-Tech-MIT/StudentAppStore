export default {
    Query: {
        getApp: async (parent, { id }, { models }) => {
            try {
                models.App.findOne({ where: { id } });
            } catch (err) {
                console.log(err); return false;
            }
        },
        allApps: async (parent, args, { models }) => {
            try {
                models.App.findAll();
            } catch (err) {
                console.log(err); return false;
            }
        },
        searchApps: async (parent, args, { models }) => {
            try {
                models.App.findAll({ where: { ...args } });
            } catch (err) {
                console.log(err); return false;
            }
        },
    },
    Mutation: {
        createApp: async (parent, args, { models }) => {
            try {
                models.App.create(args);
                return true;
            } catch (err) {
                console.log(err);
                return false;
            }
        },
    },
};