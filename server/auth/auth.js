import jwt from "jsonwebtoken"

export const jwtTokenVerify = async (req, res, next) => {

    // Veriy Headers Authentication
    const auth = req.headers.authorization

    if (!auth) return res.status(401).send({
        message: `User unauthorized ..!`,
    })

    // Verify Token
    const token = req.headers.authorization.split(' ')[1];
    if (!token) return res.status(401).send({
        message: `User unauthorized invalid token ..!`,
    })

    try {
        // Verify the token
        const decodedData = jwt.verify(token, process.env.JWTSCERET)

        // ATTACHING THE TOKEN DATA INTO THE USER REQUEST
        req.userPayload = decodedData
        next()

    } catch (error) {
        return res.status(401).send({
            message: `Bad request`
        })
    }
}