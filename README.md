# Firebase Functions Rest API testing

Only allowing functions to access firestore makes it easier to construct complex logic!

Remember to add your own credentials in `app/src/permissions.json ` and in `permissions.json` in the root folder.

## Technology

- Typescript
- React
- Firebase
- Express
- REST

## Firestore rules

By setting all to false in firestore.rules only admin e.g. function can access it.

## Run frontend

```bash
#Always be in /app folder
cd app

# Local development
npm run start

# Build
npm run bulild
```

## Serve functions etc locally.

```bash
# Serve functions and hosting locally
firebase serve
```
