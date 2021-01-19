// Initialize knex.
import Knex from 'knex';
import { knexSnakeCaseMappers } from 'objection';
import 'dotenv/config';
export default {
  client: process.env.DB_CLIENT,
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
  },
  migrations: {
    tableName: 'migrations',
    directory: './src/db/migrations',
    extension: 'ts',
  },
  ...knexSnakeCaseMappers(),
} as Knex.Config;
