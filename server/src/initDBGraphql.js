import Faker from 'faker';
import models from './models';
import _ from 'lodash';




export default function initDB() {
    models.sequelize
        .authenticate()
        .then(() => {
            console.log('Connection has been established successfully.');
        })
        .catch(err => {
            console.error('Unable to connect to the database:', err);
        });

    //add a bunch of phony entitiies to the database
    models.sequelize.sync({ force: true }).then(() => {
        let users = [];
        let userIDs = [];
        let apps = [];
        let appIDs = [];
        let reviews = [];
        let reviewIDs = [];
        let AppTagIDs = [];
    });
}