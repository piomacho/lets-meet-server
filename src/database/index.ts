import { Sequelize } from 'sequelize';
import { Umzug, SequelizeStorage } from 'umzug';

const username = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const database = process.env.DB_DATABASE;
const host = process.env.DB_HOST;
const port = process.env.DB_PORT;
const dialect = "postgres";

const getDialectOptions = () => {
    if (process.env.NODE_ENV === 'development') {
        return null;
    }

    return {
        ssl: {
            require: false,
            rejectUnauthorized: false,
        },
    }
}

export const sequelize = new Sequelize(database, username, password, {
    host: host,
    port: parseInt(port, 10),
    dialect: dialect,
    dialectOptions: getDialectOptions(),
    define: {
        timestamps: false
    }
});

const umzug = new Umzug({
    migrations: { glob: 'src/database/migrations/*.js' },
    context: sequelize.getQueryInterface(),
    storage: new SequelizeStorage({ sequelize }),
    logger: console,
});

const initDB = async () => {
    console.log(`Checking database connection...`);
    try {
        await sequelize.authenticate();
        console.log('Database connection OK!');
    } catch (error) {
        console.log('Unable to connect to the database:');
        console.log(error.message);
        process.exit(1);
    }
}

const initMigration = async () => {
    console.log(`Checking migrations...`);
    try {
        await umzug.up();
        console.log('Migrations OK!');
    } catch (error) {
        console.log('Unable to make migration:');
        console.log(error.message);
        process.exit(1);
    }
}

export const initDatabase = async () => {
    await initDB();
    await initMigration();
}