import { User } from "../models/user.model.js";
import transporter from "../controller/nodemailer.js";
import dotenv from "dotenv"
dotenv.config()


export const sentOtp = async (req, res) => {
    try {
        const { userId } = req.body;
        const userData = await User.findOne({_id : userId}).exec();
        
        if (!userData || null) {
            return res.status(402).send({
                message: "User not found ..!"
            })
        }

        // CREATE OTP AND SAVE TO THE DATABASE AND UPDATE THE USER
        const otp = String(Math.floor(100000 + Math.random() * 900000))
        userData.verifyOtp = otp
        userData.verifyOtpExpireAt = Date.now() + 5 * 60 * 1000 // expire after 5 min from now.

        await userData.save()
        .then(() => {
            res.status(201).send({
                message: `Hello ! ${userData.fullName} ..!, Save successfully ..!`
            })
        })
        .catch((error) => {
            res.status(402).send({
                message: "Something went wrong ..!",
                error: error
            })
        })
        
        // NOW SENT THE OPT TO THE MAIL
        const mailOption = {
            from: process.env.SENDER_EMAIL, // sender address
            to: `${userData.email}`, // list of receivers
            subject: ` Account Verification OTP..! `, // Subject line
            text: `Hello ! ${userData.fullName}, Your verification OTP is ${otp} Never Share your OTP, or Passcode with anyone, 
                Sharing these details can lead to unauthorised access to your account.`, // plain text body
        }
        try {
            await transporter.sendMail(mailOption);
            console.log("OTP sent to the registered email successfully ..!");
        } catch (error) {
            console.error("Error sending email:", error.message);
            return res.status(500).send({
                message: "Failed to send OTP",
                error: error.message,
            });
        }


        // IF USER IS ALREADY VERIFIED
        if (userData.isAccountVarified) {
            return res.status(201).send({
                message: "User Already Varified ..!"
            })
        }


    } catch (error) {
        return res.status(500).send({
            message: "Failed to send OTP",
            error: error.message
        })
    }
}