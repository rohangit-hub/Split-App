// UPDATE ROUTES
export const updateUsers = (req,res) =>{
    res.status(200).send({
        message : "Update ROutes",
    })
}


// PATCH ROUTES
export const patchUsers = (req,res) =>{
    res.status(200).send({
        message : "Upgreade Routes",
        cookies : req.cookies.token // Brouser sent the cookies in every request sent from that 
        
    })
}