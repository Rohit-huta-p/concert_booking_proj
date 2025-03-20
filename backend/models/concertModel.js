const mongoose = require('mongoose');


const concertSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    venue: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true, 
    },    
}, {
    timestamps: true,
});

const ConcertModel = mongoose.model('Concert', concertSchema);

module.exports = ConcertModel;
