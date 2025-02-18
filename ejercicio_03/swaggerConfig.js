const swaggerJsdoc  = require('swagger-jsdoc');
const swaggerUi     = require('swagger-ui-express');
const YAML          = require("yamljs");

const swaggerDocument = YAML.load("./swagger.yaml"); // Cargar el YAML correctamente

const swaggerDocs   = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  console.log("📄 Swagger docs disponibles en: http://localhost:3000/api-docs");
}

module.exports  = swaggerDocs;


