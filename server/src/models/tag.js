export default (Conn, Sequelize) => {

    const Tag = Conn.define('tag', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
        }
    });

    Tag.associate = (models) => {
        Tag.belongsToMany(models.App, {
            through: {
                model: models.AppTag,
                // foreignKey: 'tag_id',
                unique: false
            },
            // foreignKey: 'tag_id',
            // constraints: false
        });
        
        Tag.belongsToMany(models.User, {
            through: {
                model: models.UserTag,
                // foreignKey: 'tag_id',
                unique: false
            },
            // foreignKey: 'tag_id',
            // constraints: false
        });
        return Tag;
    };
    return Tag;
};