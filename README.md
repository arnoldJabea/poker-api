
# ♠️ Texas Hold'em Poker API 🃏

## 🎯 Description
Cette API permet de simuler des parties de **Texas Hold’em Poker** avec :
- 🎮 **Gestion des tables et des joueurs** (inscription, connexion, placement aux tables)
- 💰 **Système de mises et de blindes** (small blind, big blind, relance, all-in)
- 🃏 **Gestion du deck et distribution des cartes** (flop, turn, river)
- 🧠 **Intelligence Artificielle** (joueurs IA automatisés)
- 🔐 **Authentification sécurisée** (JWT)
- 📊 **Enregistrement des statistiques des parties**
- 📑 **Documentation API avec Swagger**

---

## 🚀 Technologies utilisées
| Technologie  | Usage |
|-------------|----------------|
| **NestJS**  | Framework backend |
| **TypeORM** | ORM pour PostgreSQL |
| **PostgreSQL** | Base de données |
| **JWT** | Authentification sécurisée |
| **Swagger** | Documentation API |
| **Docker** (optionnel) | Conteneurisation de l’API |
| **Jest** | Tests unitaires |

---

## 📌 Installation et configuration

### 🛠 **1. Prérequis**
Assure-toi d’avoir installé :
- **Node.js** (>= 16.x)
- **PostgreSQL** (>= 14.x)
- **npm** ou **yarn**
- **Docker** (optionnel)

---

### ⚙ **2. Cloner le projet**
```bash
git clone https://github.com/tonpseudo/texas-holdem-api.git
cd texas-holdem-api



⸻

📦 3. Installer les dépendances

npm install



⸻

🛠 4. Configurer l’environnement

Crée un fichier .env à la racine :

DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=motdepasse
DATABASE_NAME=poker
JWT_SECRET=ton_secret
PORT=3000

Si tu utilises Docker, adapte les valeurs.

⸻

🏗 5. Démarrer PostgreSQL

Si PostgreSQL est installé en local :

psql -U postgres -c "CREATE DATABASE poker;"

Ou avec Docker :

docker-compose up -d



⸻

🔄 6. Exécuter les migrations

npm run typeorm -- migration:run -d ./ormconfig/ormdatasource.ts

Si nécessaire, recréer la BDD :

npm run typeorm -- schema:drop
npm run typeorm -- migration:run -d ./ormconfig/ormdatasource.ts



⸻

🚀 7. Lancer l’API

npm run start

Mode développement :

npm run start:dev



⸻

📖 Documentation API

Swagger est disponible à cette URL :

http://localhost:3000/api



⸻

📌 Routes principales

🎮 Gestion des tables

Méthode	Endpoint	Description
POST	/tables	Créer une table
GET	/tables	Voir toutes les tables
GET	/tables/:id	Voir une table spécifique
POST	/tables/:id	Rejoindre / quitter une table
POST	/tables/:id/deal	Distribuer les cartes
POST	/tables/:id/start	Démarrer une partie



⸻

💰 Gestion des mises

Méthode	Endpoint	Description
POST	/bets/:tableId/:userId	Effectuer une mise
GET	/bets/:tableId	Voir les mises en cours



⸻

🔐 Authentification

Méthode	Endpoint	Description
POST	/auth/register	Inscription d’un joueur
POST	/auth/login	Connexion (JWT)
GET	/users/profile	Voir son profil



⸻

🧠 Gestion de l’IA

Méthode	Endpoint	Description
POST	/tables/:id/add-ai	Ajouter un joueur IA
POST	/tables/:id/ai-turn	Faire jouer l’IA



⸻

🛠 Tests

Lancer les tests unitaires :

npm run test

Lancer les tests e2e :

npm run test:e2e



⸻

📊 Statistiques des parties

Chaque partie enregistre :
	•	👑 Le vainqueur (ID du joueur gagnant)
	•	⏳ Durée de la partie
	•	💰 Total des mises

⸻

🚀 Déploiement

📦 Avec Docker

Créer une image Docker :

docker build -t texas-holdem-api .

Lancer le conteneur :

docker run -p 3000:3000 texas-holdem-api



⸻

🤝 Contribuer

Les contributions sont bienvenues ! 🛠
	1.	Fork le repo
	2.	Crée une branche (feat/ajout-fonctionnalité)
	3.	Commit tes changements
	4.	Fais une Pull Request

⸻

📜 Licence

Ce projet est sous licence MIT.

⸻

🏆 Auteurs
	•	@Arnold jabea


	•	



