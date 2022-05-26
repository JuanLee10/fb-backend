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

test('GET Listing', async () => {
  await request.get('/v0/Listing')
    .set('Authorization', 'bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
      'eyJlbWFpbCI6Imp1YW5sZWVAZ21haWwuY29tIiwicm9s' +
      'ZSI6ImFkbWluIiwiaWF0IjoxNjM4NjcyMDI0LCJleHAiOjE2NDA' +
      '0NzIwMjR9.B98-dZ7OlqbYncMfhnrUaBQoCq-qHPA1Y6f3n8u7cdc')
    .expect(200)
    .expect('Content-Type', /json/)
    .then((res) => {
      expect(res).toBeDefined();
      expect(res.body).toBeDefined();
      expect(res.body.length).toBe(56);
      expect(res.body[0].content)
        .toStrictEqual({
          'Category': 'Vehicles',
          'Location': 'San Jose, CA',
          'image': 'https://res.cloudinary.com/dfjqgstje/image/' +
            'upload/v1638399746/maxresdefault_ou9lch.jpg',
          'price': '200000',
          'title': 'Expensive Car',
        });
    });
});

test('GET /display/{id}', async () => {
  await request.get('/v0/display/28675031-f153-46bb-b6fb-3f6507a393e1')
    .set('Authorization', 'bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
      'eyJlbWFpbCI6Imp1YW5sZWVAZ21haWwuY29tIiwicm9s' +
      'ZSI6ImFkbWluIiwiaWF0IjoxNjM4NjcyMDI0LCJleHAiOjE2NDA' +
      '0NzIwMjR9.B98-dZ7OlqbYncMfhnrUaBQoCq-qHPA1Y6f3n8u7cdc')
    .expect(200)
    .expect('Content-Type', /json/)
    .then((res) => {
      expect(res).toBeDefined();
      expect(res.body).toBeDefined();
      expect(res.body.length).toBe(0);
    });
});

test('GET /search1', async () => {
  await request.get('/v0/search?search=medium&category=Vehicles')
    .set('Authorization', 'bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
      'eyJlbWFpbCI6Imp1YW5sZWVAZ21haWwuY29tIiwicm9s' +
      'ZSI6ImFkbWluIiwiaWF0IjoxNjM4NjcyMDI0LCJleHAiOjE2NDA' +
      '0NzIwMjR9.B98-dZ7OlqbYncMfhnrUaBQoCq-qHPA1Y6f3n8u7cdc')
    .expect(200)
    .expect('Content-Type', /json/)
    .then((res) => {
      expect(res).toBeDefined();
      expect(res.body).toBeDefined();
      expect(res.body.length).toBe(1);
      expect(res.body[0].content).toStrictEqual({
        'image': 'https://res.cloudinary.com/dfjqgstje/image/upload/v16383' +
          '99743/most-expensive-new-cars-ever_pzflcz.webp',
        'price': '50000',
        'title': 'Medium Car',
        'Category': 'Vehicles',
        'Location': 'Santa Cruz, CA',
      });
    });
});

test('GET /search2', async () => {
  await request.get('/v0/search?category=Vehicles')
    .set('Authorization', 'bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
      'eyJlbWFpbCI6Imp1YW5sZWVAZ21haWwuY29tIiwicm9s' +
      'ZSI6ImFkbWluIiwiaWF0IjoxNjM4NjcyMDI0LCJleHAiOjE2NDA' +
      '0NzIwMjR9.B98-dZ7OlqbYncMfhnrUaBQoCq-qHPA1Y6f3n8u7cdc')
    .expect(200)
    .expect('Content-Type', /json/)
    .then((res) => {
      expect(res).toBeDefined();
      expect(res.body).toBeDefined();
      expect(res.body.length).toBe(3);
    });
});

