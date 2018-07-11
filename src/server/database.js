import Sequelize from 'sequelize';
import Faker from 'faker';

let offlineMode = true;

const onlineSql = new Sequelize(
    'yaatehr+UATech',
    'yaatehr',
    'sod54miy',
    {
        dialect: 'mysql',
        host: 'sql.mit.edu'
    }
);

const offlineSql = new Sequelize(
    'UATechDB',
    'postgres',
    'password',
    {
        dialect: 'postgres',
        host: 'localhost',
        port: 9876
    }
);


//tertiary assignment. varname = booleanExpression ? Assigned if true : assigned if false;
const Conn = offlineMode === false ? offlineSql: onlineSql;


//Schema

// should we move some of these fields into a json object?
// personallly don't think it would matter because we pull them all in at the conatainer level
const App = Conn.define('app', {
    author: {
        type: Sequelize.STRING,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    isOfficialResource: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    genre: {
        type: Sequelize.STRING,
        allowNull: false
    },
    medium: {// ^do we need both of these?
        type: Sequelize.TEXT("tiny"), //will this work?
        allowNull: false
    },
    image: {
        type: Sequelize.STRING,
        allowNull: true
    },
    email: {
        type: Sequelize.STRING,
        allowNull: true,
        // validate: {
        //     isEmail: true,
        // }
    },
    dateLaunched: {
        type: Sequelize.STRING,
        allowNull: true,
        validate: {
            isDate: true,
        }
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    url: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isUrl: true
        }
    },
    ownerHomePage: {
        type: Sequelize.STRING,
        allowNull: true,
        validate: {
            isUrl: true
        }
    },
    id: {
        type: Sequelize.UUID,
        primaryKey: true,
        unique: true,
        allowNull: false
    },
    // userHash: {
    //     type: Sequelize.UUID,
        
    //     references: {
    //         model: User,
    //         key: 'id'
    //     }
    // },
    appNo: {
        type: Sequelize.INTEGER,
        unique: true,
        autoIncrement: true,
        comment: 'For redux counters'
    }
}, {
    name: {
        singular: 'app',
        plural: 'apps',
      },
    //   indexes: [
    //     {
    //       unique: true,
    //       fields: ['appNo']
    //     }],
});


const Review = Conn.define('review', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    content: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    rating: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    // authorName: {
    //     type: Sequelize.STRING,
    //     allowNull: false
    // },
    foundThisHelpful: {
        type: Sequelize.INTEGER,
        // should we allow null here?
    },
    // path to thumbnail?
    // allow other content like pics in reviews)
    // profilelink?
    id: {
        type: Sequelize.UUID,
        primaryKey: true,
        unique: true,
        allowNull: false
    },
    // userHash: {
    //     type: Sequelize.UUID,

    //     references: {
    //         model: User,
    //         key: 'id'
    //     }
    // },
    reviewNo: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        unique: true,
        comment: 'For redux counters'
    }
},  {
    name: {
        singular: 'review',
        plural: 'reviews',
      },
    //   indexes: [
    //     {
    //       unique: true,
    //       fields: ['reviewNo']
    //     }],
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
        allowNull: false,
        // validate: {
        //     isEmail: true,
        // }
    },
    // userConfig: { // this will have to be another class??
    //     type: Sequelize.JSONB,
    //     allowNull: false,
    //     defaultValue: {
    //         studentInfo: {},
    //         settings: {}
    //     }
    // },
    id: {
        type: Sequelize.UUID,
        primaryKey: true,
        unique: true,
        allowNull: false
    },
    userNo: {
        type: Sequelize.INTEGER,
        unique: true,
        autoIncrement: true,
        comment: 'For redux counters'
    },

    //relations

    // appHashes: {
    //     type: Sequelize.ARRAY({ type: Sequelize.UUID }),

    //     references: {
    //         model: App,
    //         key:'id'
    //     }
    // },
    // reviewHashes: {
    //     type: Sequelize.ARRAY({ type: Sequelize.UUID }),

    //     references: {
    //         model: Review,
    //         key:'id'
    //     }
    // }

}, {
    name: {
        singular: 'user',
        plural: 'users',
      },
    //   indexes: [
    //     {
    //       unique: true,
    //       fields: ['userNo']
    //     }],
});


