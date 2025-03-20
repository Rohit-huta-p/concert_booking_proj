const UserModel = require('../models/userModel')
const ConcertModel = require('../models/concertModel')


const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        // checl if user exists
        const isExistingUser = await UserModel.findOne({ email });
        if (isExistingUser) {
            return res.status(400).json({ error: 'User already registered' });
        }
        const user = await UserModel.create({ name, email, password });
        res.status(201).json({message: "User Created Successfully" , user});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};  


const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'User not found' });
        }
        if (user.password !== password) {
            return res.status(401).json({ error: 'Invalid password' });
        }
        const token = await UserModel.generateToken(user);
        res.status(200).json({message:"User Authorization Successfully" , token});

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const bookConcert = async (req, res) => {
    try {
        const userId = req.user._id;
        const { concertId, ticketCount } = req.body;
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        
        const concert = await ConcertModel.findById(concertId);
        if (!concert) {
            return res.status(404).json({ error: 'Concert not found' });
        }
        user.bookedConcerts.push({ concertId, noOfTickets: ticketCount });
        await user.save();
        res.status(200).json({message: "Concert Booked Successfully" , user});
        console.log("Concert Booked Successfully");
        
    } catch (error) {
        console.log(error);
        
    }
}


const get_all_booked_concerts = async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({message: "Booked Concerts Fetched Successfully" , bookedConcerts: user.bookedConcerts});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    registerUser,
    login,
    bookConcert,
    get_all_booked_concerts

}