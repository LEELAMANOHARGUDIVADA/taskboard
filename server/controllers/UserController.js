import bcrypt from "bcryptjs"
import generateToken from "../utils/jwt.js";
import User from "../models/UserSchema.js";

const Register = async (req, res) => {
    try {
        const { name, email, password, country } = req.body;

        if (!name || !email || !password || !country) {
            throw new Error("All Fields Are Required!");
        }

        const exisitingUser = await User.findOne({ email });

        if (exisitingUser) {
            return res.status(400).json({ success: false, message: "User Already Exists!" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = bcrypt.hashSync(password, salt);


        const user = new User({
            name,
            email,
            password: hashedPassword,
            country
        });
        await user.save();

        res.status(201).json({ success: true, message: "Registration Successful", token: generateToken(user._id), username: user.name });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}


const Login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            throw new Error("All Fields Are Required!");
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isValidPassword = bcrypt.compareSync(password, user.password);

        if (!isValidPassword) return res.status(400).json({ success: false, message: 'Invalid Password' });

        res.status(200).json({ success: true, message: "Login Successful", token: generateToken(user._id), username: user.name });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}


export { Register, Login };