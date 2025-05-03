import { User } from "../models/user.model.js";
import transporter from "../controller/nodemailer.js"

export const sendResetOtp = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        res.status(401).send({ message: "Email not found" })
    }

    try {
        const userData = await User.findOne({ email: email })

        if (!userData) {
            res.status(401).send({ message: "User not found with this email" })
        }

        // CREATE OTP AND SAVE TO THE DATABASE AND UPDATE THE USER
        const otp = String(Math.floor(100000 + Math.random() * 900000))
        userData.resetOtp = otp
        userData.resetOtpExpireAt = Date.now() + 5 * 60 * 1000 // expire after 5 min from now.

        await userData.save()
            .then(() => {
                res.status(201).send({
                    message: `Hello ! ${userData.fullName} ..!, reset OTP sent to the registered email successfully..!`
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
            subject: ` RESET OTP..! `, // Subject line
            text: `Hello ! ${userData.fullName}, Your password reset OTP is ${otp} Never Share your OTP, or Passcode with anyone, 
                Sharing these details can lead to unauthorised access to your account.`, // plain text body
        }
        try {
            await transporter.sendMail(mailOption);
            console.log("Reset OTP sent to the registered email successfully ..!");
        } catch (error) {
            console.error("Error sending email:", error.message);
            return res.status(500).send({
                message: "Failed to send OTP",
                error: error.message,
            });
        }
        

    } catch (error) {
        return res.status(500).send({
            message: "Something went wrong ..! ",
            error: error.message
        })
    }
}