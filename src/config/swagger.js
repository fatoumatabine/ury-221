const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const env = require("./env");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API JURIS 221",
      version: "1.0.0",
      description: "API de gestion d'un cabinet d'avocats",
    },
    servers: [
      {
        url: `http://localhost:${env.PORT}`,
      },
    ],
  },
  apis: ["./src/config/swagger-annotation.js"],
};

const specs = swaggerJSDoc(options);

const mountSwagger = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
};

module.exports = mountSwagger;
