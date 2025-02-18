const swaggerUi         =   require('swagger-ui-express');
const mysql2            =   require('mysql2');
const express           =   require('express');

require('dotenv').config();

const swaggerDocs       =   require('./swaggerConfig');
const app               =   express();
const PORT      =   3000;

app.use(express.json());

const connection    =   mysql2.createConnection({
    host:       process.env.DB_HOST,
    user:       process.env.DB_USER,
    password:   process.env.DB_PASSWORD,
    database:   process.env.DB_NAME
})


app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get('/productos', (req, res) => {
    try {
        connection.connect();
        connection.query('SELECT * FROM productos', (error, results) => {
            if(error) {
                res.status(500).json({
                    message: 'Empty Data'
                })
            }
            res.status(200).json({
                message:    'Ok',
                results
            })
        })   
    } catch (error) {
        res.status(500).json({
            message: 'Database Error',
            error: `${error}`
        })
    }
})

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
    console.log(`Documentación presentada en http://localhost:${PORT}`);
})