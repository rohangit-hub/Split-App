import { User } from "../models/user.model.js";

export const verifyOtpResetPass = async (req, res) => {

    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
        res.status(401).send({ message: "invalid data ..!" })
    }

    try {
        const userData = await User.findOne({ email: email })
        if (!userData) {
            res.status(401).send({ message: "User not found with this email" })
        }

        if (userData.resetOtp === "" || userData.resetOtp !== otp) {
            res.status(401).send({ message: "Invalid OTP" })
        }
        if (userData.resetOtpExpireAt < Date.now()) {
            return res.status(402).send({
                message: "OTP has expired, Please provide valid OTP..!"
            })
        }

        if (userData.resetOtpExpireAt > Date.now()) {

            // Now hash the new password and save to the database password field.
            const encryptedPassword = await User.hashPassword(newPassword)

            userData.password = encryptedPassword;
            userData.resetOtp = "";
            userData.resetOtpExpireAt = 0;

            await userData.save()
                .then(() => {
                    res.status(201).send({
                        message: `Hello ! ${userData.fullName} ..!, Password reset successfully ..!`
                    })
                }).catch((error) => {
                    res.status(402).send({
                        message: "Password not save ..!",
                        error: error
                    })
                })

        }


    } catch (error) {
        return res.status(500).send({
            message: "Something went wrong ..! ",
            error: error.message
        })
    }
}