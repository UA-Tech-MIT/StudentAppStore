export default {
    Query: {
        //APP QUERIES
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

        //USER QUERIES

        getUser: (parent, { id }, { models }) => models.User.findOne({ where: { id } }),
        allUsers: (parent, args, { models }) => models.User.findAll(),
        getAppCreators: async (parent, args, { models, user }) => {
            models.User.findAll({
                include: [
                    {
                        models: models.App,
                        where: { userId: user.id } // this may not be the actual foreign key
                    }
                ]
            });
        },
        getTeamUsers: async (parent, args, { models, user }) => {
            models.User.findAll({
                include: [
                    {
                        models: models.App,
                        where: { userId: user.id }
                    }
                ]
            });
        },

        //REVIEW QUERIES
        allReviews: async (parents, args, { models }) => {
            models.Reviews.findAll();
        },
        appReviews: async (parents, id, { models }) => {// TODO
            models.Reviews.findAll({
                include: [
                    {
                        model: models.App,
                        where: { id: id }
                    }
                ]
            });
        },

        //TEAM QUERIES
        allTeams: async (parents, args, { models }) => {
            models.Team.findAll();
        },
        getTeam: async (parents, { id }, { models }) => {
            models.Team.find({ where: { userId: id } });
        }
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