
import express from 'express'
import mongoose from 'mongoose';
import bodyParser from 'body-parser'
import fetch from "node-fetch";
import dotenv from 'dotenv/config'



import UserRouter from './api/User.js'


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

app.use('/user', UserRouter)

app.listen(process.env.PORT, () => {
    console.log("listening on port ", process.env.PORT);
})