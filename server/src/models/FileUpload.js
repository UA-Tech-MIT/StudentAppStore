export default (Conn, Sequelize) => {
    //we can't call it file because of the native file type, and we can't use relations because its static serving so why??
        const FileUpload = Conn.define('FileUpload', {
            url: {
                type: Sequelize.STRING, 
                allowNull: false,
            },
            filetype: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            name: Sequelize.STRING,
            size: Sequelize.FLOAT,
        });
         FileUpload.associate = (models) => {
            FileUpload.belongsTo(models.App);
            FileUpload.belongsTo(models.User);
            return FileUpload;
        }
        return FileUpload
    };