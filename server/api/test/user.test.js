import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

import 'dotenv/config';

import server from '../../index';
import { cleanDatabase, ensureConnection, createUser } from './utils';

chai.use(chaiHttp);

const userCredentials = {
  login: 'testUser',
  password: 'pass1234'
};

after(async () => {
  await ensureConnection();
  cleanDatabase();
});

describe('Users', () => {
  beforeEach(async () => {
    await ensureConnection();
    cleanDatabase(async () => {
      await createUser(userCredentials);
    });
  });

  describe('/POST register', () => {
    it('should register user', async () => {
      chai.request(server)
        .post('/api/users/register')
        .send({
          login: 'testUser',
          password: 'pass1234',
          passwordConfirmation: 'pass1234'
        })
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('message').equal('User created');
          expect(res.body).to.have.property('token').be.a('string');

          expect(res.body).to.have.property('user').be.a('object');
          expect(res.body.user).to.have.property('_id').be.a('string');
          expect(res.body.user).to.have.property('login').equal('testUser');
        });
    });

    it('should NOT register user with empty credentials', async () => {
      chai.request(server)
        .post('/api/users/register')
        .end((err, res) => {
          expect(res).to.have.status(400);
        });
    });

    it('should NOT register user with invalid login', async () => {
      chai.request(server)
        .post('/api/users/register')
        .send({
          login: '{!&^@#%',
          password: userCredentials.password,
          passwordConfirmation: userCredentials.password
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
        });
    });

    it('should NOT register user with different passwords', async () => {
      chai.request(server)
        .post('/api/users/register')
        .send({
          login: userCredentials.login,
          password: userCredentials.password,
          passwordConfirmation: `${userCredentials.password}_other`
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
        });
    });

    it('should NOT register user with existing login', async () => {
      chai.request(server)
        .post('/api/users/register')
        .send({
          login: userCredentials.login,
          password: userCredentials.password,
          passwordConfirmation: userCredentials.password
        })
        .end((err, res) => {
          expect(res).to.have.status(409);
          expect(res.body).to.have.property('message').equal('User with such login exists');
        });
    });
  });

  describe('/POST login', () => {
    it('should login user', async () => {
      chai.request(server)
        .post('/api/users/login')
        .send({
          login: userCredentials.login,
          password: userCredentials.password
        })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('token').be.a('string');
        });
    });

    it('should NOT login user with empty credentials', async () => {
      chai.request(server)
        .post('/api/users/login')
        .end((err, res) => {
          expect(res).to.have.status(400);
        });
    });

    it('should NOT login user with not existing login', async () => {
      chai.request(server)
        .post('/api/users/login')
        .send({
          login: 'otherUser',
          password: userCredentials.password
        })
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body).to.have.property('message').equal('Login or password is incorrect');
        });
    });

    it('should NOT login user with not existing password', async () => {
      chai.request(server)
        .post('/api/users/login')
        .send({
          login: userCredentials.login,
          password: 'otherPass1234'
        })
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body).to.have.property('message').equal('Login or password is incorrect');
        });
    });
  });
});
