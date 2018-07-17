export default (Conn, Sequelize) => {


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
            autoIncrement: true,
            unique: true,
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
            }
        });

    User.associate = (models) => {
        User.hasMany(models.Review);


        User.belongsToMany(models.App, { through: models.Team, as: 'creations' });
    };
    return User;
};