import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
const app = express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())

mongoose.connect('mongodb://localhost:27017/metaspace', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log("DB connected")
})

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String
})
const User = new mongoose.model("User", userSchema)

//Routes
app.get("/", (req, res) => {
    res.send(`Server running on http://localhost:5000`)
})
app.post("/login", (req, res) => {
    const { email, password } = req.body;
    User.findOne({ email: email }, (err, user) => {
        if (user) {
            if (bcrypt.compareSync(password, user.password)) {
                const result = generateLoginToken(user)
                res.send({ message: "Login Successfull", user: user, result: result })
            }
            else {
                res.send({ message: "Password didn't match" })
            }
        }
        else {
            res.send({ message: "User not registered" })
        }
    })
})
app.post("/register", (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    User.findOne({ email: email }, (err, user) => {
        if (user) {
            res.send({ message: "user already exist" })
        }
        else {
            const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
            const user = new User({
                firstName,
                lastName,
                email,
                password: hashedPassword
            })

            user.save(err => {
                if (err) {
                    res.send(err)
                }
                else {
                    res.send({ message: "Successfully Registered" })
                }

            })
        }
    })

})



const generateLoginToken = (ud) => {
    const token = sign({
        id: ud._id,
        email: ud.email
    }, '365d');
    return {
        id: ud.id,
        firstName: ud.firstName,
        lastName: ud.lastName,
        email: ud.email,
        token

    };
};


const sign = (data, expTime) => {
    return jwt.sign(
        { ...data },
        'qweryu532knf@@&&kjdk%^',
        { expiresIn: expTime });
}
app.listen(5000, () => {
    console.log('Server started at port 5000')
})