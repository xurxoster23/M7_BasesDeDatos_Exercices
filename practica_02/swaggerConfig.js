const swaggerJsDoc = require("swagger-jsdoc");

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Players API",
      description: "API para gestionar jugadores en una liga",
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
        Player: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              example: "65b7c2f5a6e7d30f8c8a0e12",
            },
            name: {
              type: "string",
              example: "Antoine",
            },
            surname: {
              type: "string",
              example: "Griezmann",
            },
            team: {
              type: "string",
              example: "Atlético de Madrid",
            },
          },
        },
        PlayerInput: {
          type: "object",
          required: ["name", "surname", "team"],
          properties: {
            name: {
              type: "string",
              example: "Lionel",
            },
            surname: {
              type: "string",
              example: "Messi",
            },
            team: {
              type: "string",
              example: "Inter Miami",
            },
          },
        },
      },
    },
  },
  apis: ["./routes/players.js"], // Apunta a tu archivo de rutas
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = swaggerDocs;
