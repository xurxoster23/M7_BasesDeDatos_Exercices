const mongoose  =   require('mongoose');
const express   =   require('express');
const app       =   express();
const PORT      =   3000;

const mongooseURI   =   'mongodb://localhost:27017/clinica';
const pacientes     =   require('./routes/pacientes');
const swaggerDocs   =   require('./swaggerConfig');

mongoose.connect(mongooseURI)
    .then(() => console.log(`Conectado a BBDD`))
    .catch((err) => console.log(`Error de conexion con BBDD ${err}`));

app.use('/pacientes', pacientes);   

swaggerDocs(app);

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
})    