import jwt from "jsonwebtoken"

export const verifyUserIdAndOtp = async (req, res, next) => {

    // Verify Token via cookies
    const { token } = req.cookies

    if (!token) return res.status(401).send({
        message: `Unauthorized User!`,
    })

    try {
        // Verify the token
        const decodedData = jwt.verify(token, process.env.JWTSCERET)

        if (decodedData && decodedData._id) {
            req.body.userId = decodedData._id;
            next();
        }
        else {
            return res.status(401).send({
                message: `Unauthorized User!`,
            })

        }


    } catch (error) {
        return res.status(401).send({
            message: `Bad request`
        })
    }
}