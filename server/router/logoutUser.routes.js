// LOGOUT ROUTES
export const logout = (req, res) => {
    res.clearCookie("token" , {
        httpOnly : true,
        secure : process.env.NODEENV === "production",
        sameSite : process.env.NODEENV === "production" ? "none" : "strict",
    })
    res.status(200).send({
        message: "User logout ..!"
    })
}