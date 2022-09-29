# Frontend written in React.

Only works with a running Keycloak Server.


# Keycloak

After init, open http://localhost:8080 and login with username admin and password admin. Create a new realm with the "realm-export.json" (see https://github.com/kbe-ss22/docker-compose).

Upon opening the frontend (https://localhost:3000) the user will be redirected to keycloak and can there registrate a new account and login with those details afterwards.
