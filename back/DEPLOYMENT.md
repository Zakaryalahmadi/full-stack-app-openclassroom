# Déploiement sur Render

## Variables d'environnement nécessaires

### JWT_SECRET

Une clé secrète pour signer les tokens JWT. Doit être une chaîne de caractères sécurisée.
Exemple : `mySecretKey123!@#`

### DATABASE_URL

L'URL de connexion à la base de données PostgreSQL (fournie automatiquement par Render)

### PORT

Le port sur lequel l'application va écouter (défaut : 8080)

## Étapes de déploiement

1. **Connectez votre repository GitHub à Render**
2. **Créez un service PostgreSQL** (Plan gratuit disponible)
3. **Créez un service Web** avec les paramètres suivants :
   - Environment: `Java`
   - Build Command: `./render-build.sh`
   - Start Command: `./render-start.sh`
4. **Configurez les variables d'environnement** dans Render
5. **Déployez votre application**

## Configuration CORS

N'oubliez pas de remplacer `https://your-frontend-domain.render.com` dans `SpringSecurityConfig.java` par l'URL réelle de votre frontend déployé.

## Base de données

L'application est configurée pour utiliser PostgreSQL en production et MySQL en développement.
