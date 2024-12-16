
let email = `testemail${Date.now()}@gmail.com`

describe('Test de la création de compte', () => {
  it('Champs vide (Erreur)', () => {

    cy.visit('http://localhost:4173/register');

    cy.get('button[type="submit"]').click();

    cy.contains('Vous devez renseigner ce champ').should('be.visible');
    cy.contains('Vous devez renseigner ce champ').should('be.visible');
    cy.contains('Vous devez renseigner ce champ').should('be.visible');
  });


  it('Entrer format email incorrect (Erreur)', () => {

    cy.visit('http://localhost:4173/register');

    cy.get('[name="email"]').type("testemail.com");
    cy.get('[name="password"]').type('test2024#@123');
    cy.get('[name="confirmation"]').type('test2020#@123');

    cy.get('button[type="submit"]').click();

    cy.contains('Format email incorrect').should('be.visible');
  });


  it('Entrer mot de passe format incorrect (Erreur)', () => {

    cy.visit('http://localhost:4173/register');

    cy.get('[name="email"]').type(email);
    cy.get('[name="password"]').type('test');
    cy.get('[name="confirmation"]').type('test');

    cy.get('button[type="submit"]').click();

    cy.contains('Le mot de passe doit faire au moins 5 caractères').should('be.visible');
  });


  it('Entrer mot de passe différent (Erreur)', () => {

    cy.visit('http://localhost:4173/register');

    cy.get('[name="email"]').type(email);
    cy.get('[name="password"]').type('test2024#@123');
    cy.get('[name="confirmation"]').type('test2020#@123');

    cy.get('button[type="submit"]').click();

    cy.contains('Les mots de passe ne correspondent pas').should('be.visible');
  });


  it('Entrer mot de passe différent & incorrect (Erreur)', () => {

    cy.visit('http://localhost:4173/register');

    cy.get('[name="email"]').type(email);
    cy.get('[name="password"]').type('test');
    cy.get('[name="confirmation"]').type('test2020#@123');

    cy.get('button[type="submit"]').click();


    cy.contains('Le mot de passe doit faire au moins 5 caractères').should('be.visible');
    cy.contains('Les mots de passe ne correspondent pas').should('be.visible');
  });


  it('Erreur sur tout les champs (Erreur)', () => {

    cy.visit('http://localhost:4173/register');

    cy.get('[name="email"]').type("testemail.com");
    cy.get('[name="password"]').type('test');
    cy.get('[name="confirmation"]').type('test2020#@123');

    cy.get('button[type="submit"]').click();

    cy.contains('Format email incorrect').should('be.visible');
    cy.contains('Le mot de passe doit faire au moins 5 caractères').should('be.visible');
    cy.contains('Les mots de passe ne correspondent pas').should('be.visible');
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

    cy.contains('Un compte avec cet email exist déjà!').should('be.visible');
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



describe('Test de la connexion', () => {

  it('Champs vide (Erreur)', () => {

    cy.visit('http://localhost:4173/login');

    cy.get('button[type="submit"]').click();


    cy.contains('Vous devez renseigner ce champ').should('be.visible');
    cy.contains('Vous devez renseigner ce champ').should('be.visible');
  });


  it('Champs email incorrect (Erreur)', () => {

    cy.visit('http://localhost:4173/login');

    cy.get('[name="email"]').type("emailtest");
    cy.get('[name="password"]').type("test2024#@123");

    cy.get('button[type="submit"]').click();

    cy.contains('Format email incorrect').should('be.visible');
  });

  it('Utilisateur inéxistant (Erreur)', () => {

    cy.visit('http://localhost:4173/login');

    cy.get('[name="email"]').type("jean2@gmail.com");
    cy.get('[name="password"]').type("tes@123");

    cy.get('button[type="submit"]').click();

    cy.contains('Utilisateur non trouvé').should('be.visible');
  });

  it('Information utilisateur incorrect (Erreur)', () => {

    cy.visit('http://localhost:4173/login');

    cy.get('[name="email"]').type(email);
    cy.get('[name="password"]').type("test#@123");

    cy.get('button[type="submit"]').click();

    cy.contains('Mauvais email ou mot de passe!').should('be.visible');
  });


  it('Entrer d information dans les champs (Connexion)', () => {

    cy.visit('http://localhost:4173/login');
    cy.get('[name="email"]').type(email);
    cy.get('[name="password"]').type('test2024#@123');
    cy.get('button[type="submit"]').click();

    cy.url().should('include', '/');
  });

});

describe('Test de la gestion du profil', () => {

  it('Affichage email', () => {

    cy.visit('http://localhost:4173/login');
    cy.get('[name="email"]').type(email);
    cy.get('[name="password"]').type('test2024#@123');
    cy.get('button[type="submit"]').click();
    cy.get('img[alt="Profile"]').click({ force: true })
    cy.contains('Mon Profile').click();

    cy.contains(email).should("be.visible");
  });

  it('Champs vide', () => {

    cy.visit('http://localhost:4173/login');
    cy.get('[name="email"]').type(email);
    cy.get('[name="password"]').type('test2024#@123');
    cy.get('button[type="submit"]').click();
    cy.get('img[alt="Profile"]').click({ force: true })
    cy.contains('Mon Profile').click();

    cy.get('button[type="submit"]').click();

    cy.contains("Vous devez renseigner ce champ").should("be.visible");
  });

  it('Entrer informations dans les champs (Gestion Profil)', () => {

    cy.visit('http://localhost:4173/login');
    cy.get('[name="email"]').type(email);
    cy.get('[name="password"]').type('test2024#@123');
    cy.get('button[type="submit"]').click();
    cy.get('img[alt="Profile"]').click({ force: true })
    cy.contains('Mon Profile').click();

    cy.get('input[name="name"]').type('Jean');
    cy.get('input[name="address"]').type('Avenue de test');
    cy.get('input[name="zip"]').type('123');
    cy.get('input[name="location"]').type('TestCity');

    cy.get('button[type="submit"]').click();
    cy.reload();

    cy.get('input[name="name"]').should('have.value', 'Jean');
  });

});

describe('Test ajout des Todos', () => {

  it('Champ vide (Erreur)', () => {

    cy.visit('http://localhost:4173/login');

    cy.get('[name="email"]').type(email);
    cy.get('[name="password"]').type('test2024#@123');
    cy.get('button[type="submit"]').click();

    cy.get('button[type="submit"]').click();

    cy.contains('Vous devez renseigner ce champ').should('be.visible');
  });

  it('Ajouter des taches (Création Todo)', () => {

    cy.visit('http://localhost:4173/login');

    cy.get('[name="email"]').type(email);
    cy.get('[name="password"]').type('test2024#@123');
    cy.get('button[type="submit"]').click();

    cy.get('input[name="text"]').type('Sortir les poubelles');
  
    cy.get('button[type="submit"]').click();

    cy.get('input[name="text"]').type('Manger au restaurant');

    cy.get('button[type="submit"]').click();

    cy.contains('Sortir les poubelles').should('be.visible');
    cy.contains('Manger au restaurant').should('be.visible');
  });
});

describe('Test gestion des Todos', () => {

  it('Validations Todos', () => {

    cy.visit('http://localhost:4173/login');

    cy.get('[name="email"]').type(email);
    cy.get('[name="password"]').type('test2024#@123');
    cy.get('button[type="submit"]').click();

    cy.get('input[type="checkbox"]').first().check();
    cy.get('input[type="checkbox"]').last().check();

    cy.get('input[type="checkbox"]').first().should('be.checked');
    cy.get('input[type="checkbox"]').last().should('be.checked');
  });

  it('Suprimer les taches (Supression des Todo)', () => {

    cy.visit('http://localhost:4173/login');

    cy.get('[name="email"]').type(email);
    cy.get('[name="password"]').type('test2024#@123');
    cy.get('button[type="submit"]').click();

    cy.get('input[type="checkbox"]').first().parents('li').find('svg').click()
    cy.get('input[type="checkbox"]').first().parents('li').find('svg').click()

    cy.contains('Aucune tâche ...').should('be.visible');
  });
});

describe('Test de la navigation', () => {

  it('Changement de mode clair / sombre', () => {

    cy.visit('http://localhost:4173/login');

    cy.get('[name="email"]').type(email);
    cy.get('[name="password"]').type('test2024#@123');
    cy.get('button[type="submit"]').click();

    cy.get('#theme-toggle').click();

    cy.get('html').should('have.class', 'dark');

    cy.get('#theme-toggle').click();

    cy.get('html').should('not.have.class', 'dark');
    
  });

  it('Changement de page (A propos)', () => {

    cy.visit('http://localhost:4173/login');

    cy.get('[name="email"]').type(email);
    cy.get('[name="password"]').type('test2024#@123');
    cy.get('button[type="submit"]').click();

    cy.contains('À Propos').click();

    cy.url().should('include', '/about');
    
  });

  it('Changement de page (Todo)', () => {

    cy.visit('http://localhost:4173/login');

    cy.get('[name="email"]').type(email);
    cy.get('[name="password"]').type('test2024#@123');
    cy.get('button[type="submit"]').click();

    cy.contains('Mes Tâches').click();

    cy.url().should('include', '/');
    
  });

  it('Changement de page (Profil)', () => {

    cy.visit('http://localhost:4173/login');

    cy.get('[name="email"]').type(email);
    cy.get('[name="password"]').type('test2024#@123');
    cy.get('button[type="submit"]').click();

    cy.get('img[alt="Profile"]').click({ force: true })
    cy.contains('Mon Profile').click();

    cy.url().should('include', '/profile');
    
  });

  it('Changement de page (Logo Accueil)', () => {

    cy.visit('http://localhost:4173/login');

    cy.get('[name="email"]').type(email);
    cy.get('[name="password"]').type('test2024#@123');
    cy.get('button[type="submit"]').click();

    cy.contains('Todo').click();

    cy.url().should('include', '/');
    
  });
});

describe('Test de la déconnexion', () => {

  it('Déconnexion du profil (Déconnexion)', () => {

    cy.visit('http://localhost:4173/login');

    cy.get('[name="email"]').type(email);
    cy.get('[name="password"]').type('test2024#@123');

    cy.get('button[type="submit"]').click();

    cy.get('img[alt="Profile"]').click({ force: true })

    cy.contains('Déconnection').click();

    cy.get('img[alt="Profile"]').should('not.exist');
    //cy.url().should('include', '/login');
  });
});

describe('Test de la Supression Compte', () => {

  it('Supression du compte (Supression Profil)', () => {
    cy.visit('http://localhost:4173/login');
    cy.get('[name="email"]').type(email);
    cy.get('[name="password"]').type('test2024#@123');
    cy.get('button[type="submit"]').click();
    cy.get('img[alt="Profile"]').click({ force: true })
    cy.contains('Mon Profile').click();
  
    cy.contains('Supprimer votre compte').click();
  
    cy.url().should('include', '/register');
  
    /*cy.visit('http://localhost:4173/login');
    cy.get('[name="email"]').type(email);
    cy.get('[name="password"]').type('test2024#@123');
    cy.get('button[type="submit"]').click();
  
    cy.wait(100000);
  
    cy.contains("SyntaxError: Failed to execute 'json' on 'Response': Unexpected end of JSON input").should("be.visible");*/
  });
});
