const mongoose  =   require('mongoose');

const PlayerSchema  =   new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        surname: {
            type: String,
            required: true,
            unique: true
        },
        team: {
            type: String,
            required: true
        }
    },
    {
        versionKey: false,
        collection: 'players'
    }
);

module.exports  =   mongoose.model('Player', PlayerSchema);