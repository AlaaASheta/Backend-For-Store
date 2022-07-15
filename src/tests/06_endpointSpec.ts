import test from 'node:test';
import supertest from 'supertest';
import app from '../server';

const request = supertest(app);
const testToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJuYW1lIjoiQUxBQSIsImVtYWlsIjoiYWxhYWF0ZWZAZ21haWwuY29tIiwiaGFzaF9wYXNzd29yZCI6IiQyYiQxMCQydXl2THJFajk4WGQwSjV0bTBKUnUud1M0NlBNU0hDRkNQRmN3RUVON0QwbzJyZkxGOC5YaSJ9LCJpYXQiOjE2NTU3NTM2NDN9.cIxVgjsvPHCatSAJKvojICvR_SEG9S28o4Lry63Fhi0";
let userToken = "";

describe('Test endpoints responses', (): void => {
    it('get all users endpoint => pass', async (): Promise<void> => {
        const response = await request.get('/users').set('Authorization', 'Bearer ' + testToken);
        expect(response.status).toBe(200);
    });

    it('get user by id endpoint => pass', async (): Promise<void> => {
        const response = await request.get('/users/2').set('Authorization', 'Bearer ' + testToken);
        expect(response.status).toBe(200);
    });

    it('get all users endpoint => failed unauthorized', async (): Promise<void> => {
        const response = await request.get('/users').set('Authorization', 'Bearer ');
        expect(response.status).toBe(401);
    });

    it('get user by id endpoint => failed unauthorized', async (): Promise<void> => {
        const response = await request.get('/users/2').set('Authorization', 'Bearer ');
        expect(response.status).toBe(401);
    });

    it('post (create) user endpoint => pass', async (): Promise<void> => {
        const response = await request.post('/users').set('Content-type', 'application/json').send({
            name: 'Atef',
            email: 'atef@gmail.com',
            password: 'atefpassword'
        });
        expect(response.status).toBe(200);
    });

    it('user login endpoint => pass', async (): Promise<void> => {
        const response = await request.post('/users/login').set('Content-type', 'application/json').send({
            email: 'atef@gmail.com',
            password: 'atefpassword'
        });
        userToken = response.body;
        expect(response.status).toBe(200);
    });

    it('put (update) user endpoint => pass', async (): Promise<void> => {
        const response = await request.put('/users').set('Authorization', 'Bearer ' + userToken).set('Content-type', 'application/json').send({
            id: 4,
            name: 'Atef sheta',
            email: 'atef@gmail.com',
            password: 'atefpassword'
        });
        expect(response.status).toBe(200);
    });

    it('get all products endpoint => pass', async (): Promise<void> => {
        const response = await request.get('/products').set('Authorization', 'Bearer ' + testToken);
        expect(response.status).toBe(200);
    });

    it('get product by id endpoint => pass', async (): Promise<void> => {
        const response = await request.get('/products/2').set('Authorization', 'Bearer ' + testToken);
        expect(response.status).toBe(200);
    });

    it('post (create) product endpoint => pass', async (): Promise<void> => {
        const response = await request.post('/products').set('Authorization', 'Bearer ' + testToken).set('Content-type', 'application/json').send({
            name: 'rosa',
            description: 'perfume from zara 100ml',
            price: 500,
            category: 'perfumes'
        });
        expect(response.status).toBe(200);
    });

    it('put (update) product endpoint => pass', async (): Promise<void> => {
        const response = await request.put('/products').set('Authorization', 'Bearer ' + testToken).set('Content-type', 'application/json').send({
            id: 4,
            name: 'rosa',
            description: 'perfume from zara 100ml',
            price: 400,
            category: 'perfumes'
        });
        expect(response.status).toBe(200);
    });

    it('get all orders endpoint => pass', async (): Promise<void> => {
        const response = await request.get('/orders').set('Authorization', 'Bearer ' + testToken);
        expect(response.status).toBe(200);
    });

    it('get order by id endpoint => pass', async (): Promise<void> => {
        const response = await request.get('/orders/2').set('Authorization', 'Bearer ' + testToken);
        expect(response.status).toBe(200);
    });

    it('post (create) order endpoint => pass', async (): Promise<void> => {
        const response = await request.post('/orders').set('Authorization', 'Bearer ' + testToken).set('Content-type', 'application/json').send({
            status: 'new',
            user_id: '4'
        });
        expect(response.status).toBe(200);
    });

    it('put (update) order endpoint => pass', async (): Promise<void> => {
        const response = await request.put('/orders').set('Authorization', 'Bearer ' + testToken).set('Content-type', 'application/json').send({
            id: 4,
            status: 'complete',
            user_id: '4'
        });
        expect(response.status).toBe(200);
    });

    it("get user's order by user_id endpoint => pass", async (): Promise<void> => {
        const response = await request.get('/orders/4').set('Authorization', 'Bearer ' + userToken);
        expect(response.status).toBe(200);
    });

    it('get all order_products endpoint => pass', async (): Promise<void> => {
        const response = await request.get('/orderProducts').set('Authorization', 'Bearer ' + testToken);
        expect(response.status).toBe(200);
    });

    it('get order_product by id endpoint => pass', async (): Promise<void> => {
        const response = await request.get('/orderProducts/2').set('Authorization', 'Bearer ' + testToken);
        expect(response.status).toBe(200);
    });

    it('post (create) order_product endpoint => failed because order status != "active"', async (): Promise<void> => {
        const response = await request.post('/orderProducts').set('Authorization', 'Bearer ' + testToken).set('Content-type', 'application/json').send({
            order_id: '4',
            product_id: '4',
            quantity: 1,
            price: 400
        });
        expect(response.status).toBe(400);
    });

    it('post (create) order_product endpoint => pass', async (): Promise<void> => {
        await request.put('/orders').set('Authorization', 'Bearer ' + testToken).set('Content-type', 'application/json').send({
            id: 4,
            status: 'active',
            user_id: '4'
        });
        const response = await request.post('/orderProducts').set('Authorization', 'Bearer ' + testToken).set('Content-type', 'application/json').send({
            order_id: '4',
            product_id: '4',
            quantity: 1,
            price: 400
        });
        expect(response.status).toBe(200);
    });

    it('put (update) order_product endpoint => pass', async (): Promise<void> => {
        const response = await request.put('/orderProducts').set('Authorization', 'Bearer ' + testToken).set('Content-type', 'application/json').send({
            id: 6,
            order_id: '4',
            product_id: '4',
            quantity: 2,
            price: 500
        });
        expect(response.status).toBe(200);
    });

    it('get users id and email with orders id and status => pass', async (): Promise<void> => {
        const response = await request.get('/usersOrders').set('Authorization', 'Bearer ' + testToken);
        expect(response.status).toBe(200);
    });

    it('get list of products in descending order according to the number of times they are found in orders => pass', async (): Promise<void> => {
        const response = await request.get('/topOrderedProducts').set('Authorization', 'Bearer ' + testToken);
        expect(response.status).toBe(200);
    });

    it('delete order_product endpoint => pass', async (): Promise<void> => {
        const response = await request.delete('/orderProducts/6').set('Authorization', 'Bearer ' + testToken);
        expect(response.status).toBe(200);
    });

    it('delete product endpoint => pass', async (): Promise<void> => {
        const response = await request.delete('/products/4').set('Authorization', 'Bearer ' + testToken);
        expect(response.status).toBe(200);
    });

    it('delete order endpoint => pass', async (): Promise<void> => {
        const response = await request.delete('/orders/4').set('Authorization', 'Bearer ' + testToken);
        expect(response.status).toBe(200);
    });

    it('delete user endpoint => pass', async (): Promise<void> => {
        const response = await request.delete('/users/4').set('Authorization', 'Bearer ' + userToken);
        expect(response.status).toBe(200);
    });
});
