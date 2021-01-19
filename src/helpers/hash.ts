import * as bcrypt from 'bcryptjs';

export class Hash {
  static async make(rawString: string): Promise<string> {
    return await bcrypt.hash(rawString, process.env.SALT_ROUNDS);
  }

  static async match(rawString: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(rawString, hash);
  }
}
