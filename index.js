import express from "express";
import mongoose from "mongoose";
import Cors from 'cors';
import Cards from './dbCards.js';

// App Config
const app = express();
const port = process.env.PORT || 8001
const connection_url = `mongodb+srv://admin:XeLmfzf2OFzR3Osr@cluster0.ugsml5x.mongodb.net/Cluster0?retryWrites=true&w=majority`
//const connection_url = process.env.MONGO_URL


// Middlewares
app.use(express.json());
app.use(Cors());


// DB config
mongoose.connect(connection_url, {
    useNewUrlParser: true,
    //useCreateIndex: true,
    useUnifiedTopology: true,
    
})
//mongoose.set('strictQuery', true)


// API Endpoints
app.get("/", (req, res) => res.status(200).send("Hello Babies"));

app.post("/tinder/cards", (req, res) => {
    const dbCard =req.body;

Cards.create(dbCard, (err, data) => {
    if (err) {
        res.status(500).send(err)
    } 
    else {
        res.status(201).send(data)
    }
});
});

app.get("/tinder/cards", (req, res) => {

    Cards.find((err, data) => {
        if (err) {
            res.status(501).send(err)
        }
        else 
        {
            res.status(200).send(data)
        }
    });
});

// Listener
app.listen(port, () => console.log(`listening on localhost: ${port}`));
