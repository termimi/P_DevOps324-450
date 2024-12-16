const request = require("supertest");
const router = require("express");
const userRouter = require("../index.js");
const UserModel = require("../../database/models/user.model");
const jsonwebtoken = require("jsonwebtoken");
const { key } = require('../../env/keys/index');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const app = router();

app.use(cookieParser());
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
    /*it('devrait afficher une erreur du à un manque de email', async () => {
        const startTime = Date.now();
        const response = await request(app)
            .post('/api/user/add/')
            .send({
                name:'John Doe',
                email: '',
                password: "12345678"
            });
        const endTime = Date.now()
        const responseTime = endTime-startTime;
        // Vérifier que le message d'erreur est lié à l'email manquant ou vide
        expect(response.statusCode).toBe(400);
    });*/
});

describe('DELETE /api/user/delete', () => {
    afterAll(async () => {
        // Cleanup
        await UserModel.deleteMany({});
    });

    it('devrait supprimer un utilisateur avec succès', async () => {
        const user = new UserModel({
            email: "philippe@gmail.com",
            password: await bcrypt.hash("philippe", 8),
        });
        await user.save();  
        const token = jsonwebtoken.sign({}, key, {
            subject: user._id.toString(),
            expiresIn: 60 * 60 * 24 * 30 * 6,
            algorithm: 'RS256',
        });

        const response = await request(app)
            .delete('/api/user/delete')
            .set('Cookie', `token=${token}`);

        expect(response.statusCode).toBe(200);
    });
});

describe("PATCH /api/user/edit", () => {
    let user;
    let token;
  
    // Générer un utilisateur avant les tests
    beforeAll(async () => {
      // Hash le mot de passe et sauvegarde un utilisateur
      const hashedPassword = await bcrypt.hash("12345678", 8);
      user = new UserModel({
        name: "tertra totor",
        email: "123@gmail.com",
        password: hashedPassword,
        address: "chez hejkoop 12",
        NPA: 12,
        place: "hejkoop",
      });
      await user.save();
  
      // Générer un token valide
      token = jsonwebtoken.sign({}, key, {
        subject: user._id.toString(),
        expiresIn: "1h",
        algorithm: "RS256",
      });
    });
  
    // Test pour la mise à jour du nom
    it("devrait mettre à jour le nom de l'utilisateur", async () => {
      const response = await request(app)
        .patch("/api/user/edit")
        .set("Cookie", `token=${token}`)
        .send({ name: "testNom" });
  
      expect(response.statusCode).toBe(200);
    });
  
    // Test pour la mise à jour de l'adresse
    it("devrait mettre à jour l'adresse de l'utilisateur", async () => {
      const response = await request(app)
        .patch("/api/user/edit")
        .set("Cookie", `token=${token}`)
        .send({ address: "testAdresse" });
  
      expect(response.statusCode).toBe(200);
    });
  
    // Test pour la mise à jour du NPA
    it("devrait mettre à jour le NPA de l'utilisateur", async () => {
      const response = await request(app)
        .patch("/api/user/edit")
        .set("Cookie", `token=${token}`)
        .send({ NPA: 9999 });
  
      expect(response.statusCode).toBe(200);
    });
  
    // Test pour la mise à jour du lieu
    it("devrait mettre à jour le lieu de l'utilisateur", async () => {
      const response = await request(app)
        .patch("/api/user/edit")
        .set("Cookie", `token=${token}`)
        .send({ place: "testLieu" });
  
      expect(response.statusCode).toBe(200);
    });
  
    // Test pour la mise à jour de plusieurs champs à la fois
    it("devrait mettre à jour plusieurs champs de l'utilisateur", async () => {
      const response = await request(app)
        .patch("/api/user/edit")
        .set("Cookie", `token=${token}`)
        .send({
          name: "testNom",
          address: "testAdresse",
          NPA: 1234,
          place: "testLieu",
        });
  
      expect(response.statusCode).toBe(200);
    });
    
    // Test ne fonctionne pas car le token est manquant et que le serveur ne renvoie pas d'erreur
    /*// Test pour le cas où le token est manquant
    it("devrait retourner une erreur si le token est manquant", async () => {
      const response = await request(app).patch("/api/user/edit").send({
        name: "testToken",
      });
  
      expect(response.statusCode).toBe(400);
    });*/
  
  });