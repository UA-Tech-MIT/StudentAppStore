import Sequelize from 'sequelize';

let offlineMode = true;

const onlineSql = new Sequelize(
    'yaatehr+UATech',
    'yaatehr',
    'sod54miy',
    {
        dialect: 'mysql',
        host: 'sql.mit.edu'
    }
);

const offlineSql = new Sequelize(
    'UATechDB',
    'postgres',
    'password',
    {
        dialect: 'postgres',
        host: 'localhost',
        port: 5432
    }
);


//tertiary assignment. varname = booleanExpression ? Assigned if true : assigned if false;
const Conn = offlineMode === true ? offlineSql : onlineSql;


const models = {
    User: Conn.import('./user'),
    App: Conn.import('./app'),
    Review: Conn.import('./review'),
    Team: Conn.import('./team'),
    Tag: Conn.import('./tag'),
    AppTag: Conn.import('./appTag'),
    UserTag: Conn.import('./userTag'),
    FileUpload: Conn.import('./fileUpload'),
    sequelize: Conn,
    Sequelize: Sequelize
};

Object.keys(models).forEach((modelName) => {
    if ('associate' in models[modelName]) {
        models[modelName].associate(models);
    }
});


export default models;