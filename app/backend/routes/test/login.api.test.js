const request = require("supertest");
const router = require("express");
const userRouter = require("../index.js");
const app = router();

app.use(userRouter);
describe('POST /api/user', () => {
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
            __v: response.body.__v,
            _id: response.body._id,
            name: "John Doe",
            email: 'john.doe@gmail.com'
        });
    });
    it('devrait afficher une erreur du à un manque de email', async () => {
        const response = await request(app)
            .post('/api/user/add/')
            .send({
                name:'John Doe',
                email: '',
                password: "12345678"
            });
        // Vérifier que le message d'erreur est lié à l'email manquant ou vide
        expect(response.statusCode).toBe(400);
    });
});

