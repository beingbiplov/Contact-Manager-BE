import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("refresh_token", (table) => {
    table.increments("id");
    table.string("refresh_token").notNullable();
    table.string("user_id").notNullable();
    table.dateTime("expires_at").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("refresh_token");
}
