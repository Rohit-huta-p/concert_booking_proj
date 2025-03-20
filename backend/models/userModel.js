const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    bookedConcerts : [{
        concertId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Concert'
        },
        noOfTickets: {
            type: Number,
            required: true,
        }
    }]
}, {    
    timestamps: true,
}); 


userSchema.statics.generateToken = async (user) => {
    const token = await jwt.sign({ _id: user._id, email: user.email }, "college123", { expiresIn: "7d" });
    return token;
}

const UserModel = mongoose.model('User', userSchema);


module.exports = UserModel;