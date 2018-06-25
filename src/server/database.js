import Sequelize from 'sequelize';
import Faker from 'faker';

const Conn = new Sequelize(
    'yaatehr+UATech',
    'yaatehr',
    'sod54miy',
    {
        dialect: 'mysql',
        host: 'sql.mit.edu'
    }
);


//Schema
const App = Conn.define('app', {
    author: {
        type: Sequelize.STRING,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    type: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: true,
        validate: {
            isEmail: true
        }
    },
    appHash: {
        type: Sequelize.UUID,
        primaryKey: true,
        unique: true,
        allowNull: false
    },
}, {
    name: {
        singular: 'app',
        plural: 'apps',
      },// for relationships
      
});


const Review = Conn.define('review', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    content: {
        type: Sequelize.STRING,
        allowNull: false
    },
    rating: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    authorName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    reviewHash: {
        type: Sequelize.UUID,
        primaryKey: true,
        unique: true,
        allowNull: false
    },
    // userHash: {
    //     type: Sequelize.UUID,
    //     allowNull: false
    // }
},  {
    name: {
        singular: 'review',
        plural: 'reviews',
      }
} );

const User = Conn.define('user', {
    firstName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    userHash: {
        type: Sequelize.UUID,
        primaryKey: true,
        unique: true,
        allowNull: false
    },

    // appHashes: {
    //     type: Sequelize.ARRAY({ type: Sequelize.UUID })
    // },
    // reviewHashes: {
    //     type: Sequelize.ARRAY({ type: Sequelize.UUID })
    // }

}, {
    name: {
        singular: 'user',
        plural: 'users',
      }
});

// RELATIONSHIPS TODO: Mock out relationships between DB Schema and recreate this structure.
//Note: incomplete

// For a N:M relationship, do this:

// Parent.belongsToMany( Child, {
//     as: [Relationship],
//     through: [Parent_Child] //this can be string or a model,
//     foreignKey: 'Parent_rowId'
// });

// Child.belongsToMany(Parent, {
//     as: [Relationship2],
//     through: [Parent_Child],
//     foreignKey: 'Child_rowId'
// });

User.hasMany(Review);
Review.belongsTo(User);
User.hasMany(App);
App.belongsTo(User);
App.hasMany(Review);
Review.belongsTo(App);


Conn
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

//add a bunch of phony entitiies to the database
Conn.sync({ force: true }).then(() => {
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 0].forEach( _ => {
        return User.create({
            firstName: Faker.name.firstName(),
            lastName: Faker.name.lastName(),
            email: Faker.internet.email(),
            userHash: Faker.random.uuid()
        }).then(person => {
        return person.createApp({
            author: Faker.name.firstName() + " " + Faker.name.lastName(),
            name: Faker.company.companyName(),
            type: Faker.random.word(['app', 'official']),
            appHash: Faker.random.uuid()
        }).then( app => {
            app.createReview( {
                    title: Faker.internet.color(),
                    content: Faker.random.words(100),
                    rating: Faker.random.number(5),
                    authorName: Faker.name.firstName() + " " + Faker.name.lastName(),
                    reviewHash: Faker.random.uuid(),
                    // userHash: person.userHash
            });
        });
        });
    });

    // [1, 2, 3, 4, 5, 6, 7, 8, 9, 0].forEach( _ => {
    //     return Review.create({
    //         title: Faker.name.firstName(),
    //         content: Faker.name.lastName(),
    //         rating: Faker.random.number(5),
    //         authorName: Faker.name.firstName() + " " + Faker.name.lastName(),
    //         reviewHash: Faker.random.uuid()
    //     });
    // });

    // [1, 2, 3, 4, 5, 6, 7, 8, 9, 0].forEach( _ => {
    //     return App.create({
    //         author: Faker.name.firstName() + " " + Faker.name.lastName(),
    //         name: Faker.company.companyName(),
    //         type: Faker.random.word(['app', 'official']),
    //         appHash: Faker.random.uuid()
    //     });
    // });
});

export default Conn;