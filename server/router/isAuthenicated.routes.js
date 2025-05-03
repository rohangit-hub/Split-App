export const isAuthenticated = (req,res) =>{
    try {
        return res.status(200).send({"authentication" : true})
        
    } catch (error) {
        return res.status(500).send({
            message: "User not authenticated",
            error: error.message,
        });
    }
    
}