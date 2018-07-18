// import App from './app';
// import Review from './review';
// import User from './user';
import models from '../models';

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
                models.App.findAll().then((response) => {
                    console.log(response)
                    return response;
                }); 
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
        getAllUserApps: async (parent, args, {models}) => {
          models.User.findAll({where: { ...args }, include: [ // include syntax?
              models.App
          ]});
        },

        //REVIEW QUERIES
        allReviews: async (parents, args, {models}) => {
            models.Reviews.findAll();
        },
        appReviews: async (parents, id, {models}) => {// TODO
            models.Reviews.findAll({
                include: [
                    {
                        model: models.App,
                        where: {id: id}
                    }
                ]
            });
        }
    },
    Mutation: {
        //APP MUTATIONS
        createApp: async (parent, args, { models }) => {
            try {
                models.App.create(args);
                return true;
            } catch (err) {
                console.log(err);
                return false;
            }
        },

        //USER MUTATIONS
        createUser: (parent, args, { models }) => models.User.create(args),


        //REVIEW MUTATIONS
        createReview: async (parents, args, {models}) => {// TODO validation
            try {
                models.Review.create({...args});
                return true;
            } catch (error) {
                console.log(error);
                return false;
            }
        },
        editReview: async (parents, args, {models, review}) => {
            try {
                models.Review.update({...args}, {where: {id: review.id}})
                return true;
            } catch(err) {
                console.log(err);
                return false;
            }
        },




    },
};