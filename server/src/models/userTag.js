export default (Conn, Sequelize) => {
    
    const UserTag = Conn.define('user_tag', {
//          id : {
//            type: Sequelize.INTEGER,
//            primaryKey: true,
//            autoIncrement: true
//          },
//          tag_id: {
//            type: Sequelize.INTEGER,
//            unique: 'user_tag_taggable'
//          },
//          taggable: {
//            type: Sequelize.STRING,
//            unique: 'user_tag_taggable'
//          },
//          taggable_id: {
//            type: Sequelize.INTEGER,
//            unique: 'user_tag_taggable',
//            references: null
//          }
        });
      return UserTag;
    }; 
