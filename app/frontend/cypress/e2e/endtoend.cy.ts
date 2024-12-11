
  let email = `testemail${Date.now()}@gmail.com`

describe('Test de la création de compte', () => {
  it('Champs vide (Erreur)', () => {

    cy.visit('http://localhost:4173/register');

    cy.get('button[type="submit"]').click();

    cy.contains('Vous devez renseigner ce champ');
    cy.contains('Vous devez renseigner ce champ');
    cy.contains('Vous devez renseigner ce champ');
  });


  it('Entrer format email incorrect (Erreur)', () => {

    cy.visit('http://localhost:4173/register');

    cy.get('[name="email"]').type("testemail.com");
    cy.get('[name="password"]').type('test2024#@123');
    cy.get('[name="confirmation"]').type('test2020#@123');

    cy.get('button[type="submit"]').click();

    cy.contains('Format email incorrect');
  });


  it('Entrer mot de passe format incorrect (Erreur)', () => {

    cy.visit('http://localhost:4173/register');

    cy.get('[name="email"]').type(email);
    cy.get('[name="password"]').type('test');
    cy.get('[name="confirmation"]').type('test');

    cy.get('button[type="submit"]').click();

    cy.contains('Le mot de passe doit faire au moins 5 caractères');
  });


  it('Entrer mot de passe différent (Erreur)', () => {

    cy.visit('http://localhost:4173/register');

    cy.get('[name="email"]').type(email);
    cy.get('[name="password"]').type('test2024#@123');
    cy.get('[name="confirmation"]').type('test2020#@123');

    cy.get('button[type="submit"]').click();

    cy.contains('Les mots de passe ne correspondent pas');
  });


  it('Entrer mot de passe différent & incorrect (Erreur)', () => {

    cy.visit('http://localhost:4173/register');

    cy.get('[name="email"]').type(email);
    cy.get('[name="password"]').type('test');
    cy.get('[name="confirmation"]').type('test2020#@123');

    cy.get('button[type="submit"]').click();


    cy.contains('Le mot de passe doit faire au moins 5 caractères');
    cy.contains('Les mots de passe ne correspondent pas');
  });


  it('Erreur sur tout les champs (Erreur)', () => {

    cy.visit('http://localhost:4173/register');

    cy.get('[name="email"]').type("testemail.com");
    cy.get('[name="password"]').type('test');
    cy.get('[name="confirmation"]').type('test2020#@123');

    cy.get('button[type="submit"]').click();

    cy.contains('Format email incorrect');
    cy.contains('Le mot de passe doit faire au moins 5 caractères');
    cy.contains('Les mots de passe ne correspondent pas');
  });


  it('Création compte déja éxistant (Erreur)', () => {

    cy.visit('http://localhost:4173/register');

    cy.get('[name="email"]').type("testemail@gmail.com");
    cy.get('[name="password"]').type('test2020#@123');
    cy.get('[name="confirmation"]').type('test2020#@123');

    cy.get('button[type="submit"]').click();

    cy.visit('http://localhost:4173/register');
    cy.get('[name="email"]').type("testemail@gmail.com");
    cy.get('[name="password"]').type('test2020#@123');
    cy.get('[name="confirmation"]').type('test2020#@123');

    cy.get('button[type="submit"]').click();

    cy.contains('Un compte avec cet email exist déjà!');
  });

  it('Entrer d information dans les champs (Création du compte)', () => {

    cy.visit('http://localhost:4173/register');

    cy.get('[name="email"]').type(email);
    cy.get('[name="password"]').type('test2024#@123');
    cy.get('[name="confirmation"]').type('test2024#@123');

    cy.get('button[type="submit"]').click();

    cy.url().should('include', '/login');
  });
});



describe('Test de la connexion et déconnexion', () => {

  it('Champs vide (Erreur)', () => {

    cy.visit('http://localhost:4173/login');

    cy.get('button[type="submit"]').click();

    cy.contains('Vous devez renseigner ce champ');
    cy.contains('Vous devez renseigner ce champ');
  });


  it('Champs email incorrect (Erreur)', () => {

    cy.visit('http://localhost:4173/login');

    cy.get('[name="email"]').type("emailtest");
    cy.get('[name="password"]').type("test2024#@123");

    cy.get('button[type="submit"]').click();

    cy.contains('Format email incorrect');
  });

  it('Utilisateur inéxistant (Erreur)', () => {

    cy.visit('http://localhost:4173/login');

    cy.get('[name="email"]').type("jean2@gmail.com");
    cy.get('[name="password"]').type("tes@123");

    cy.get('button[type="submit"]').click();

    cy.contains('Utilisateur non trouvé');
  });

  it('Information utilisateur incorrect (Erreur)', () => {

    cy.visit('http://localhost:4173/login');

    cy.get('[name="email"]').type(email);
    cy.get('[name="password"]').type("test#@123");

    cy.get('button[type="submit"]').click();

    cy.contains('Mauvais email ou mot de passe!');
  });


  it('Entrer d information dans les champs (Connexion)', () => {

    cy.visit('http://localhost:4173/login');

    cy.get('[name="email"]').type(email);
    cy.get('[name="password"]').type('test2024#@123');

    cy.get('button[type="submit"]').click();

    cy.url().should('include', '/');
  });

  it('Déconnexion du profil (Déconnexion)', () => {
  
    cy.get('.profile-menu').click();

    cy.contains('Déconnection').click();
  });


});
