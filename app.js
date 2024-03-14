import express from 'express'
import mongoose from 'mongoose';
import bodyParser from 'body-parser'
import usersRoutes from './routes/users.js'

const PORT = 5000;


const app = express();
mongoose.connect('mongodb://localhost:27017/MobileDb')

const AccountSchema = mongoose.Schema({
    account: String,
    password: String,
})

const AccountModel = mongoose.model("orders", AccountSchema);
app.get("/getAccounts", (req, res) => {
    AccountModel.find({}).then(function (accs) {
        res.json(accs)
    }).catch(function (err) {
        console.log(err)
    })
})
app.listen(PORT, () => {
    console.log("server is running")
})


