import Knex from 'knex';
import { Model } from 'objection';
import { eventParser } from '../_support/https';
import Response from '../_support/https/response';
import * as KnexConfig from '../../knexfile';

export class Container {
  static async apigw({ event, callback }): Promise<any> {
    try {
      Model.knex(Knex(KnexConfig.default));
      const inputs = eventParser(event);
      return await callback(inputs);
    } catch (e) {
      return Response.error({ message: e.message, stack: e.stack });
    }
  }
}
