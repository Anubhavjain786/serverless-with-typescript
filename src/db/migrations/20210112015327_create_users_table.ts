import * as Knex from 'knex';
import { timestamps } from '../helpers';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('users', function (table) {
    table.bigIncrements('id');
    table.uuid('uuid').index();
    table.string('first_name');
    table.string('last_name');
    table.text('bio').nullable();
    table.string('username').nullable().index();
    table.string('email').nullable().index();
    table.integer('status').nullable().unsigned().index();
    table.string('password');
    timestamps(knex, table);
    table.charset('utf8mb4');
    table.collate('utf8mb4_unicode_ci');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('users');
}
