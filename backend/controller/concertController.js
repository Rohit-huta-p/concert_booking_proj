const concertModel = require('../models/concertModel')


const addConcert = async (req, res) => {
    try {
        const { title, date, time, venue, price } = req.body;
        const concert = await concertModel.create({ title, date, time, venue, price });
        res.status(201).json({message: "Concert Created Successfully" , concert});
        console.log("Concert Created Successfully");
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


const get_all_concerts = async (req, res) => {
    try {
        const concerts = await concertModel.find();
        res.status(200).json({message: "Concerts Fetched Successfully" , concerts});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


module.exports ={
    addConcert,
    get_all_concerts
}