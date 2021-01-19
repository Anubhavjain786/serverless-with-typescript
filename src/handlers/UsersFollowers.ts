import { Users, UsersFollower } from './../models';

export class UserFollowerHandler {
  static async toggle(inputs: Record<string, any>, users: Record<string, any>) {
    const userProfile = await Users.query().findOne({ uuid: users.uuid });
    const profile = await Users.query().findOne({ username: inputs.username });

    if (profile['id'] === userProfile['id'])
      throw new Error('User cannot own profile');

    const follower = await UsersFollower.query().findOne({
      userId: userProfile['id'],
      profileId: profile['id'],
    });

    if (follower) {
      await UsersFollower.query().where(follower).delete();
      return false;
    }
    // eslint-disable-next-line
    // await UsersFollower.query().insert({
    //   usersId: userProfile['id'],
    //   profileId: profile['id'],
    // });

    return await UsersFollower.query().findOne({ userId: userProfile.id });
  }
}
