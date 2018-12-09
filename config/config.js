
const { Model, knexSnakeCaseMappers } = require('objection');
const Knex = require('knex');
const knexConfig = require('../knexfile');

const environment = process.env.NODE_ENV || 'development';

const knex = Knex(Object.assign(knexConfig[environment], knexSnakeCaseMappers()));

Model.knex(knex);

module.exports = {
  Model,
  knex
};