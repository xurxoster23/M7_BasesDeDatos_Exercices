const mongoose  =   require('mongoose');
const express   =   require('express');
const router    =   express.Router();

const Player        =   require('../models/players');

const mongooseURI   =   'mongodb://localhost:27017/LaLiga';

mongoose.connect(mongooseURI)
    .then(() => console.log('Conectado a BBDD'))
    .catch(err => console.error(`BBDD ${err}`))  
/**
 * @swagger
 * /players/team/{team}:
 *   get:
 *     summary: Obtener jugadores por equipo
 *     tags: [Players]
 *     parameters:
 *       - name: team
 *         in: path
 *         required: true
 *         description: Nombre del equipo para filtrar jugadores
 *         schema:
 *           type: string
 *           example: "Barcelona"
 *     responses:
 *       200:
 *         description: Lista de jugadores del equipo especificado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "ok"
 *                 players:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Player'
 *       404:
 *         description: No se encontraron jugadores para el equipo especificado
 */
 
router.get('/team/:team', async (req,res) => {
    try {
        const players   =   await Player.find({team: req.params.team});
        res.status(200).json({
            message: 'ok',
            players
        })
    } catch (err) {
        res.status(404).json({
            message: `Database ${err}`
        })
    }
})
/**
 * @swagger
 * /players:
 *   post:
 *     summary: Crear un nuevo jugador
 *     tags: [Players]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PlayerInput'
 *     responses:
 *       201:
 *         description: Jugador creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Player'
 *       400:
 *         description: Datos inválidos o `surname` duplicado
 */
router.post('/', async (req,res) => {
    try {
        const newPlayer =   new Player(req.body);
        await newPlayer.save();
        res.status(200).json({
            message: 'ok',
            newPlayer
        })
    } catch (error) {
        res.status(500).json({
            message: `Database error`,
            error: `${error}`
        })
    }
})

/**
 * @swagger
 * /players:
 *   put:
 *     summary: Actualizar un jugador por su apellido (surname)
 *     tags: [Players]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: ["surname"]
 *             properties:
 *               surname:
 *                 type: string
 *                 example: "Griezmann"
 *               name:
 *                 type: string
 *                 example: "Antoine"
 *               team:
 *                 type: string
 *                 example: "Atlético de Madrid"
 *     responses:
 *       200:
 *         description: Jugador actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "ok"
 *                 playerUpdated:
 *                   $ref: '#/components/schemas/Player'
 *       400:
 *         description: Error en la solicitud (datos incorrectos o `surname` no proporcionado)
 *       500:
 *         description: Error de base de datos
 */
router.put('/', async (req,res) => {
    try {
        console.log(req.body.surname);
        const playerUpdated     =   await Player.findOneAndUpdate({surname: req.body.surname},req.body, {new: true, runValidators: true,upsert:true});
        res.status(200).json({
            message: 'ok',
            playerUpdated
        })
    } catch (error) {
        res.status(500).json({
            message: `Database error`,
            error: `${error}`
        })
    }
})

/**
 * @swagger
 * /players/{surname}:
 *   delete:
 *     summary: Eliminar un jugador por su apellido (surname)
 *     tags: [Players]
 *     parameters:
 *       - name: surname
 *         in: path
 *         required: true
 *         description: Apellido del jugador a eliminar
 *         schema:
 *           type: string
 *           example: "Griezmann"
 *     responses:
 *       200:
 *         description: Jugador eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "ok"
 *                 player:
 *                   $ref: '#/components/schemas/Player'
 *       404:
 *         description: Jugador no encontrado
 *       500:
 *         description: Error de base de datos
 */
router.delete('/:surname', async (req,res) => {
    try {
        const playerDeleted =   await Player.findOneAndDelete({surname: req.params.surname});
        res.status(200).json({
            message: 'ok',
            player: playerDeleted
        })
    } catch (error) {
        res.status(500).json({
            message: 'Database error',
            error: `${error}`
        })
    }
})

module.exports  =   router;