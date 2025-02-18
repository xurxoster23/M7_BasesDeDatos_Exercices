const swaggerJsDoc = require("swagger-jsdoc");

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Productos API",
      description: "API para gestionar productos de una tienda",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:3000/api",
        description: "Servidor local",
      },
    ],
    components: {
      schemas: {
        Product: {
          type: "object",
          properties: {
            id: {
              type: "number",
              example: 1,
            },
            name: {
              type: "string",
              example: "Iphone",
            },
            description: {
              type: "string",
              example: "SmartPhone serie Pro",
            }
          },
        },
        ProductInput: {
          type: "object",
          required: ["id", "name", "description"],
          properties: {
            name: {
              type: "string",
              example: "Iphone",
            },
            description: {
              type: "string",
              example: "SmartPhone serie Pro",
            }
          },
        },
      },
    },
  },
  apis: ["./routes/products.js"], // Apunta a tu archivo de rutas
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = swaggerDocs;
