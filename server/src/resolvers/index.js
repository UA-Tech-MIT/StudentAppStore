// import App from './app';
// import Review from './review';
// import User from './user';
import models from '../models';

export default {
    Query: {
        //APP QUERIES
        getApp: async (parent, { id }, /*/*{ models } */) => {
            try {
                return models.App.findOne({ where: { id } });
            } catch (err) {
                console.log(err); return false;
            }
        },
        allApps: async (parent, args, /*{ models } */) => {
            try {
                return models.App.findAll().then((response) => {
                    return response;
                });
            } catch (err) {
                console.log(err); return false;
            }
        },
        searchApps: async (parent, args, /*{ models } */) => {
            try {
                return models.App.findAll({ where: { ...args } });
            } catch (err) {
                console.log(err); return false;
            }
        },

        //USER QUERIES

        getUser: (parent, { id }, /*{ models } */) => models.User.findOne({ where: { id } }),
        allUsers: (parent, args, /*{ models } */) => models.User.findAll(),
        getAppCreators: async (parent, args, { app }) => {
            try {
                return models.User.findAll({
                    where: { ...args }, include: [ // include syntax?
                        {
                            models: models.Team,
                            where: {
                                //   team member prop has user id
                                appId: app.id
                            }
                        }
                    ]
                });
            } catch (err) {
                console.log(err);
                return false;
            }
        },
        getTeamUsers: async (parent, { id }, /*{ models } */) => {
            try {
                return models.User.findAll({
                    include: [ // include syntax?
                        {
                            models: models.Team,
                            where: {
                                id: id
                            }
                        }
                    ]
                });
            } catch (err) {
                console.log(err);
                return false;
            }

        },
        getTeamApps: async (parent, { id }, /*{ models } */) => {
            try {
                return models.App.findAll({
                    include: [
                        {
                            models: models.Team,
                            where: {
                                id: id
                            }
                        }
                    ]
                });
            } catch (err) {
                console.log(err);
                return false;
            }
        },

        //REVIEW QUERIES
        allReviews: async (parents, args, /*{ models } */) => {
            try {
                return models.Reviews.findAll();
            } catch (err) {
                console.log(err);
                return false;
            }
        },
        getAppReviews: async (parents, id, /*{ models } */) => {// TODO
            try {
                return models.Reviews.findAll({
                    include: [
                        {
                            model: models.App,
                            where: { id: id }
                        }
                    ]
                });
            } catch (err) {
                console.log(err);
                return false;
            }
        }
    },
    Mutation: {
        //APP MUTATIONS
        createApp: async (parent, args, /*{ models } */) => {
            try {
                models.App.create(args);
                return true;
            } catch (err) {
                console.log(err);
                return false;
            }
        },

        //USER MUTATIONS
        createUser: (parent, args, /*{ models } */) => {
            try {
                models.User.create(args);
                return true;
            } catch (err) {
                console.log(err);
                return false;
            }
        },


        //REVIEW MUTATIONS
        createReview: async (parents, args, /*{ models } */) => {// TODO validation
            try {
                models.Review.create({ ...args });
                return true;
            } catch (error) {
                console.log(error);
                return false;
            }
        },
        editReview: async (parents, args, { review }) => {
            try {
                models.Review.update({ ...args }, { where: { id: review.id } })
                return true;
            } catch (err) {
                console.log(err);
                return false;
            }
        },




    },
};