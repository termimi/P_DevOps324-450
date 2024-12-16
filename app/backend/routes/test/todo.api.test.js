const request = require("supertest");
const router = require("express");
const userRouter = require("../index.js");
const UserModel = require("../../database/models/user.model");
const jsonwebtoken = require("jsonwebtoken");
const { key } = require('../../env/keys/index');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const { text } = require("body-parser");
const app = router();

app.use(cookieParser());
app.use(userRouter);

describe('Ajout d\'une todo', () => {

    beforeAll(async () => {
        // Hash le mot de passe et sauvegarde un utilisateur
        const hashedPassword = await bcrypt.hash("12345678", 8);
        user = new UserModel({
          name: "todotester",
          email: "123@gmail.com",
          password: hashedPassword,
          address: "tester 12",
          NPA: 12,
          place: "tester",
        });
        await user.save();
    
        // Générer un token valide
        token = jsonwebtoken.sign({}, key, {
          subject: user._id.toString(),
          expiresIn: "1h",
          algorithm: "RS256",
        });
    });
    
    it('devrait créer un nouvelle todo avec succès', async () => {
        const response = await request(app)
            .post('/api/todo/add/')
            .set("Cookie", `token=${token}`)
            .send({
                text: 'Todo 1',
            });
        expect(response.statusCode).toBe(200);
    });
});

describe('Suppression d\'une todo', () => {
    let todoId;
    beforeAll(async () => {
        const hashedPassword = await bcrypt.hash("12345678", 8);
        user = new UserModel({
          name: "todotester",
          email: "123@gmail.com",
          password: hashedPassword,
          address: "tester 12",
          NPA: 12,
          place: "tester",
        });
        await user.save();
    
        // Générer un token valide
        token = jsonwebtoken.sign({}, key, {
          subject: user._id.toString(),
          expiresIn: "1h",
          algorithm: "RS256",
        });

        // Ajoute une todo
        const response = await request(app)
            .post('/api/todo/add/')
            .set("Cookie", `token=${token}`)
            .send({
                text: 'Todo 1',
            });

        // Récupére les todos
        const responseFromGet = await request(app)
            .get('/api/todo/')
            .set("Cookie", `token=${token}`)

        todoId = responseFromGet.body[0]._id;
        console.log(todoId);  
    });

    it('devrait supprimer une todo de l\'utilisateur', async () => {
        const response = await request(app)
            .post(`/api/todo/${todoId}`)
            .set("Cookie", `token=${token}`);
        expect(response.statusCode).toBe(200);
    });
});

describe('Modification d\'une todo', () => {
    let todoId;
    beforeAll(async () => {
        const hashedPassword = await bcrypt.hash("12345678", 8);
        user = new UserModel({
          name: "todotester",
          email: "123@gmail.com",
          password: hashedPassword,
          address: "tester 12",
          NPA: 12,
          place: "tester",
        });
        await user.save();
    
        // Générer un token valide
        token = jsonwebtoken.sign({}, key, {
          subject: user._id.toString(),
          expiresIn: "1h",
          algorithm: "RS256",
        });

        // Ajoute une todo
        const response = await request(app)
            .post('/api/todo/add/')
            .set("Cookie", `token=${token}`)
            .send({
                text: 'Todo 1',
            });

        // Récupére les todos
        const responseFromGet = await request(app)
            .get('/api/todo/')
            .set("Cookie", `token=${token}`)

        todoId = responseFromGet.body[0]._id;
        console.log(todoId);  
    });
    it('devrait modifier une todo de l\'utilisateur', async () => {
        const response = await request(app)
            .patch(`/api/todo/${todoId}`)
            .set("Cookie", `token=${token}`)
            .send({
                text: 'Todo 2',
            });
        expect(response.statusCode).toBe(200);
    });
});