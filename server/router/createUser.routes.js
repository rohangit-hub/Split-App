// USER CREATE ROUTES
import { User } from "../models/user.model.js"
import transporter from "../controller/nodemailer.js"

export const createUsers = async (req, res) => {

    // Getting Data By Body
    const { fullName,userName,email,password } = await req.body

    if (!fullName || !userName || !email || !password || null) {
        res.status(401).send({ message: "Invalid Email and Password" })
    }

    // Hash The Password Before Save
    const encryptedPassword = await User.hashPassword(password)

    // Replacing Plane Password with Hash Password
    const newUser = new User({
        fullName,
        userName,
        email,
        password : encryptedPassword
    })

    // CREATE JWT TOKEN
    const token = await newUser.jwtTokenGenerate()
    res.cookie("token" , token , {
        httpOnly : true,
        secure : process.env.NODEENV === "production",
        sameSite : process.env.NODEENV === "production" ? "none" : "strict",
        maxAge : 7*24*60*60*1000
    })

    // SEND GREET EMAIL
    const mailOption = {
        from: process.env.SENDER_EMAIL, // sender address
        to: `${email}`, // list of receivers
        subject: ` Succesfully Register ..! `, // Subject line
        text: `Hello ${fullName}! Thank you for registering with SPLIT APP ! We're thrilled to have you join us.`, // plain text body
    }
    try {
        await transporter.sendMail(mailOption);
        console.log("Email sent successfully!");
    } catch (error) {
        console.error("Error sending email:", error.message);
        return res.status(500).send({
            message: "Failed to send email",
            error: error.message,
        });
    }


    newUser.save().then(() => {
        res.status(201).send({
            message: `user ${fullName} has created..!, Mail sent to the register email.`
        })
    }).catch((error) => {
        res.status(402).send({
            message: "User not created",
            error: error
        })
    })
}