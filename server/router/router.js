// HOME ROUTES
export const testRoutes = (req,res) =>{
    res.status(200).send({
        message : "Hi I am serer, I'm working fine ..!"
    })
}


// GET ROUTES
export const getUsers = (req,res) =>{
    res.status(200).send({
        message : "Get Routes",
    })
}


// Create ROUTES
export const createUsers = (req,res) =>{
    res.status(200).send({
        message : "Create Routes",
    })
}


// DELETE ROUTES
export const removeUsers = (req,res) =>{
    res.status(200).send({
        message : "Delete Routes",
    })
}


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
    })
}




