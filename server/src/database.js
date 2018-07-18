import Faker from 'faker';
import models from './models';

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

        [1, 2, 3, 4, 5, 6, 7].forEach((_, i) => {
            const userID = Faker.random.uuid();
            const reviewID = Faker.random.uuid();
            const appID = Faker.random.uuid();
            userIDs.push(userID);
            appIDs.push(appID);
            reviewIDs.push(reviewID);


            reviews.push(models.Review.create({
                title: Faker.internet.color(),
                content: Faker.random.words(100),
                rating: Faker.random.number(50) / 10,
                foundThisHelpful: Faker.random.number(10),
                id: reviewID
            }));

            users.push(models.User.create({
                firstName: Faker.name.firstName(),
                lastName: Faker.name.lastName(),
                email: Faker.internet.email(),
                id: userID
            }).then((user) => {
                user.addReview(reviewID);
                for (let index = 0; index < i; index++) {
                    user.addCreations(appIDs[index]);
                }
            }));

            apps.push(models.App.create({
                author: Faker.name.firstName() + " " + Faker.name.lastName(),
                name: Faker.company.companyName(),
                genre: Faker.random.word(['Course Planning', 'Time Management', 'Entertainment', 'Networking', 'Tutoring', 'Money Management']),
                medium: Faker.random.word(["Website", "Mobile App", "Chrome Extension"]),
                url: Faker.internet.url(),
                image: Faker.random.image(),
                email: Faker.internet.email(),
                id: appID
            }).then((app) => {
                app.addReview(reviewID);
                for (let index = 0; index < i; index++) {
                    app.addCreators(userIDs[index]);
                }
                app.addTag(TagIDs[Faker.random.number(10)]);
            }));
        });
    });

}
