const request = require('supertest');
const app = require('../server.js');

describe('GET /api/get_products',()=>{
    it('return status 200 with an array',async()=>{
        const res = await request(app).get('/api/get_products?page=1&limit=5');

        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBe(5);
        expect(res.body[0]).toHaveProperty('id');
        expect(res.body[0]).toHaveProperty('value');
        expect(res.body[0]).toHaveProperty('type');
        expect(res.body[0]).toHaveProperty('image_url');
        expect(res.body[0]).toHaveProperty('price');
    });
});


describe('GET /api/search_products',()=>{
    it('returns status 200 with an array',async()=>{
        const res = await request(app).get('/api/search_products?value=A&type=All&minPrice=0&maxPrice=200');

        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);

        if(res.body.length>0)
        {
            expect(res.body[0]).toHaveProperty('id');
            expect(res.body[0]).toHaveProperty('value');
            expect(res.body[0]).toHaveProperty('type');
            expect(res.body[0]).toHaveProperty('image_url');
            expect(res.body[0]).toHaveProperty('price');
        }
    })
});