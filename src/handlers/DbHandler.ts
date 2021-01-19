import knex from 'knex';
import * as KnexConfig from '../../knexfile';

export class DbHandler {
  private inputs: Record<string, any>;
  private db: any;

  constructor(inputs) {
    this.inputs = inputs;
    this.db = knex(KnexConfig.default);
  }

  async migrate() {
    if (this.inputs.migrate === '1') {
      await this.db.migrate.up(KnexConfig);
    }
    if (this.inputs.migrate === '0') {
      await this.db.migrate.down(KnexConfig);
    }
  }
}
