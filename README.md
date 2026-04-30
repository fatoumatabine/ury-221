# JURIS 221

API Express + Prisma pour la gestion d'un cabinet d'avocats.

## Lancer avec Docker

```bash
docker compose up --build
```

L'API sera disponible sur `http://localhost:5000` et la documentation Swagger sur `http://localhost:5000/api-docs`.

## Lancer sans Docker

1. Copier `.env.example` vers `.env`
2. Installer les dependances avec `npm ci`
3. Generer Prisma avec `npm run prisma:generate`
4. Appliquer les migrations avec `npm run prisma:deploy`
5. Demarrer avec `npm start`

## CI/CD GitHub Actions

Le workflow `/.github/workflows/ci-cd.yml` fait deux choses :

- execute l'installation, la generation Prisma, les migrations et les tests
- construit l'image Docker et la publie sur GHCR lors d'un `push` sur `main` ou `master`

## Point d'attention

Les migrations Prisma actuellement versionnees ciblent SQLite. Le fichier `.env` local present dans le projet pointe vers PostgreSQL, donc si vous voulez un deploiement Postgres il faudra d'abord aligner `prisma/schema.prisma` et regenerer les migrations.
# ury-221
