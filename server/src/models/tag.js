export default (Conn, Sequelize) => {

    const Tag = Conn.define('tag', {
        name: Sequelize.STRING
    });

    Tag.associate = (models) => {
        Tag.belongsToMany(models.App, {
            through: {
                model: models.AppTag,
                unique: false
            },
            foreignKey: 'tag_id',
            constraints: false
        });
        
        Tag.belongsToMany(models.User, {
            through: {
                model: models.UserTag,
                unique: false
            },
            foreignKey: 'tag_id',
            constraints: false
        });
        return Tag;
    };
    return Tag;
};