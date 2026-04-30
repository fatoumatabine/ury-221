# JURIS 221

API Express + Prisma pour la gestion d'un cabinet d'avocats.

## Architecture de deploiement

- Base de donnees: PostgreSQL
- Containerisation: Docker
- Integration continue: GitHub Actions
- Deploiement continu: Render via `render.yaml`

## Lancer en local avec Docker

```bash
docker compose up --build
```

L'API sera disponible sur `http://localhost:5000` et la documentation Swagger sur `http://localhost:5000/api-docs`.
PostgreSQL sera disponible sur `localhost:5433`.

## Lancer sans Docker

1. Copier `.env.example` vers `.env`
2. Installer les dependances avec `npm ci`
3. Generer Prisma avec `npm run prisma:generate`
4. Appliquer les migrations avec `npm run prisma:deploy`
5. Demarrer avec `npm start`

## CI/CD GitHub Actions

Le workflow `/.github/workflows/ci-cd.yml` fait deux choses :

- execute l'installation, la generation Prisma, les migrations PostgreSQL et les tests
- construit l'image Docker sur chaque `push` et `pull_request`
- peut publier l'image sur GHCR lors d'un `push` sur `main` ou `master`

## Deploiement automatique sur Render

Le fichier `render.yaml` permet a Render de creer :

- un web service Docker pour l'API
- une base PostgreSQL geree
- une variable `DATABASE_URL` branchee automatiquement sur la base Render
- un auto-deploiement seulement quand les checks GitHub passent

## Etapes finales cote plateforme

1. Pousser tout le projet sur GitHub
2. Aller sur Render
3. Choisir `New +` puis `Blueprint`
4. Connecter le repo GitHub `fatoumatabine/ury-221`
5. Laisser Render lire `render.yaml`
6. Valider la creation du web service et de la base PostgreSQL

Une fois fait, chaque push sur `main` relancera la CI GitHub, puis Render redeploiera si les checks passent.
