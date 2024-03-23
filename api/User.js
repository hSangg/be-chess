import express from 'express';
import bcrypt from 'bcrypt';
import User from '../models/user.model.js';

const router = express.Router();


router.post('/signup', (req, res) => {
    const { name, password, email, phone_number } = req.body;
    console.log(req)
    if (!name || !password || !email || !phone_number) {
        return res.status(400).json({
            status: "FAILED",
            message: "Missing required fields",
            data: name
        });
    }

    const create_at = Date.now();
    const saltRounds = 10;

    bcrypt.hash(password, saltRounds)
        .then(hashedPassword => {
            const newUser = new User({
                name,
                email,
                password: hashedPassword,
                phone_number,
                create_at,
                update_at: create_at
            });

            newUser.save()
                .then(savedUser => {
                    res.status(201).json({
                        status: "SUCCESS",
                        message: "Account created",
                        data: savedUser
                    });
                })
                .catch(err => {
                    console.error("Error while saving user:", err);
                    res.status(500).json({
                        status: "FAILED",
                        message: "An error occurred while saving user"
                    });
                });
        })
        .catch(err => {
            console.error("Error while hashing password:", err);
            res.status(500).json({
                status: "FAILED",
                message: "An error occurred while hashing password"
            });
        });
});


export default router;
