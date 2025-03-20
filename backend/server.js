    const express = require("express");
const app = express();


// Middleware
const cors = require("cors");
const { default: mongoose } = require("mongoose");
app.use(cors({
    origin: "*",
    credentials: true
}))

app.use(express.json());
const authRouter = require("./routes/authRouter")
const concertRouter = require("./routes/concertRouter")

app.use('/api/auth', authRouter)
app.use('/api/concerts', concertRouter)



app.listen(8000, async () => {
    try {
        await mongoose.connect("mongodb+srv://vrohithuta:abcd1234@cluster0.gtjll.mongodb.net/")
        console.log("Connected to DB...");
        
        console.log("Server Started at 8000...");
    } catch (error) {
        console.log(error);
        
    }
    
})


