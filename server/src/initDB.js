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
        let TagIDs = [];
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].forEach((_) => {
            models.Tag.create({
                name: Faker.random.word(['Essential', 'Social', 'Anonymous', 'Planning']),
            }).then((tag) => {
                // console.log(tag)
                TagIDs.push(tag.get('id'));
            });
        });
        // console.log(TagIDs[0])

        const defaultUserHash = Faker.random.uuid();

        users.push(models.User.create({
            username: "username",
            password: "password",
            email: "email",
            firstName: "Default",
            lastName: "User",
            userHash: defaultUserHash
        }));
        userIDs.push(defaultUserHash);

        //TODO find some other way to instantiate teams for apps (add a delay?)

        _.range(0,25).forEach((_, i) => {
            const userHash = Faker.random.uuid();
            const reviewHash = Faker.random.uuid();
            const appHash = Faker.random.uuid();
            userIDs.push(userHash);
            appIDs.push(appHash);
            reviewIDs.push(reviewHash);


            reviews.push(models.Review.create({
                title: Faker.internet.color(),
                content: Faker.random.words(100),
                rating: Faker.random.number(50) / 10,
                foundThisHelpful: Faker.random.number(10),
                reviewHash
            }));
            const firstName =  Faker.name.firstName();
            const lastName =  Faker.name.lastName();
            console.log(Faker.internet.email())
            users.push(models.User.create(
                {
                firstName: firstName,
                lastName: lastName,
                username: firstName + lastName,
                email: Faker.internet.email(),
                password: Faker.internet.password(12, true),
                userHash
            })
            .then((user) => {
                user.addReview(reviewHash);
                for (let index = 0; index < i; index++) {
                    user.addCreations(appIDs[index]);
                }
            })
        );

            apps.push(models.App.create({
                author: Faker.name.firstName() + " " + Faker.name.lastName(),
                name: Faker.company.companyName(),
                genre: Faker.random.word(['Course Planning', 'Time Management', 'Entertainment', 'Networking', 'Tutoring', 'Money Management']),
                medium: Faker.random.word(["Website", "Mobile App", "Chrome Extension"]),
                description: "ius in dicant maluisset euripidis.\n Ne eum vitae eirmod aliquid, duo an mazim semper suscipiantur.",
                url: Faker.internet.url(),
                image: Faker.random.image(),
                email: Faker.internet.email(),
                rating: Faker.random.number(50) / 10,
                views: 0,
                likes: 0,
                appHash
            }).then((app) => {
                app.addReview(reviewHash);
                for (let index = 0; index < i; index++) {
                    // app.addCreators(userIDs[index]);
                }
                app.addTag(TagIDs[Faker.random.number(10)]);
            }));
        });
    });

}
