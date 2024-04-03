
import express from 'express'
import mongoose from 'mongoose';
import bodyParser from 'body-parser'
import fetch from "node-fetch";
import dotenv from 'dotenv/config'
import router from './routes/index.route.js'




const app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.json())
app.use(bodyParser.json());
await mongoose
    .connect(process.env.MONGO_URI).then(() => {
        console.info("Connected to the Db")
    })
    .catch((e) => {
        console.log("Error", e)
    });

app.post('/calculateSum', (req, res) => {
    const { number1, number2 } = req.body;
    console.log(req)
    const sum = parseInt(number1) + parseInt(number2);
    res.json({ sum });
});

//router
app.use('', router)
app.listen(process.env.PORT, () => {
    console.log("listening on port ", process.env.PORT);
})