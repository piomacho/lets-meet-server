import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../../database';
import * as t from 'io-ts';
import { createGuard } from '../../utils/createGuard';

const UserInfoCreationIO = t.interface({
    user_id: t.string,
    name: t.string,
    surname: t.string,
    date_of_birth: t.string,
    gender: t.string,
    age: t.number,
    photo: t.union([t.string, t.null])
});

export const isUserInfo = createGuard(UserInfoCreationIO);

const TokenIO = t.string;

export const isValidToken = createGuard(TokenIO);

type UserInfoCreationType = t.TypeOf<typeof UserInfoCreationIO>;
type UsersType = UserInfoCreationType & { id: string };

interface UserInfoInstance extends Model<UsersType>, UsersType {}

export const UserDetails = sequelize.define<UserInfoInstance>(
    'UserDetails',
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            unique: true,
            allowNull: false,
            autoIncrement: false,
        },
        user_id: {
            allowNull: false,
            type: DataTypes.UUID,
        },
        name: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        surname: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        date_of_birth: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        gender: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        age: {
            allowNull: false,
            type: DataTypes.SMALLINT,
        },
        photo: {
            allowNull: true,
            type: DataTypes.BLOB('long'),
        }
    }
);