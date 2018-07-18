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
            type: Sequelize.TEXT("tiny"),
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
        appNo: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            unique: true,
            comment: 'For redux counters'
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
                model: models.ItemTag,
                unique: false,
                scope: {
                    taggable: 'app'
                }
            },
            foreignKey: 'taggable_id',
            constraints: false
        });
    };

    return App;
};