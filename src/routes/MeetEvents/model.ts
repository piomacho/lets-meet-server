import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../../database';
import * as t from 'io-ts';
import { createGuard } from '../../utils/createGuard';

const MeetEventsCreateIO = t.interface({
    userId: t.string,
    title: t.string,
    category: t.string,
    gender: t.string,
    participants: t.number,
    latitude: t.union([t.string, t.null]),
    longitude: t.union([t.string, t.null]),
    place: t.union([t.string, t.null]),
    ageFrom: t.number,
    ageTo: t.number,
    description: t.union([t.string, t.null]),
    date: t.union([t.string, t.null]),
});

const MeetsEventsFetchIO = t.interface({
  gender: t.union([t.string, t.null]),
  category: t.union([t.string, t.null]),
});

export const isMeetEventsCreate = createGuard(MeetEventsCreateIO);

export const isFetchMeetEvents = createGuard(MeetsEventsFetchIO);

type MeetEventsCreateType = t.TypeOf<typeof MeetEventsCreateIO>;
type MeetEventsType = MeetEventsCreateType & { id: string };

interface MeetEventsInstance extends Model<MeetEventsType>, MeetEventsType { }

export const MeetEvents = sequelize.define<MeetEventsInstance>(
    'MeetEvents',
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            unique: true,
            allowNull: false,
            autoIncrement: false,
          },
          userId: {
            allowNull: false,
            type: DataTypes.UUID,
          },
          title: {
            allowNull: false,
            type: DataTypes.STRING,
          },
          category: {
            allowNull: false,
            type: DataTypes.STRING,
          },
          gender: {
            allowNull: false,
            type: DataTypes.STRING,
          },
          participants: {
            allowNull: false,
            type: DataTypes.INTEGER,
          },
          latitude: {
            allowNull: true,
            type: DataTypes.STRING,
          },
          longitude: {
            allowNull: true,
            type: DataTypes.STRING,
          },
          place: {
            allowNull: true,
            type: DataTypes.STRING,
          },
          ageFrom: {
            allowNull: false,
            type: DataTypes.INTEGER,
          },
          ageTo: {
            allowNull: false,
            type: DataTypes.INTEGER,
          },
          description: {
            allowNull: true,
            type: DataTypes.TEXT,
          },
          date: {
            allowNull: true,
            type: DataTypes.STRING,
          }
    }
);