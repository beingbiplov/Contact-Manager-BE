import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("contact", (table) => {
    table.increments("contact_id");
    table.string("name").notNullable();
    table.string("email");
    table.boolean("is_favorite").defaultTo(false).notNullable();
    table.string("picture");
    table.string("address");
    table.integer("user_id").unsigned().notNullable();
    table
      .foreign("user_id")
      .references("id")
      .inTable("user_account")
      .onDelete("CASCADE");
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("user_account");
}
