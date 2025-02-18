const mongoose  =   require('mongoose');

const PacienteSchema    =   new mongoose.Schema(
    {
        name    :   {
            type    :   String,
            required:   true
        },
        surmame    :   {
            type    :   String,
            required:   true
        },
        age    :   {
            type    :   Number,
            required:   true
        },
        sex    :   {
            type    :   String,
            required:   true
        },
        treatment    :   {
            type    :   String,
            required:   true
        },
        diagonostic    :   {
            type    :   String,
            required:   true
        }
    },
    {
        versionKey  :   false,
        collection  :   'pacientes'
    }
)

module.exports  =   mongoose.model('Paciente', PacienteSchema);