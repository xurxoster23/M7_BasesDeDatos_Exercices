const express   =   require('express');
const swaggerUi = require("swagger-ui-express");
const swaggerDocs = require("./swaggerConfig"); // Archivo con la configuración de Swagger
const app       =   express();
const PORT      =   3000;

const players   =   require('./routes/players');

app.use(express.json());

app.use('/players', players);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.listen(PORT, () => {
    console.log(`Servidor escuchando en htpp://localhost:${PORT}`);
    console.log(`Documentación presentada en http://localhost/api-doc`);
});