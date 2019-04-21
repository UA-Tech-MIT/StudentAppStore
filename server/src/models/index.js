import Sequelize from 'sequelize';

let offlineMode = false;

const onlineSql = new Sequelize(
    'yaatehr+UATech',
    'yaatehr',
    'sod54miy',
    {
        dialect: 'mysql',
        host: 'sql.mit.edu',
        operatorsAliases: false

    }
);

const offlineSql = new Sequelize(
    'UATechDB',
    'postgres',
    'password',
    {
        dialect: 'postgres',
        host: 'localhost',
        port: 9876,
        operatorsAliases: false

    }
);

const UATechServer = new Sequelize(
    'yaatehr+UATech',
    'yaatehr',
    'EmbraceTheTech',
    {
        dialect: 'postgres',
        host: '18.102.211.149',
        port: 5432,
        operatorsAliases: false

    }
);


//tertiary assignment. varname = booleanExpression ? Assigned if true : assigned if false;
const Conn = offlineMode === true ? offlineSql : UATechServer;


const models = {
    User: Conn.import('./user'),
    App: Conn.import('./app'),
    Review: Conn.import('./review'),
    Team: Conn.import('./team'),
    Tag: Conn.import('./tag'),
    AppTag: Conn.import('./appTag'),
    UserTag: Conn.import('./userTag'),
    FileUpload: Conn.import('./fileUpload'),
};

Object.keys(models).forEach((modelName) => {
    if ('associate' in models[modelName]) {
        models[modelName].associate(models);
    }
});

models.sequelize = Conn;
models.Sequelize = Sequelize;

export default models;