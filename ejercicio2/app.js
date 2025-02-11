const mongoose  =   require('mongoose');
const express   =   require('express');

const app       =   express();

const players   =   require('./routes/players');

app.use(express.json());
app.use('/players', players)

const PORT      =   3000;

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
})