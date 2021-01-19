import { Users } from '../models';
import { uuid, Hash } from '../helpers';
import jwt from 'jsonwebtoken';

export class Auth {
  static async signup(inputs: Record<string, any>) {
    const query = Users.query();
    const alreadyExists = await query.findOne({ username: inputs.username });
    if (alreadyExists) throw new Error('User already exists');

    inputs.password = await Hash.make(inputs.password);
    inputs.uuid = uuid();

    const user = await Users.query().insertAndFetch({ ...inputs });

    return { ...user, token: this.getToken(user) };
  }

  static async login(inputs: Record<string, any>) {
    const query = Users.query();
    const user = await query.findOne({ username: inputs.username });
    if (!user) throw new Error('User not Found');

    if (!(await Hash.match(inputs.password, user['password']))) {
      throw new Error('Password did not match');
    }

    return { ...user, token: this.getToken(user) };
  }

  private static getToken(user: Record<string, any>) {
    return jwt.sign({ uuid: user.uuid }, process.env.JWT_SECRET);
  }
}
