export default (Conn, Sequelize) => {
    
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
  return ItemTag;
};