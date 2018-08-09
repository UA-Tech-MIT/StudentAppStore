import bcrypt from 'bcrypt';

export default (Conn, Sequelize) => {


    const User = Conn.define('user', {
        firstName: {
            type: Sequelize.STRING,
            allowNull: true
        },
        lastName: {
            type: Sequelize.STRING,
            allowNull: true
        },
        username: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                isAlphanumeric: {
                  args: true,
                  msg: 'The username can only contain letters and numbers',
                },
                //TODO: actual kerberoses are 8 characters long. change validation
                len: {
                  args: [3, 25],
                  msg: 'The username needs to be between 3 and 25 characters long',
                },
              },
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            // validate: {
            //     isEmail: {
            //       args: true,
            //       msg: 'Invalid email',
            //     },
            //   },
            //TODO add validator to the resolver. This throws occasional errors???
        },
        // userConfig: { // this will have to be another class??
        //     type: Sequelize.JSONB,
        //     allowNull: false,
        //     defaultValue: {
        //         studentInfo: {},
        //         settings: {}
        //     }
        // },
        userHash: {
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
        password: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                len: {
                  args: [5, 100],
                  msg: 'The password needs to be between 5 and 100 characters long',
                },
              },
        },
        //TODO add relation fields if necessary
    }, {
            name: {
                singular: 'user',
                plural: 'users',
            },
            hooks: {
                afterValidate: async (user) => {
                  const hashedPassword = await bcrypt.hash(user.password, 12);
                  user.password = hashedPassword;
                },
              },
        });

    User.associate = (models) => {
        User.hasMany(models.Review);
        User.belongsToMany(models.App, { through: models.Team, as: 'creations' });
    };
    return User;
};