const request = require('supertest');
const express = require('express');
const router = require('../index');
const bcrypt = require('bcrypt');
const UserModel = require('../../database/models/user.model')

const app = express();
app.use(express.json());
app.use(router);

//Supprime tout les users, afin d'avoir des données en ordre
beforeEach(async () => {
    await UserModel.deleteMany({});
  });

describe('Authentification', () => {

    it('Connexion user avec donnée valide', async () => {
        //Création d'un user de test
        const user = new UserModel({
          email: "User@gmail.com",
          password: await bcrypt.hash("Password", 10),
        });
        await user.save();

        const response = await request(app)
            .post('/api/auth')
            .send({ email: 'User@gmail.com', password: 'Password' });
            expect(response.status).toBe(200);
            expect(response.body.email).toBe('User@gmail.com');
            expect(response.body).toBeDefined();
            expect(response.header['set-cookie']).toBeDefined();
         
    });

    it('Connexion user avec donnée invalide', async () => {
        const response = await request(app)
            .post('/api/auth')
            .send({ email: 'errorUser@gmail.com', password: 'errorPassword' });

        expect(response.status).toBe(400);
        expect(response.body).toBe('Utilisateur non trouvé');
    });
});
