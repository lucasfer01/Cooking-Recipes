/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Diet, Recipe, conn } = require('../../src/db.js');

const agent = session(app);
const recipe = {
  name: 'Milanea a la napolitana',
  summary: 'summary de prueba'
};
const diet = {
  name: 'Dieta de prueba'
}

describe('Recipe routes', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));

  beforeEach(() => Recipe.sync({ force: true })
    .then(() => Recipe.create(recipe)));

  describe('GET /recipes', () => {
    it('should get 200', (done) => {
      agent.get('/recipes').expect(200);
      
      done();
    });
  });
});

describe('Diets routes', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));

  beforeEach(() => Diet.sync({ force: true })
    .then(() => {
      Diet.create(diet);
    }));

  describe('GET /types', () => {
    it('should get 200', (done) => {
      agent.get('/types').expect(200);

      done();
    });
  });
});
