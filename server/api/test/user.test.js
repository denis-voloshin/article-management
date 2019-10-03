/* eslint-disable node/no-unpublished-import */

import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

import 'dotenv/config';

import server from '../../index';
import { ensureConnection, cleanDatabase, createUser } from './utils';
import { logError } from '../../utils/console';

chai.use(chaiHttp);

const testUserCredentials = {
  login: 'test',
  password: '1234'
};

const userCredentials = {
  login: 'testUser',
  password: 'pass1234'
};

beforeEach(async () => {
  try {
    await ensureConnection();
    await cleanDatabase();
    await createUser(testUserCredentials);
  } catch (err) {
    logError('before hook error occurred');
    logError(err);
  }
});

after(async () => {
  try {
    await ensureConnection();
    await cleanDatabase();
  } catch (err) {
    logError('after hook error occurred');
    logError(err);
  }
});

describe('Users', () => {
  describe('/POST register', () => {
    it('should register user', done => {
      chai.request(server)
        .post('/api/users/register')
        .send({
          login: userCredentials.login,
          password: userCredentials.password,
          passwordConfirmation: userCredentials.password
        })
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('token').be.a('string');

          expect(res.body).to.have.property('user').be.a('object');
          expect(res.body.user).to.have.property('_id').be.a('string');
          expect(res.body.user).to.have.property('login').equal('testUser');

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
          password: userCredentials.password,
          passwordConfirmation: userCredentials.password
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
          login: userCredentials.login,
          password: userCredentials.password,
          passwordConfirmation: `${userCredentials.password}_other`
        })
        .end((err, res) => {
          expect(res).to.have.status(400);

          done();
        });
    });

    it('should NOT register user with existing login', done => {
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

  describe('/POST login', () => {
    it('should login user', done => {
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

    it('should NOT login user with empty credentials', done => {
      chai.request(server)
        .post('/api/users/login')
        .end((err, res) => {
          expect(res).to.have.status(400);

          done();
        });
    });

    it('should NOT login user with not existing login', done => {
      chai.request(server)
        .post('/api/users/login')
        .send({
          login: 'otherUser',
          password: userCredentials.password
        })
        .end((err, res) => {
          expect(res).to.have.status(401);

          done();
        });
    });

    it('should NOT login user with not existing password', done => {
      chai.request(server)
        .post('/api/users/login')
        .send({
          login: userCredentials.login,
          password: 'otherPass1234'
        })
        .end((err, res) => {
          expect(res).to.have.status(401);

          done();
        });
    });
  });
});
