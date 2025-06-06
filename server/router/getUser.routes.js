import { User } from "../models/user.model.js"

// TEST HOME ROUTES
export const testRoutes = (req, res) => {
    res.status(200).send({
        message: "Hi I am serer, I'm working fine ..!"
    })
}


// LOGIN ROUTES
export const login = async (req, res) => {

    // Getting data from body
    const { email, password } = await req.body

    if (!email || !password || null) {
        res.status(401).send({ message: "Invalid Email and Password" })
    }
    else {

        const userData = await User.findOne({ email: email }).exec()

        if (!userData || null) {
            res.status(401).send({ message: "Invalid Email and Password" })

        }
        else if (email === userData.email){

            const isPasswordMatch = await userData.comparePassword(password)
            if (isPasswordMatch) {

                // JWT TOKEN GENERATE
                const token = await userData.jwtTokenGenerate();
                res.cookie("token" , token , {
                    httpOnly : true,
                    secure : process.env.NODEENV === "production",
                    sameSite : process.env.NODEENV === "production" ? "none" : "strict",
                    maxAge : 7*24*60*60*1000
                })
                res.status(200).send({ message: "User logged In "})

            }
            else {
                res.status(401).send({ message: "Invalid Email and Password" })
            }
        }
        else {
            res.status(401).send({ message: "Invalid Email and Password" })
        }
    }
};