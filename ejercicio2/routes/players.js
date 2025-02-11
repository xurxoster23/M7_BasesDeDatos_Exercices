const mongoose  =   require('mongoose');
const cors      =   require('cors');
const express   =   require('express');

const app       =   express();
app.use(cors());

const Player    =   require('../models/players');

const mongoURI  =   'mongodb://localhost:27017/LaLiga';
mongoose.connect(mongoURI);

app.post('/', async (req,res,next) => {
    try {
        const newPlayer   =   new Player(req.body);
        await newPlayer.save();
        res.status(201).json({
            message: 'ok',
            player: newPlayer
        })
    } catch (error) {
        res.status(400).json({
            message: 'Database error'
        })
    }
    next();
})

module.exports  =   app;