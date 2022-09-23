import Keycloak from "keycloak-js";
const keycloak = new Keycloak({
 url: "http://localhost:8080/",
 realm: "kbe",
 clientId: "react-web-app",
});

export default keycloak;