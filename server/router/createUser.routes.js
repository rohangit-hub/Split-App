// USER CREATE ROUTES
import { User } from "../models/user.model.js"

export const createUsers = async (req, res) => {

    // Getting Data By Body
    const { fullName,userName,email,password } = await req.body

    // Hash The Password Before Save
    const encryptedPassword = await User.hashPassword(password)

    // Replacing Plane Password with Hash Password
    const newUser = new User({
        fullName,
        userName,
        email,
        password : encryptedPassword
    })

    // Create JWT Token
    const token = await newUser.jwtTokenGenerate()

    newUser.save().then(() => {
        res.status(201).send({
            message: `user ${fullName} has created..!`,
            token : token
        })
    }).catch((error) => {
        res.status(402).send({
            message: "User not created",
            error: error
        })
    })
}