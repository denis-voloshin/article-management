/* eslint-disable node/no-unpublished-import */

import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import _ from 'lodash/fp';

import 'dotenv/config';

import server from '../../index';
import {
  createTestUser,
  createTestArticles,
  validateArticle,
  validateUser,
  createTestArticle,
  beforeEachHook,
  afterHook,
  testPublicArticle,
  testPrivateArticle
} from './utils';

chai.use(chaiHttp);

beforeEach(beforeEachHook);

after(afterHook);

describe('Articles', () => {
  describe('/POST article', () => {
    it('should create public article', done => {
      createTestUser()
        .then(user => {
          chai.request(server)
            .post('/api/articles')
            .set('Authorization', `Bearer ${user.token}`)
            .attach('image', testPublicArticle.image)
            .field({
              title: testPublicArticle.title,
              text: testPublicArticle.text,
              isPublic: testPublicArticle.isPublic
            })
            .end((err, res) => {
              expect(res).to.have.status(201);

              expect(res.body).to.have.property('article').be.a('object');
              validateArticle(res.body.article);
              expect(res.body.article).to.have.property('title').equal(testPublicArticle.title);
              expect(res.body.article).to.have.property('text').equal(testPublicArticle.text);
              expect(res.body.article).to.have.property('isPublic').equal(testPublicArticle.isPublic);
              expect(res.body.article).to.have.property('image').be.a('string');

              expect(res.body.article).to.have.property('author').be.a('object');
              validateUser(res.body.article.author);
              expect(res.body.article).to.have.property('createdAt').be.a('string');
              expect(res.body.article).to.have.property('updatedAt').be.oneOf(['string', null]);

              done();
            });
        });
    });

    it('should create private article', done => {
      createTestUser()
        .then(user => {
          chai.request(server)
            .post('/api/articles')
            .set('Authorization', `Bearer ${user.token}`)
            .attach('image', testPrivateArticle.image)
            .field({
              title: testPrivateArticle.title,
              text: testPrivateArticle.text,
              isPublic: testPrivateArticle.isPublic
            })
            .end((err, res) => {
              expect(res).to.have.status(201);

              expect(res.body).to.have.property('article').be.a('object');
              validateArticle(res.body.article);
              expect(res.body.article).to.have.property('title').equal(testPrivateArticle.title);
              expect(res.body.article).to.have.property('text').equal(testPrivateArticle.text);
              expect(res.body.article).to.have.property('isPublic').equal(testPrivateArticle.isPublic);
              expect(res.body.article).to.have.property('image').be.a('string');

              expect(res.body.article).to.have.property('author').be.a('object');
              validateUser(res.body.article.author);
              expect(res.body.article).to.have.property('createdAt').be.a('string');
              expect(res.body.article).to.have.property('updatedAt').be.oneOf(['string', null]);

              done();
            });
        });
    });

    it('should NOT create article with empty data', done => {
      createTestUser()
        .then(user => {
          chai.request(server)
            .post('/api/articles')
            .set('Authorization', `Bearer ${user.token}`)
            .end((err, res) => {
              expect(res).to.have.status(400);

              done();
            });
        });
    });

    it('should NOT create article if no token provided', done => {
      chai.request(server)
        .post('/api/articles')
        .end((err, res) => {
          expect(res).to.have.status(401);

          done();
        });
    });
  });

  describe('/GET articles', () => {
    it('should get list of articles', done => {
      createTestArticles()
        .then(({ author }) => {
          chai.request(server)
            .get('/api/articles')
            .set('Authorization', `Bearer ${author.token}`)
            .end((err, res) => {
              expect(res).to.have.status(200);

              expect(res.body).to.have.property('articles').be.a('array');

              _.forEach(res.body.articles, article => {
                expect(article).be.a('object');
                validateArticle(article);
                expect(article).to.have.property('createdAt').be.a('string');
                expect(article).to.have.property('updatedAt').be.oneOf(['string', null]);

                expect(article).to.have.property('author').be.a('object');
                validateUser(article.author);
              });

              done();
            });
        });
    });

    it('should get only public articles if no token provided', done => {
      createTestArticles()
        .then(() => {
          chai.request(server)
            .get('/api/articles')
            .end((err, res) => {
              expect(res).to.have.status(200);

              expect(res.body).to.have.property('articles').be.a('array');

              _.forEach(res.body.articles, article => {
                expect(article).be.a('object');
                validateArticle(article);
                expect(article).to.have.property('isPublic').equal(true);
                expect(article).to.have.property('createdAt').be.a('string');
                expect(article).to.have.property('updatedAt').be.oneOf(['string', null]);

                expect(article).to.have.property('author').be.a('object');
                validateUser(article.author);
              });

              done();
            });
        });
    });
  });

  describe('/GET article', () => {
    it('should get public article', done => {
      createTestArticle(true)
        .then(({ article }) => {
          chai.request(server)
            .get(`/api/articles/${article._id}`)
            .end((err, res) => {
              expect(res).to.have.status(200);

              expect(res.body).to.have.property('article').be.a('object');
              validateArticle(res.body.article);
              expect(res.body.article).to.have.property('title').equal(article.title);
              expect(res.body.article).to.have.property('text').equal(article.text);
              expect(res.body.article).to.have.property('isPublic').equal(article.isPublic);
              expect(res.body.article).to.have.property('createdAt').be.a('string');
              expect(res.body.article).to.have.property('updatedAt').be.oneOf(['string', null]);

              expect(res.body.article).to.have.property('author').be.a('object');
              validateUser(res.body.article.author);

              done();
            });
        });
    });

    it('should get private article if token provided', done => {
      createTestArticle(false)
        .then(({ article, author }) => {
          chai.request(server)
            .get(`/api/articles/${article._id}`)
            .set('Authorization', `Bearer ${author.token}`)
            .end((err, res) => {
              expect(res).to.have.status(200);

              expect(res.body).to.have.property('article').be.a('object');
              validateArticle(res.body.article);
              expect(res.body.article).to.have.property('title').equal(article.title);
              expect(res.body.article).to.have.property('text').equal(article.text);
              expect(res.body.article).to.have.property('isPublic').equal(article.isPublic);
              expect(res.body.article).to.have.property('createdAt').be.a('string');
              expect(res.body.article).to.have.property('updatedAt').be.oneOf(['string', null]);

              expect(res.body.article).to.have.property('author').be.a('object');
              validateUser(res.body.article.author);

              done();
            });
        });
    });

    it('should NOT get private article if no token provided', done => {
      createTestArticle(false)
        .then(({ article }) => {
          chai.request(server)
            .get(`/api/articles/${article._id}`)
            .end((err, res) => {
              expect(res).to.have.status(403);

              done();
            });
        });
    });

    it('should NOT get article with not existing ID', done => {
      createTestArticle(true)
        .then(() => {
          chai.request(server)
            .get('/api/articles/not_existing_id')
            .end((err, res) => {
              expect(res).to.have.status(404);

              done();
            });
        });
    });
  });

  describe('/PATCH article', () => {
    it('should update article', done => {
      createTestArticle(true)
        .then(({ article, author }) => {
          chai.request(server)
            .patch(`/api/articles/${article._id}`)
            .set('Authorization', `Bearer ${author.token}`)
            .attach('image', testPublicArticle.image)
            .field({
              title: 'Updated public article',
              text: testPublicArticle.text,
              isPublic: testPublicArticle.isPublic
            })
            .end((err, res) => {
              expect(res).to.have.status(200);

              expect(res.body).to.have.property('article').be.a('object');
              validateArticle(res.body.article);
              expect(res.body.article).to.have.property('title').equal('Updated public article');
              expect(res.body.article).to.have.property('text').equal(testPublicArticle.text);
              expect(res.body.article).to.have.property('isPublic').equal(testPublicArticle.isPublic);
              expect(res.body.article).to.have.property('createdAt').be.a('string');
              expect(res.body.article).to.have.property('updatedAt').be.a('string');

              expect(res.body.article).to.have.property('author').be.a('object');
              validateUser(res.body.article.author);

              done();
            });
        });
    });

    it('should NOT update article with not existing ID', done => {
      createTestArticle(true)
        .then(({ author }) => {
          chai.request(server)
            .patch('/api/articles/not_existing_id')
            .set('Authorization', `Bearer ${author.token}`)
            .attach('image', testPrivateArticle.image)
            .field({
              title: testPrivateArticle.title,
              text: testPrivateArticle.text,
              isPublic: testPrivateArticle.isPublic
            })
            .end((err, res) => {
              expect(res).to.have.status(404);

              done();
            });
        });
    });

    it('should NOT update article if user is not author', done => {
      Promise.all([
        createTestUser({
          login: 'notAuthor',
          password: 'pass1234'
        }),
        createTestArticle(true)
      ])
        .then(([user, { article } ]) => {
          chai.request(server)
            .patch(`/api/articles/${article._id}`)
            .set('Authorization', `Bearer ${user.token}`)
            .attach('image', testPublicArticle.image)
            .field({
              title: 'Updated public article',
              text: testPublicArticle.text,
              isPublic: testPublicArticle.isPublic
            })
            .end((err, res) => {
              expect(res).to.have.status(403);

              done();
            });
        });
    });

    it('should NOT update article with empty data', done => {
      createTestArticle(true)
        .then(({ article, author }) => {
          chai.request(server)
            .patch(`/api/articles/${article._id}`)
            .set('Authorization', `Bearer ${author.token}`)
            .end((err, res) => {
              expect(res).to.have.status(400);

              done();
            });
        });
    });

    it('should NOT update article if no token provided', done => {
      createTestArticle(true)
        .then(({ article }) => {
          chai.request(server)
            .patch(`/api/articles/${article._id}`)
            .end((err, res) => {
              expect(res).to.have.status(401);

              done();
            });
        });
    });
  });

  describe('/DELETE article', () => {
    it('should delete article', done => {
      createTestArticle(true)
        .then(({ article, author }) => {
          chai.request(server)
            .delete(`/api/articles/${article._id}`)
            .set('Authorization', `Bearer ${author.token}`)
            .end((err, res) => {
              expect(res).to.have.status(200);

              done();
            });
        });
    });

    it('should NOT delete article with not existing ID', done => {
      createTestArticle(true)
        .then(({ author }) => {
          chai.request(server)
            .delete('/api/articles/not_existing_id')
            .set('Authorization', `Bearer ${author.token}`)
            .end((err, res) => {
              expect(res).to.have.status(404);

              done();
            });
        });
    });

    it('should NOT delete article if user is not author', done => {
      Promise.all([
        createTestUser({
          login: 'notAuthor',
          password: 'pass1234'
        }),
        createTestArticle(true)
      ])
        .then(([user, { article } ]) => {
          chai.request(server)
            .delete(`/api/articles/${article._id}`)
            .set('Authorization', `Bearer ${user.token}`)
            .end((err, res) => {
              expect(res).to.have.status(403);

              done();
            });
        });
    });

    it('should NOT delete article if no token provided', done => {
      createTestArticle(true)
        .then(({ article }) => {
          chai.request(server)
            .delete(`/api/articles/${article._id}`)
            .end((err, res) => {
              expect(res).to.have.status(401);

              done();
            });
        });
    });
  });
});