test('GET /search3', async () => {
  await request.get('/v0/search?search=medium')
    .set('Authorization', 'bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
      'eyJlbWFpbCI6Imp1YW5sZWVAZ21haWwuY29tIiwicm9s' +
      'ZSI6ImFkbWluIiwiaWF0IjoxNjM4NjcyMDI0LCJleHAiOjE2NDA' +
      '0NzIwMjR9.B98-dZ7OlqbYncMfhnrUaBQoCq-qHPA1Y6f3n8u7cdc')
    .expect(200)
    .expect('Content-Type', /json/)
    .then((res) => {
      expect(res).toBeDefined();
      expect(res.body).toBeDefined();
      expect(res.body.length).toBe(18);
    });
});

test('GET /search4', async () => {
  await request.get('/v0/search')
    .set('Authorization', 'bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
      'eyJlbWFpbCI6Imp1YW5sZWVAZ21haWwuY29tIiwicm9s' +
      'ZSI6ImFkbWluIiwiaWF0IjoxNjM4NjcyMDI0LCJleHAiOjE2NDA' +
      '0NzIwMjR9.B98-dZ7OlqbYncMfhnrUaBQoCq-qHPA1Y6f3n8u7cdc')
    .expect(200)
    .expect('Content-Type', /json/)
    .then((res) => {
      expect(res).toBeDefined();
      expect(res.body).toBeDefined();
      expect(res.body.length).toBe(56);
    });
});

test('GET /searchSub', async () => {
  await request.get('/v0/searchSub?search=medium' +
    '&subCategory=Powersport%20Vehicles')
    .set('Authorization', 'bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
      'eyJlbWFpbCI6Imp1YW5sZWVAZ21haWwuY29tIiwicm9s' +
      'ZSI6ImFkbWluIiwiaWF0IjoxNjM4NjcyMDI0LCJleHAiOjE2NDA' +
      '0NzIwMjR9.B98-dZ7OlqbYncMfhnrUaBQoCq-qHPA1Y6f3n8u7cdc')
    .expect(200)
    .expect('Content-Type', /json/)
    .then((res) => {
      expect(res).toBeDefined();
      expect(res.body).toBeDefined();
      expect(res.body.length).toBe(1);
      expect(res.body[0].content).toStrictEqual({
        'image': 'https://res.cloudinary.com/dfjqgstje/image/upload/' +
          'v1638399743/most-expensive-new-cars-ever_pzflcz.webp',
        'price': '50000',
        'title': 'Medium Car',
        'Category': 'Vehicles',
        'Location': 'Santa Cruz, CA',
      });
    });
});

test('GET /searchSub1', async () => {
  await request.get('/v0/searchSub?search=medium')
    .set('Authorization', 'bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
      'eyJlbWFpbCI6Imp1YW5sZWVAZ21haWwuY29tIiwicm9s' +
      'ZSI6ImFkbWluIiwiaWF0IjoxNjM4NjcyMDI0LCJleHAiOjE2NDA' +
      '0NzIwMjR9.B98-dZ7OlqbYncMfhnrUaBQoCq-qHPA1Y6f3n8u7cdc')
    .expect(200)
    .expect('Content-Type', /json/)
    .then((res) => {
      expect(res).toBeDefined();
      expect(res.body).toBeDefined();
      expect(res.body.length).toBe(18);
      expect(res.body[0].content).toStrictEqual({
        'image': 'https://res.cloudinary.com/dfjqgstje/image/' +
          'upload/v1638399743/most-expensive-new-cars-ever_pzflcz.webp',
        'price': '50000',
        'title': 'Medium Car',
        'Category': 'Vehicles',
        'Location': 'Santa Cruz, CA',
      });
    });
});

test('GET /searchSub2', async () => {
  await request.get('/v0/searchSub?subCategory=Powersport%20Vehicles')
    .set('Authorization', 'bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
      'eyJlbWFpbCI6Imp1YW5sZWVAZ21haWwuY29tIiwicm9s' +
      'ZSI6ImFkbWluIiwiaWF0IjoxNjM4NjcyMDI0LCJleHAiOjE2NDA' +
      '0NzIwMjR9.B98-dZ7OlqbYncMfhnrUaBQoCq-qHPA1Y6f3n8u7cdc')
    .expect(200)
    .expect('Content-Type', /json/)
    .then((res) => {
      expect(res).toBeDefined();
      expect(res.body).toBeDefined();
      expect(res.body.length).toBe(1);
      expect(res.body[0].content).toStrictEqual({
        'image': 'https://res.cloudinary.com/dfjqgstje/image/upload' +
          '/v1638399743/most-expensive-new-cars-ever_pzflcz.webp',
        'price': '50000',
        'title': 'Medium Car',
        'Category': 'Vehicles',
        'Location': 'Santa Cruz, CA',
      });
    });
});