const Team = Conn.define('team', { // relate through model
    owner: {
        type: Sequelize.UUID,
        // allowNull: false,
        // defaultValue: () => {
        //     return this.get
        // }
    }

});

// from sequlize docs
const ItemTag = Conn.define('item_tag', {
    id : {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    tag_id: {
      type: Sequelize.INTEGER,
      unique: 'item_tag_taggable'
    },
    taggable: {
      type: Sequelize.STRING,
      unique: 'item_tag_taggable'
    },
    taggable_id: {
      type: Sequelize.INTEGER,
      unique: 'item_tag_taggable',
      references: null
    }
  });
  const Tag = Conn.define('tag', {
    name: Sequelize.STRING
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
App.hasMany(Review);
Review.belongsTo(App);

User.belongsToMany(App, {through: Team, as: 'creations'});
App.belongsToMany(User, {through: Team, as: 'creators'});
App.belongsToMany(Tag, {
    through: {
      model: ItemTag,
      unique: false,
      scope: {
        taggable: 'app'
      }
    },
    foreignKey: 'taggable_id',
    constraints: false
  });
Tag.belongsToMany(App, {
through: {
    model: ItemTag,
    unique: false
},
foreignKey: 'tag_id',
constraints: false
});

Conn
  .authenticate()
  .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

//add a bunch of phony entitiies to the database
if(!offlineMode) {
    Conn.query('SET FOREIGN_KEY_CHECKS = 0', {raw: true})
}
    Conn.sync({ force: true }).then(() => {
    let users = [];
    let userIDs = [];
    let apps = [];
    let appIDs = [];
    let reviews = [];
    let reviewIDs = [];
    let TagIDs = [];
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].forEach((_) => {
    Tag.create({
            name: Faker.random.word(['Essential', 'Social', 'Anonymous', 'Planning']),
        }).then((tag) => {
            TagIDs.push(tag.get('id'));
        });
    });

    [1, 2, 3, 4, 5, 6, 7].forEach((_, i) => {
        const userID = Faker.random.uuid();
        const reviewID = Faker.random.uuid();
        const appID = Faker.random.uuid();
        userIDs.push(userID);
        appIDs.push(appID);
        reviewIDs.push(reviewID);


        reviews.push(Review.create({
            title: Faker.internet.color(),
            content: Faker.random.words(100),
            rating: Faker.random.number(50) / 10,
            foundThisHelpful: Faker.random.number(10),
            id: reviewID
        }));

        users.push(User.create({
            firstName: Faker.name.firstName(),
            lastName: Faker.name.lastName(),
            email: Faker.internet.email(),
            id: userID
        }).then((user) => {
            user.addReview(reviewID);
            for(let index = 0; index < i; index++) {
                user.addCreations(appIDs[index]);
            }
        }));

        apps.push(App.create({
            author: Faker.name.firstName() + " " + Faker.name.lastName(),
            name: Faker.company.companyName(),
            genre: Faker.random.word(['Course Planning', 'Time Management', 'Entertainment', 'Networking', 'Tutoring', 'Money Management']),
            medium: Faker.random.word(["Website", "Mobile App", "Chrome Extension"]),
            url: Faker.internet.url(),
            image: Faker.internet.image(),
            email: Faker.internet.email(),
            id: appID
        }).then((app) => {
            app.addReview(reviewID);
            for(let index = 0; index < i; index++) {
                app.addCreators(userIDs[index]);
            }
            app.addTag(TagIDs[Faker.random.number(10)]);
        }));
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
// });

export default Conn;