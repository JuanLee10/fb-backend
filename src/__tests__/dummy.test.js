const supertest = require('supertest');
const http = require('http');

const db = require('./db');
const app = require('../app');

let server;

beforeAll(() => {
  server = http.createServer(app);
  server.listen();
  request = supertest(server);
  return db.reset();
});

afterAll((done) => {
  server.close(done);
});

test('GET Invalid URL', async () => {
  await request.get('/v0/so-not-a-real-end-point-ba-bip-de-doo-da/')
    .expect(404);
});

test('GET Dummy', async () => {
  await request.get('/v0/dummy')
    .expect(200)
    .set('Authorization', 'bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
    'eyJlbWFpbCI6Imp1YW5sZWVAZ21haWwuY29tIiwicm9s' +
    'ZSI6ImFkbWluIiwiaWF0IjoxNjM4NjcyMDI0LCJleHAiOjE2NDA' +
    '0NzIwMjR9.B98-dZ7OlqbYncMfhnrUaBQoCq-qHPA1Y6f3n8u7cdc')
    .expect('Content-Type', /json/)
    .then((res) => {
      expect(res).toBeDefined();
      expect(res.body).toBeDefined();
      expect(res.body.message).toBeDefined();
      expect(res.body.message.search(/Hello CSE183/)).toEqual(0);
      expect(res.body.message.search(/Database created/))
        .toBeGreaterThan(60);
    });
});