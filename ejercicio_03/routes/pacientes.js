const express   =   require('express');
const app       =   express();

const Paciente  =   require('../models/pacientes');

app.get('/', async (req,res) => {
    try {
        const pacientes =   await Paciente.find();
        res.status(200).json({
            message: 'ok',
            pacientes
        })
    } catch (error) {
        res.status(500).json({
            message: `BBDD disconnected`,
            error: `${error}`
        })
    }
})  

module.exports  =   app;
    