test('GET /category', async () => {
  await request.get('/v0/category')
    .set('Authorization', 'bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
      'eyJlbWFpbCI6Imp1YW5sZWVAZ21haWwuY29tIiwicm9s' +
      'ZSI6ImFkbWluIiwiaWF0IjoxNjM4NjcyMDI0LCJleHAiOjE2NDA' +
      '0NzIwMjR9.B98-dZ7OlqbYncMfhnrUaBQoCq-qHPA1Y6f3n8u7cdc')
    .expect(200)
    .expect('Content-Type', /json/)
    .then((res) => {
      expect(res).toBeDefined();
      expect(res.body).toBeDefined();
      expect(res.body.length).toBe(19);
      expect(res.body[1].filters).toStrictEqual({
        'Price': [
          'MinToMax',
        ],
        'Sort By': [
          'select',
          'Price: Lowest first',
          'Price: Highest first',
        ],
      });
    });
});

test('GET /location', async () => {
  await request.get('/v0/location?search=Medium' +
    '&subCategory=Powersport%20Vehicles&category=Vehicles&location' +
    '=Santa%20Cruz%2C%20CA')
    .set('Authorization', 'bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
      'eyJlbWFpbCI6Imp1YW5sZWVAZ21haWwuY29tIiwicm9s' +
      'ZSI6ImFkbWluIiwiaWF0IjoxNjM4NjcyMDI0LCJleHAiOjE2NDA' +
      '0NzIwMjR9.B98-dZ7OlqbYncMfhnrUaBQoCq-qHPA1Y6f3n8u7cdc')
    .expect(200)
    .expect('Content-Type', /json/)
    .then((res) => {
      expect(res).toBeDefined();
      expect(res.body).toBeDefined();
      expect(res.body.length).toBe(1);
      expect(res.body[0].content).toStrictEqual({
        'image': 'https://res.cloudinary.com/dfjqgstje/image/upload/' +
          'v1638399743/most-expensive-new-cars-ever_pzflcz.webp',
        'price': '50000',
        'title': 'Medium Car',
        'Category': 'Vehicles',
        'Location': 'Santa Cruz, CA',
      });
    });
});

test('GET /location1', async () => {
  await request.get('/v0/location?subCategory=Powersport%20' +
    'Vehicles&category=Vehicles&location=Santa%20Cruz%2C%20CA')
    .set('Authorization', 'bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
      'eyJlbWFpbCI6Imp1YW5sZWVAZ21haWwuY29tIiwicm9s' +
      'ZSI6ImFkbWluIiwiaWF0IjoxNjM4NjcyMDI0LCJleHAiOjE2NDA' +
      '0NzIwMjR9.B98-dZ7OlqbYncMfhnrUaBQoCq-qHPA1Y6f3n8u7cdc')
    .expect(200)
    .expect('Content-Type', /json/)
    .then((res) => {
      expect(res).toBeDefined();
      expect(res.body).toBeDefined();
      expect(res.body.length).toBe(1);
      expect(res.body[0].content).toStrictEqual({
        'image': 'https://res.cloudinary.com/dfjqgstje/image/upload/v1638399743' +
          '/most-expensive-new-cars-ever_pzflcz.webp',
        'price': '50000',
        'title': 'Medium Car',
        'Category': 'Vehicles',
        'Location': 'Santa Cruz, CA',
      });
    });
});

