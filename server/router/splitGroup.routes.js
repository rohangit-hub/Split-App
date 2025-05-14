import { Group } from "../models/group.model.js"

export const splitGroup = async (req,res)=>{

    // get data from body
    const {name, groupKey} = req.body;

    if (!name || !groupKey || null) {
        res.status(401).send({ message: "Please provide the correct details" })
    }

    const newGroup = await Group({
        name,
        groupKey
    })


    newGroup.save().then(() => {
        res.status(201).send({
            message: `${newGroup.name} has created..!`
        })
    }).catch((error) => {
        res.status(402).send({
            message: "Group not created",
            error: error
        })
    })
}