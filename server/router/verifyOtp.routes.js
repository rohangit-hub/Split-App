import { User } from "../models/user.model.js";
import dotenv from "dotenv"
dotenv.config()

/// VERIFY OTP ROUTES
export const verifyOtp = async (req, res) => {
    try {
        // console.log(req.body)
        const {userId ,otp} = req.body;

        const userData = await User.findOne({_id : userId}).exec();

        if (!userData || !otp || null) {
            return res.status(402).send({
                message: "User not found ..!"
            })
        }

        if(userData.isAccountVarified === true){
            return res.status(201).send({
                message: "User is already verified..!"
            })
        }

        if(userData.verifyOtp ===" " || userData.verifyOtp !==otp){
            return res.status(402).send({
                message: "Invalid OTP ..!"
            })
        }

        if(userData.verifyOtpExpireAt < Date.now()){
            return res.status(402).send({
                message: "OTP has expired, Please provide valid OTP..!"
            })
        }

        if(userData.verifyOtpExpireAt > Date.now()){
            userData.isAccountVarified = true;
            userData.verifyOtp = "";
            userData.verifyOtpExpireAt = 0;
            
            await userData.save()
            .then(() => {
                res.status(201).send({
                    message: `Hello ! ${userData.fullName} ..!, email verified successfully ..!`
                })
            }).catch((error) => {
                res.status(402).send({
                    message: "Something went wrong ..!",
                    error: error
                })
            })

        }


    } catch (error) {
        return res.status(500).send({
            message: "User Not verified, Missing details.",
            error: error.message
        })
    }
}