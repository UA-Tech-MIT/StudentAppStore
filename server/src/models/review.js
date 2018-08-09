export default (Conn, Sequelize) => {

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
        reviewHash: {
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
        }
    }, {
            name: {
                singular: 'review',
                plural: 'reviews',
            }
        });

    Review.associate = (models) => {
        Review.belongsTo(models.User);
        Review.belongsTo(models.App);
    };
    return Review;

};
