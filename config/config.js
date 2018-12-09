
const { Model, knexSnakeCaseMappers } = require('objection');
const Knex = require('knex');

const knex = Knex(Object.assign({
  client: 'mysql',
  connection: {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'lagom-restaurant',
  },
}, knexSnakeCaseMappers()));

Model.knex(knex);

module.exports = {
  Model,
  knex
};