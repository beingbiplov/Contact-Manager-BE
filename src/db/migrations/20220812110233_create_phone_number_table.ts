import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("phone_number", (table) => {
    table.increments("phone_id");
    table.bigInteger("phone_number").notNullable().unsigned();
    table
      .enu("label", ["cell", "home", "work", "other"])
      .defaultTo("cell")
      .notNullable();
    table.integer("contact_table_id").unsigned().notNullable();
    table
      .foreign("contact_table_id")
      .references("contact_id")
      .inTable("contact")
      .onDelete("CASCADE");
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("phone_number");
}