test('GET /location2', async () => {
  await request.get('/v0/location?&search=Medium&location=Santa%20Cruz%2C%20CA')
    .set('Authorization', 'bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
      'eyJlbWFpbCI6Imp1YW5sZWVAZ21haWwuY29tIiwicm9s' +
      'ZSI6ImFkbWluIiwiaWF0IjoxNjM4NjcyMDI0LCJleHAiOjE2NDA' +
      '0NzIwMjR9.B98-dZ7OlqbYncMfhnrUaBQoCq-qHPA1Y6f3n8u7cdc')
    .expect(200)
    .expect('Content-Type', /json/)
    .then((res) => {
      expect(res).toBeDefined();
      expect(res.body).toBeDefined();
      expect(res.body.length).toBe(18);
      expect(res.body[0].content).toStrictEqual({
        'image': 'https://res.cloudinary.com/dfjqgstje/image/upload/v1638399743/most-expensive-new-cars-ever_pzflcz.webp',
        'price': '50000',
        'title': 'Medium Car',
        'Category': 'Vehicles',
        'Location': 'Santa Cruz, CA',
      });
    });
});

test('GET /location3', async () => {
  await request.get('/v0/location?&location=Santa%20Cruz%2C%20CA')
    .set('Authorization', 'bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
      'eyJlbWFpbCI6Imp1YW5sZWVAZ21haWwuY29tIiwicm9s' +
      'ZSI6ImFkbWluIiwiaWF0IjoxNjM4NjcyMDI0LCJleHAiOjE2NDA' +
      '0NzIwMjR9.B98-dZ7OlqbYncMfhnrUaBQoCq-qHPA1Y6f3n8u7cdc')
    .expect(200)
    .expect('Content-Type', /json/)
    .then((res) => {
      expect(res).toBeDefined();
      expect(res.body).toBeDefined();
      expect(res.body.length).toBe(37);
      expect(res.body[0].content).toStrictEqual({
        'image': 'https://res.cloudinary.com/dfjqgstje/image/upload/v1638399743/most-expensive-new-cars-ever_pzflcz.webp',
        'price': '50000',
        'title': 'Medium Car',
        'Category': 'Vehicles',
        'Location': 'Santa Cruz, CA',
      });
    });
});

test('GET /location4', async () => {
  await request.get('/v0/location?&location=Santa%20Cruzz%2C%20CA')
    .set('Authorization', 'bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
      'eyJlbWFpbCI6Imp1YW5sZWVAZ21haWwuY29tIiwicm9s' +
      'ZSI6ImFkbWluIiwiaWF0IjoxNjM4NjcyMDI0LCJleHAiOjE2NDA' +
      '0NzIwMjR9.B98-dZ7OlqbYncMfhnrUaBQoCq-qHPA1Y6f3n8u7cdc')
    .expect(404);
});

test('GET /specificFilter1', async () => {
  await request.get('/v0/specificFilter?category=Vehicles&subCategory=' +
    'Powersport%20Vehicles&minPrice=10&maxPrice=100000')
    .set('Authorization', 'bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
      'eyJlbWFpbCI6Imp1YW5sZWVAZ21haWwuY29tIiwicm9s' +
      'ZSI6ImFkbWluIiwiaWF0IjoxNjM4NjcyMDI0LCJleHAiOjE2NDA' +
      '0NzIwMjR9.B98-dZ7OlqbYncMfhnrUaBQoCq-qHPA1Y6f3n8u7cdc')
    .expect(200)
    .expect('Content-Type', /json/)
    .then((res) => {
      expect(res).toBeDefined();
      expect(res.body).toBeDefined();
      expect(res.body.length).toBe(1);
      expect(res.body[0].content).toStrictEqual({
        'image': 'https://res.cloudinary.com/dfjqgstje/image/upload/v1638399743/most-expensive-new-cars-ever_pzflcz.webp',
        'price': '50000',
        'title': 'Medium Car',
        'Category': 'Vehicles',
        'Location': 'Santa Cruz, CA',
      });
    });
});

