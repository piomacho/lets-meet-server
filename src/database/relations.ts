import { Users } from './../routes/Users/model';
import { UserDetails } from './../routes/UserDetails/model';


export const makeRelations = () => {
    console.log("CREATE RELATIONS")
    // example

    // Latests.hasMany(Comments, {
    //     sourceKey: 'id',
    //     foreignKey: 'latest_id',
    //     as: 'comments'
    // });
    
    // Comments.belongsTo(Latests, {
    //     foreignKey: 'latest_id',
    //     as: 'latests'
    // });

    Users.hasOne(UserDetails, {
        sourceKey: 'id',
        foreignKey: 'user_id',
        as: 'user-details'
    });

    UserDetails.belongsTo(Users, {
        foreignKey: 'user_id',
        as: 'user-details'
    });
}