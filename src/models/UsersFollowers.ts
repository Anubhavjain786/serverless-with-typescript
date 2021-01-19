import { Model } from 'objection';

export class UsersFollower extends Model {
  static tableName = 'users_followers';
  id: number;
  usersId: number;
  profileId: number;

  static relationMappings = {
    user: {
      relation: Model.BelongsToOneRelation,
      modelClass: 'Users',
      join: {
        from: 'users_followers.usersId',
        to: 'users.id',
      },
    },
    profile: {
      relation: Model.BelongsToOneRelation,
      modelClass: 'Users',
      join: {
        from: 'users_followers.profileId',
        to: 'users.id',
      },
    },
  };
}