test('GET /specificFilter2', async () => {
  await request.get(`/v0/specificFilter?category=Vehicles&subCategory=
    Powersport%20Vehicles&minPrice=100000&maxPrice=10`)
    .set('Authorization', 'bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
      'eyJlbWFpbCI6Imp1YW5sZWVAZ21haWwuY29tIiwicm9s' +
      'ZSI6ImFkbWluIiwiaWF0IjoxNjM4NjcyMDI0LCJleHAiOjE2NDA' +
      '0NzIwMjR9.B98-dZ7OlqbYncMfhnrUaBQoCq-qHPA1Y6f3n8u7cdc')
    .expect(404);
});

test('GET /specificFilter3', async () => {
  await request.get('/v0/specificFilter?category=Vehicles&subCategory' +
    '=Powersport%20Vehicles&minPrice=10')
    .set('Authorization', 'bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
      'eyJlbWFpbCI6Imp1YW5sZWVAZ21haWwuY29tIiwicm9s' +
      'ZSI6ImFkbWluIiwiaWF0IjoxNjM4NjcyMDI0LCJleHAiOjE2NDA' +
      '0NzIwMjR9.B98-dZ7OlqbYncMfhnrUaBQoCq-qHPA1Y6f3n8u7cdc')
    .expect(200)
    .then((res) => {
      expect(res).toBeDefined();
      expect(res.body).toBeDefined();
      expect(res.body.length).toBe(1);
      expect(res.body[0].content).toStrictEqual({
        'image': 'https://res.cloudinary.com/dfjqgstje/image/upload/v1638399743/most-expensive-new-cars-ever_pzflcz.webp',
        'price': '50000',
        'title': 'Medium Car',
        'Category': 'Vehicles',
        'Location': 'Santa Cruz, CA',
      });
    });
});

test('GET /specificFilter4', async () => {
  await request.get(`/v0/specificFilter?category=Vehicles&subCategory=
    Power%20sport%20Vehicles&maxPrice=10`)
    .set('Authorization', 'bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
      'eyJlbWFpbCI6Imp1YW5sZWVAZ21haWwuY29tIiwicm9s' +
      'ZSI6ImFkbWluIiwiaWF0IjoxNjM4NjcyMDI0LCJleHAiOjE2NDA' +
      '0NzIwMjR9.B98-dZ7OlqbYncMfhnrUaBQoCq-qHPA1Y6f3n8u7cdc')
    .expect(200)
    .then((res) => {
      expect(res).toBeDefined();
      expect(res.body).toBeDefined();
      expect(res.body.length).toBe(0);
    });
});


test('GET /specificFilter5', async () => {
  await request.get(`/v0/specificFilter?category=
    Vehicles&maxPrice=1000&minPrice=`)
    .set('Authorization', 'bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
      'eyJlbWFpbCI6Imp1YW5sZWVAZ21haWwuY29tIiwicm9s' +
      'ZSI6ImFkbWluIiwiaWF0IjoxNjM4NjcyMDI0LCJleHAiOjE2NDA' +
      '0NzIwMjR9.B98-dZ7OlqbYncMfhnrUaBQoCq-qHPA1Y6f3n8u7cdc')
    .expect(400);
});
test('GET /specificFilter6', async () => {
  await request.get(`/v0/specificFilter?category=Vehicles&maxPrice=10
    &minPrice=5`)
    .set('Authorization', 'bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
      'eyJlbWFpbCI6Imp1YW5sZWVAZ21haWwuY29tIiwicm9s' +
      'ZSI6ImFkbWluIiwiaWF0IjoxNjM4NjcyMDI0LCJleHAiOjE2NDA' +
      '0NzIwMjR9.B98-dZ7OlqbYncMfhnrUaBQoCq-qHPA1Y6f3n8u7cdc')
    .expect(200)
    .then((res) => {
      expect(res).toBeDefined();
      expect(res.body).toBeDefined();
      expect(res.body.length).toBe(0);
    });
});

const newUser = {
  email: 'jame@gmail.com',
  firstName: 'asd',
  lastName: 'asd',
  password: '1223',
  phone: '213213213',
};

