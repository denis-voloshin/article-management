/* eslint-disable node/no-unpublished-import */

import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

import 'dotenv/config';

import server from '../../index';
import {
  createTestUser,
  validateUser,
  beforeEachHook,
  afterHook,
  testUserCredentials
} from './utils';

chai.use(chaiHttp);

beforeEach(beforeEachHook);

after(afterHook);

describe('Users', () => {
  describe('/POST register', () => {
    it('should register user', done => {
      chai.request(server)
        .post('/api/users/register')
        .send({
          login: testUserCredentials.login,
          password: testUserCredentials.password,
          passwordConfirmation: testUserCredentials.password
        })
        .end((err, res) => {
          expect(res).to.have.status(201);

          expect(res.body).to.have.property('token').be.a('string');
          expect(res.body).to.have.property('user').be.a('object');
          validateUser(res.body.user);
          expect(res.body.user).to.have.property('login').equal(testUserCredentials.login);

          done();
        });
    });

    it('should NOT register user with empty credentials', done => {
      chai.request(server)
        .post('/api/users/register')
        .end((err, res) => {
          expect(res).to.have.status(400);

          done();
        });
    });

    it('should NOT register user with invalid login', done => {
      chai.request(server)
        .post('/api/users/register')
        .send({
          login: '{!&^@#%',
          password: testUserCredentials.password,
          passwordConfirmation: testUserCredentials.password
        })
        .end((err, res) => {
          expect(res).to.have.status(400);

          done();
        });
    });

    it('should NOT register user with different passwords', done => {
      chai.request(server)
        .post('/api/users/register')
        .send({
          login: testUserCredentials.login,
          password: testUserCredentials.password,
          passwordConfirmation: `${testUserCredentials.password}_other`
        })
        .end((err, res) => {
          expect(res).to.have.status(400);

          done();
        });
    });

    it('should NOT register user with existing login', done => {
      createTestUser()
        .then(() => {
          chai.request(server)
            .post('/api/users/register')
            .send({
              login: testUserCredentials.login,
              password: testUserCredentials.password,
              passwordConfirmation: testUserCredentials.password
            })
            .end((err, res) => {
              expect(res).to.have.status(409);

              done();
            });
        });
    });
  });

  describe('/POST login', () => {
    it('should login user', done => {
      createTestUser()
        .then(() => {
          chai.request(server)
            .post('/api/users/login')
            .send({
              login: testUserCredentials.login,
              password: testUserCredentials.password
            })
            .end((err, res) => {
              expect(res).to.have.status(200);

              expect(res.body).to.have.property('token').be.a('string');

              done();
            });
        });
    });

    it('should NOT login user with empty credentials', done => {
      chai.request(server)
        .post('/api/users/login')
        .end((err, res) => {
          expect(res).to.have.status(400);

          done();
        });
    });

    it('should NOT login user with not existing login', done => {
      createTestUser()
        .then(() => {
          chai.request(server)
            .post('/api/users/login')
            .send({
              login: 'otherUser',
              password: testUserCredentials.password
            })
            .end((err, res) => {
              expect(res).to.have.status(401);

              done();
            });
        });
    });

    it('should NOT login user with not existing password', done => {
      createTestUser()
        .then(() => {
          chai.request(server)
            .post('/api/users/login')
            .send({
              login: testUserCredentials.login,
              password: 'otherPass1234'
            })
            .end((err, res) => {
              expect(res).to.have.status(401);

              done();
            });
        });
    });
  });
});
