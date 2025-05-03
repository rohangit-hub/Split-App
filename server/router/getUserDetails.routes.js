import { User } from "../models/user.model.js"

export const getUserDetails = async (req, res) => {

    try {
        const { userId } = req.body;
        const userData = await User.findOne({ _id: userId }).exec();

        if (!userData || null) {
            return res.status(402).send({
                message: "User not found ..!"
            })
        }
        return res.status(201).send({
            message: "User Details",
            data : {
                fullName : userData.fullName, 
                email : userData.email,
                isAccountVarified : userData.isAccountVarified
            }
        })

    } catch (error) {
        return res.status(500).send({
            message: "Something went wrong",
            error: error.message
        })
    }



}