test('POST /insertUser', async () => {
  await request.post('/v0/insertUser')
    .set('Authorization', 'bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
      'eyJlbWFpbCI6Imp1YW5sZWVAZ21haWwuY29tIiwicm9s' +
      'ZSI6ImFkbWluIiwiaWF0IjoxNjM4NjcyMDI0LCJleHAiOjE2NDA' +
      '0NzIwMjR9.B98-dZ7OlqbYncMfhnrUaBQoCq-qHPA1Y6f3n8u7cdc')
    .send(newUser)
    .expect(200)
    .expect('Content-Type', /json/)
    .then((res) => {
      expect(res).toBeDefined();
      expect(res.body).toBeDefined();
    });
});

const userInfo = {
  email: 'juanlee@gmail.com',
  password: 'passwordtest',
};

test('POST /v0/authenticate ', async () => {
  await request.post('/authenticate')
    .set('Authorization', 'bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
      'eyJlbWFpbCI6Imp1YW5sZWVAZ21haWwuY29tIiwicm9s' +
      'ZSI6ImFkbWluIiwiaWF0IjoxNjM4NjcyMDI0LCJleHAiOjE2NDA' +
      '0NzIwMjR9.B98-dZ7OlqbYncMfhnrUaBQoCq-qHPA1Y6f3n8u7cdc')
    .send(userInfo)
    .expect(200)
    .expect('Content-Type', /json/)
    .then((res) => {
      expect(res).toBeDefined();
      expect(res.body).toBeDefined();
    });
});

const userInfo1 = {
  email: 'juanlee@gmail.com',
  password: 'monkey',
};

test('POST /v0/authenticate fail', async () => {
  await request.post('/authenticate')
    .set('Authorization', 'bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
      'eyJlbWFpbCI6Imp1YW5sZWVAZ21haWwuY29tIiwicm9s' +
      'ZSI6ImFkbWluIiwiaWF0IjoxNjM4NjcyMDI0LCJleHAiOjE2NDA' +
      '0NzIwMjR9.B98-dZ7OlqbYncMfhnrUaBQoCq-qHPA1Y6f3n8u7cdc')
    .send(userInfo1)
    .expect(401)
    .expect('Content-Type', 'text/html; charset=utf-8')
    .then((res) => {
      expect(res).toBeDefined();
      expect(res.body).toBeDefined();
    });
});

test('POST /v0/check', async () => {
  await request.post('/check')
    .expect(401)
    .expect('Content-Type', 'text/plain; charset=utf-8')
    .then((res) => {
      expect(res).toBeDefined();
      expect(res.body).toBeDefined();
    });
});

test('POST /v0/check', async () => {
  await request.post('/check')
    .set('Authorization', 'bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
      'eyJlbWFpbCI6Imp1YW5sZWVAZ21haWwuY29tIiwicm9s' +
      'ZSI6ImFkbWluIiwiaWF0IjoxNjM4NjcyMDI0LCJleHAiOjE2NDA' +
      '0NzIwMjR9.B98-dZ7OlqbYncMfhnrUaBQoCq-qHPA1f3n8u7cdc')
    .expect(403)
    .expect('Content-Type', 'text/plain; charset=utf-8')
    .then((res) => {
      expect(res).toBeDefined();
      expect(res.body).toBeDefined();
    });
});

test('GET /v0/replies', async () => {
  await request.get('/v0/replies/28675031-f153-46bb-b6fb-3f6507a393e1')
    .set('Authorization', 'bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
      'eyJlbWFpbCI6Imp1YW5sZWVAZ21haWwuY29tIiwicm9s' +
      'ZSI6ImFkbWluIiwiaWF0IjoxNjM4NjcyMDI0LCJleHAiOjE2NDA' +
      '0NzIwMjR9.B98-dZ7OlqbYncMfhnrUaBQoCq-qHPA1Y6f3n8u7cdc')
    .expect(200)
    .expect('Content-Type', /json/)
    .then((res) => {
      expect(res).toBeDefined();
      expect(res.body).toBeDefined();
    });
});