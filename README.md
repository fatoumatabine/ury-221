# JURIS 221

API Express + Prisma pour la gestion d'un cabinet d'avocats.

## Architecture de deploiement

- Base de donnees: PostgreSQL
- Containerisation: Docker
- Integration continue: GitHub Actions
- Verification CI/CD: tests + build Docker dans GitHub Actions

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
- s'execute sur les branches `cicd` et `main`, ainsi que sur les Pull Requests vers `main`
- construit l'image Docker sur chaque execution pour verifier que le projet est deployable

## Important

GitHub Actions ne va pas heberger l'application.
Avec la configuration actuelle, GitHub Actions sert uniquement a :

- lancer les tests
- verifier Prisma
- verifier que l'image Docker se build correctement

## Point important

Si GitHub Actions affiche une erreur du type `account is locked due to a billing issue`, le workflow ne demarre pas du tout.
Dans ce cas, il faut corriger le probleme dans `GitHub > Settings > Billing & Licensing` avant de pouvoir obtenir des checks verts.
