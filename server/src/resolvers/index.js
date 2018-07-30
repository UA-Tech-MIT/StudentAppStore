// import App from './app';
// import Review from './review';
// import User from './user';
import models from '../models';
import Faker from 'faker';
import bcrypt from 'bcrypt';
import _ from 'lodash';

const formatErrors = (e, models) => {
    if (e instanceof models.sequelize.ValidationError) {
      //  _.pick({a: 1, b: 2}, 'a') => {a: 1}
      return e.errors.map(x => _.pick(x, ['path', 'message']));
    }
    return [{ path: 'name', message: 'something went wrong' }];
  };


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
        //APP 
        
        //WORKING!
        createApp: async (parent, args, /*{ models } */) => {
            let id = Faker.random.uuid();
            return models.App.create({ ...args, id })
                .then((res) => {
                    console.log("app created successfully with args", res);
                    return true;
                })
                .catch((err) => {
                    console.log(err);
                    return false;
                })
        },

        //USER MUTATIONS
        createUser: async (parent, args, /*{ models } */) => {
            // MOSTLY FOR AN EXAMPLE, we will generally do client side validation for most of these cases
                let {password, ...otherArgs} = args;
                const hashedPassword = await bcrypt.hash(password, 12);
                let id = Faker.random.uuid();

                console.log("running createUser")
                console.log(args)
                let errors = [];

                // if(!args['password'])
                //     errors.push({path: 'password', message: 'Password is required!'});
                // if(!args['username'])
                //     errors.push({path: 'username', message: 'Username is required!'});
                // if(!args['email'])
                //     errors.push({path: 'email', message: 'Email is required!'});
                // this was checking for required params. Shouldn't have to do this. Just make sure to specify them in queries

                for(const key in args) {
                    switch(key) {
                        default: {
                            if(args[key].length > 25)
                                errors.push({path: key, message: `${key} must be shorter than 25 characters`})

                        }
                        case 'password': {
                            if(!args[key])
                                errors.push({path: key, message: 'Password is required!'})
                        }
                        case 'username': {
                            if(!args[key])
                                errors.push({path: key, message: 'Username is required!'})
                        }
                        
                        case 'email': {
                            if(!args[key])
                                errors.push({path: key, message: 'Email is required!'})
                        }
                    }
                }
                console.log(errors);
                if(errors.length) {
                    return {
                        ok: false,
                        errors
                    }
                }

                return models.User.create({...otherArgs, id, password: hashedPassword})
                    .then((res) => {
                        console.log("User created successfully with args", res);
                        return {
                            ok: true,
                            user: res.User
                        };
                    })
                    .catch((err) => {
                        console.log(err);
                        return {
                            ok: false,
                            errors: formatErrors(err, models),
                          };
                    });
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