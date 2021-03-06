export default (Conn, Sequelize) => {
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
            type: Sequelize.TEXT,
            allowNull: false
        },
        image: {
            type: Sequelize.STRING,
            allowNull: true
        },
        email: {
            type: Sequelize.STRING,
            allowNull: true,
            // validate: {// throws errors. TODO look into this
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
        rating: {
            type: Sequelize.FLOAT,
            allowNull: false,
            validate: { min: 0, max: 5 },
            defaultValue: 0,
        },
        ownerHomePage: {
            type: Sequelize.STRING,
            allowNull: true,
            validate: {
                isUrl: true
            }
        },
        appHash: {
            type: Sequelize.UUID,
            primaryKey: true,
            unique: true,
            allowNull: false
        },
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            unique: true,
            comment: 'For redux counters'
        },
        views: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        likes: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        numRatings: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0,
        }
    }, {
            name: {
                singular: 'app',
                plural: 'apps',
            },// for relationships

        });

    App.associate = (models) => {
        App.hasMany(models.Review);

        App.belongsToMany(models.User, { through: models.Team, as: 'creators' });
        App.belongsToMany(models.Tag, {
            through: {
                model: models.AppTag,
                foreignKey: 'appHash',
                unique: 'false',
                // unique: false,
                // scope: {
                //     taggable: 'app'
                // }
            },
            // foreignKey: 'taggable_id',
            // constraints: false
        });
    };

    return App;
};