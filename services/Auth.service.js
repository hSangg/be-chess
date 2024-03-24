import User from '../models/user.model.js'

import bcrypt from 'bcrypt';
const registerService = async (req, res) => {
    try {
        const { name, password, email, phone_number } = req.body;

        if (!name || !password || !email || !phone_number) {
            return res.status(400).json({
                status: "FAILED",
                message: "Missing required fields"
            });
        }

        const createdAt = Date.now();
        const saltRounds = 10;

        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            phone_number,
            create_at: createdAt,
            update_at: createdAt
        });

        const savedUser = await newUser.save();

        return { user: savedUser }
    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({
            status: "FAILED",
            message: "An error occurred",
            error: err.message
        });
        return { user: null }
    }
};
const loginService = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (email == "" || password == "") {
            res.status(400).json({
                status: 400,
                message: "Empty credentials"
            });
            return { user: null };
        }

        const data = await User.findOne({ email });

        if (data) {
            const hashedPassword = data.password;
            const result = await bcrypt.compare(password, hashedPassword);

            if (result) {
                console.log(result);
                return { user: data };
            }
        } else {
            res.status(401).json({
                status: 401,
                message: "Invalid credential"
            });
        }
    } catch (err) {
        console.error(err);
        res.status(401).json({
            status: 401,
            error: err
        });
        return { user: null };
    }
};



export { registerService, loginService };