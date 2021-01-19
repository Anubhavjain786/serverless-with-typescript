import { Model } from 'objection';

export class Users extends Model {
  static tableName = 'users';
  id: string;

  static relationMappings = {
    followers: {
      relation: Model.ManyToManyRelation,
      modelClass: 'Users',
      join: {
        from: 'users.id',
        through: {
          from: 'usersFollowers.profileId',
          to: 'usersFollowers.usersId',
        },
        to: 'users.id',
      },
    },
    followings: {
      relation: Model.ManyToManyRelation,
      modelClass: 'Users',
      join: {
        from: 'users.id',
        through: {
          from: 'user_followers.usersId',
          to: 'user_followers.profileId',
        },
        to: 'users.id',
      },
    },
  };
}
