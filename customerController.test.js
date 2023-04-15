const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/app');
const Customer = require('../src/models/customerModel');

describe('customerController', () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb://127.0.0.1:27017/e-commerce', { useNewUrlParser: true, useUnifiedTopology: true });
  });

  afterEach(async () => {
    await Customer.deleteMany();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  describe('GET /api/customers/:id', () => {
    it('should return 404 if customer ID is invalid', async () => {
      const res = await request(app).get('/api/customers/123');
      expect(res.status).toBe(404);
    });

    it('should return 404 if customer is not found', async () => {
      const res = await request(app).get('/api/customers/' + new mongoose.Types.ObjectId());
      expect(res.status).toBe(404);
    });

    it('should return customer if customer ID is valid', async () => {
      const customer = new Customer({
        name: 'John Doe',
        email: 'john@example.com',
        phone: '1234567890',
        address: '123 Main St',
        gender: 'male'
      });
      await customer.save();

      const res = await request(app).get('/api/customers/' + customer._id);
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('name', customer.name);
      expect(res.body).toHaveProperty('email', customer.email);
      expect(res.body).toHaveProperty('phone', customer.phone);
      expect(res.body).toHaveProperty('address', customer.address);
      expect(res.body).toHaveProperty('gender', customer.gender);
    });
  });

  describe('PUT /api/customers/:id', () => {
    

it('should return 400 if name is more than 50 characters', async () => {
  const customer = new Customer({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '1234567890',
    address: '123 Main St',
    gender: 'male'
  });
  await customer.save();

  const res = await request(app)
    .put('/api/customers/' + customer._id)
    .send({ name: 'J'.repeat(51) });

  expect(res.status).toBe(400);
});

it('should return 400 if email is not valid', async () => {
  const customer = new Customer({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '1234567890',
    address: '123 Main St',
    gender: 'male'
  });
  await customer.save();

  const res = await request(app)
    .put('/api/customers/' + customer._id)
    .send({ email: 'invalid_email' });

  expect(res.status).toBe(400);
});

it('should return 400 if phone is less than 10 characters', async () => {
  const customer = new Customer({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '1234567890',
    address: '123 Main St',
    gender: 'male'
  });
  await customer.save();

  const res = await request(app)
    .put('/api/customers/' + customer._id)
    .send({ phone: '123456789' });

  expect(res.status).toBe(400);
});

it('should return 400 if phone is more than 10 characters', async () => {
  const customer = new Customer({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '1234567890',
    address: '123 Main St',
    gender: 'male'
  });
  await customer.save();

  const res = await request(app)
    .put('/api/customers/' + customer._id)
    .send({ phone: '12345678901' });

  expect(res.status).toBe(400);
});

it('should return 400 if phone is not numeric', async () => {
  const customer = new Customer({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '1234567890',
    address: '123 Main St',
    gender: 'male'
  });
  await customer.save();

  const res = await request(app)
    .put('/api/customers/' + customer._id)
    .send({ phone: '1234abc678' });

  expect(res.status).toBe(400);
});

it('should return 400 if address is less than 10 characters', async () => {
    const customer = new Customer({
      name: 'John Doe',
      email: 'john@example.com',
      phone: '1234567890',
      address: '123 Main St',
      gender: 'male'
    });
    await customer.save();
    const res = await request(app).put('/api/customers/' + customer._id).send({ address: '123 Main' });
    expect(res.status).toBe(400);
});

it('should return 400 if gender is not male or female', async () => {
const customer = new Customer({
  name: 'John Doe',
  email: 'john@example.com',
  phone: '1234567890',
  address: '123 Main St',
  gender: 'male'
});
await customer.save();

const res = await request(app)
  .put('/api/customers/' + customer._id)
  .send({ gender: 'invalid_gender' });

expect(res.status).toBe(400);
});

it('should return 404 if customer is not found', async () => {
    const res = await request(app)
      .put('/api/customers/' + new mongoose.Types.ObjectId())
      .send({
        "name":"john",
        "email":"john@gmail.com",
        "phone":"9898989898",
        "address":"loream ipsum contwd les",
        "gender":"male"
      });

    expect(res.status).toBe(404);
    });
});

describe('PUT /api/customers/:id', () => {
  it('should update the customer if input is valid', async () => {
  const customer = new Customer({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '1234567890',
    address: '123 Main St',
    gender: 'male'
  });
  await customer.save();

  const res = await request(app)
    .put('/api/customers/' + customer._id)
    .send({ name: 'Jane Doe', email: 'jane@example.com',phone: '1234567890',
    address: '123 Main St',
    gender: 'male' });

  expect(res.status).toBe(200);
});
});

});

module.exports = app;
