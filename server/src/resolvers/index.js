// import App from './app';
// import Review from './review';
// import User from './user';
import models from '../models';
import Faker from 'faker';
import _ from 'lodash';
import {tryLogin} from '../auth';


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
            return models.App.findOne({ where: { id } })
                .then((res) => {
                    return {
                        ok: true,
                        app: res.App
                    }
                })
                .catch((err) => {
                    return {
                        ok: false,
                        errors: formatErrors(err, models)
                    }
                });
          
        },
        allApps: async (parent, args, /*{ models } */) => {
            return models.App.findAll({order: [['views', 'DESC'],['likes', 'DESC']]})
                .then((res) => {
                    console.log(res);
                    return {
                        ok: true,
                        apps: res
                    }
                })
                .catch((err) => {
                    return {
                        ok: false,
                        errors: formatErrors(err, models)
                    }
                });
        },
        searchAppsMulti: async (parent, args, /*{ models } */) => {
            return models.App.findAll({where:{...args}, order: [['views', 'DESC'],['likes', 'DESC']]})
                .then((res) => {
                    console.log(res);
                    return {
                        ok: true,
                        apps: res
                    }
                })
                .catch((err) => {
                    return {
                        ok: false,
                        errors: formatErrors(err, models)
                    }
                });
        },
        searchApps: async (parent, args, /*{ models } */) => {
            try {
                return models.App.findAll({ where: { ...args }, order: [['views', 'DESC'],['likes', 'DESC']] });
            } catch (err) {
                console.log(err); return false;
            }
        },

        //USER QUERIES

        getUser: (parent, args, /*{ models } */) => {
            return models.User.findOne({where: { ...args }})
        },
        allUsers: (parent, args, /*{ models } */) => {
            return models.User.findAll()
        },
        getAppCreators: async (parent, args, { app }) => {
            // 1 syntax is wrong, 2 we wouldn't pass in the app we'd want to find and authenticate (maybe), then findall for that app.
            try {
                return models.User.findAll({
                    where: { ...args }, include: [ // include syntax?
                        {
                            models: models.Team,
                            where: {
                                //   team member prop has user id
                                appHash: app.appHash
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
                            where: { id: id },
                            order: [['likes', 'DESC']]
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
        createApp: async (parent, args, /*{ models } */) => {
            let appHash = Faker.random.uuid();
            return models.App.create({ ...args, appHash })
                .then((res) => {
                    console.log("app created successfully with args", res);
                    return true;
                })
                .catch((err) => {
                    console.log(err);
                    return false;
                })
        },
        incrementAppLikes: async (parent, id) => {
            return models.App.findOne({where: id}).then((app) => {
                app.increment('likes')
                return true;
            }).catch(() => false);
        },
        incrementAppViews: async (parent, id) => {
            return models.App.findOne({where: id}).then((app) => {
                app.increment('views')
                return true;
            }).catch(() => false);
        },


        //USER MUTATIONS
        createUser: async (parent, args, /*{ models } */) => {
            // MOSTLY FOR AN EXAMPLE, we will generally do client side validation for most of these cases
                let {password, ...otherArgs} = args;
                // const hashedPassword = await bcrypt.hash(password, 12);
                let userHash = Faker.random.uuid();

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

                return models.User.create({...otherArgs, userHash, password})
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


        login: (parent, { username, password }, { models, SECRET, SECRET2 }) =>
            tryLogin(username, password, models, SECRET),


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