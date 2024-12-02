const request = require("supertest");
const router = require("express");
const userRouter = require("../index.js");

const app = router();
app.use(userRouter);

describe('POST /api/user', () => {
    jest.setTimeout(5000); // Augmente le délai ici
    it('devrait créer un nouvelle utilisateur avec succès', async () => {
        const response = await request(app)
            .post('/api/user/add/')
            .send({
                name:'John Doe',
                email: 'john.doe@gmail.com',
                password: "12345678"
            });
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({
            name: "John Doe",
            email: 'john.doe@gmail.com'
        });
    });
});

