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
        console.log(response.data);
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
    jest.setTimeout(5000); // Augmente le délai si nécessaire

    let token; // Variable pour stocker le token d'un utilisateur valide

    // Avant chaque test, on va créer un utilisateur et récupérer son token pour pouvoir tester la suppression
    beforeAll(async () => {
        // Création d'un utilisateur fictif et génération d'un token
        const response = await request(app)
            .post('/api/user/add/')
            .send({
                name: 'Jane Doe',
                email: 'jane.doe@gmail.com',
                password: "12345678"
            });

        expect(response.statusCode).toBe(200);

        // Récupérer un token valide pour l'utilisateur créé (en supposant que tu as une route qui génère un token)
        token = response.body.token; // Adapte en fonction de ta réponse (par exemple, tu peux avoir un champ 'token')
    });

    it('devrait supprimer un utilisateur avec succès', async () => {
        const response = await request(app)
            .delete('/api/user/delete')
            .set('Cookie', `token=${token}`); // Simuler la présence du token dans les cookies

        // Vérifier que la réponse de la suppression est correcte
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeNull(); // La réponse doit être nulle selon ta logique

        // Vérifier que l'utilisateur n'existe plus dans la base de données
        const user = await UserModel.findById(response.body._id);
        expect(user).toBeNull(); // L'utilisateur doit avoir été supprimé
    });

    // Nettoyage après les tests si nécessaire (pour éviter de laisser des utilisateurs en base)
    afterAll(async () => {
        // Supprimer l'utilisateur (ou réinitialiser la base de données si nécessaire)
        await UserModel.deleteMany({ email: 'jane.doe@gmail.com' });
    });
});
