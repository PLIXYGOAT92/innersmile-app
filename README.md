# InnerSmile

Une application de chat sécurisée pour les étudiants, offrant un espace d'échange anonyme sur différents sujets liés à la vie étudiante.

## Fonctionnalités

- 💬 Chat en temps réel avec d'autres étudiants
- 🎯 6 catégories de discussion :
  - Examens et stress
  - Isolement
  - Harcèlement
  - Relations
  - Famille
  - Bien-être
- 🔒 Anonymat garanti
- 🤖 Réponses contextuelles générées par IA
- 📱 Interface mobile-first
- 🎨 Design moderne et intuitif

## Installation

1. Cloner le dépôt :
```bash
git clone https://github.com/votre-username/innersmile-app.git
cd innersmile-app
```

2. Installer les dépendances :
```bash
yarn install
```

3. Créer un fichier `.env` à partir de `.env.example` :
```bash
cp .env.example .env
```

4. Remplir les variables d'environnement dans `.env`

5. Lancer l'application en mode développement :
```bash
yarn dev
```

## Technologies utilisées

- React
- Vite
- Ant Design
- Styled Components
- React Router

## Structure du projet

```
innersmile-app/
├── src/
│   ├── components/     # Composants réutilisables
│   ├── config/         # Configuration (catégories, etc.)
│   ├── pages/          # Pages de l'application
│   ├── services/       # Services (API, messages, etc.)
│   └── styles/         # Styles globaux
├── public/             # Fichiers statiques
└── package.json        # Dépendances et scripts
```

## Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :
1. Fork le projet
2. Créer une branche pour votre fonctionnalité
3. Commiter vos changements
4. Pousser vers la branche
5. Ouvrir une Pull Request

## Licence

MIT
