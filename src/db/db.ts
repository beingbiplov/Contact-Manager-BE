import Knex from "knex";

import knexConfig from "./knexfile";

const knex = Knex(knexConfig.production);

export default knex;
