const express           =   require('express');
const app               =   express();
const PORT              =   3000;

const connection    =   require('./db/db_shp');

app.use(express.json());

app.get('/users', (req,res) => {
    connection.connect(() => {
        console.log('Database connected');
    })
    connection.query('SELECT * FROM users', function (err,results) {
        if (err) {
            console.error(err);
            return res.status(500).json({
                message: 'Database server error, try again later'
            })
        }
        return res.status(200).json({
            message: 'ok',
            results
        })
    })
})

app.listen(PORT, () => {
    console.log(`Servidor escuchando en htpp://localhost:${PORT}`);
})