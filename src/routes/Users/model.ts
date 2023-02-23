import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../../database';
import * as t from 'io-ts';
import { createGuard } from '../../utils/createGuard';

const UsersCreationIO = t.interface({
    email: t.string,
    apple_id: t.union([t.string, t.null]),
    google_id: t.union([t.string, t.null]),
    firebase_id: t.union([t.string, t.null]),
});

export const isUsers = createGuard(UsersCreationIO);

const TokenIO = t.string;

export const isValidToken = createGuard(TokenIO);

type UsersCreationType = t.TypeOf<typeof UsersCreationIO>;
type UsersType = UsersCreationType & { id: string };

interface UsersInstance extends Model<UsersType>, UsersType {}

export const Users = sequelize.define<UsersInstance>(
    'Users',
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            unique: true,
            allowNull: false,
            autoIncrement: false,
        },
        firebase_id: {
            allowNull: true,
            unique: true,
            type: DataTypes.STRING,
        },
        apple_id: {
            allowNull: true,
            unique: true,
            type: DataTypes.STRING,
        },
        google_id: {
            allowNull: true,
            unique: true,
            type: DataTypes.STRING,
        },
        email: {
            allowNull: false,
            type: DataTypes.STRING,
        },

    }
);