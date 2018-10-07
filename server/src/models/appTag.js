export default (Conn, Sequelize) => {
    
const AppTag = Conn.define('app_tag', {
      id : {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      tag_id: {
        type: Sequelize.INTEGER,
        unique: 'app_tag_taggable'
      },
      taggable: {
        type: Sequelize.STRING,
        unique: 'app_tag_taggable'
      },
      taggable_id: {
        type: Sequelize.INTEGER,
        unique: 'app_tag_taggable',
        references: null
      }
    });
  return AppTag;
};