import Sequelize from 'sequelize';

let offlineMode = false;

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
        port: 9876
    }
);


//tertiary assignment. varname = booleanExpression ? Assigned if true : assigned if false;
const Conn = offlineMode === true ? offlineSql : onlineSql;


const models = {
    User: Conn.import('./user'),
    App: Conn.import('./App'),
    Review: Conn.import('./Review'),
    Team: Conn.import('./team'),
    Tag: Conn.import('./tag'),
    ItemTag: Conn.import('./itemTag'),
};

Object.keys(models).forEach((modelName) => {
    if ('associate' in models[modelName]) {
        models[modelName].associate(models);
    }
});

models.sequelize = Conn;
models.Sequelize = Sequelize;

export default models;