import { Group } from "../models/group.model.js"
import {User} from "../models/user.model.js"


export const splitAddMembers = async (req,res) =>{

    // get the member unique userID from body
    const {groupKey , userName} = req.body;

    if(!groupKey || !userName){
        return res.status(401).send({ message: "Please provide the correct usernameand group key" })
    }

    const groupData = await Group.findOne({groupKey : groupKey}).exec()
    try {
        if(!groupData || null){
            return res.status(401).send({ message: "Group not present ..!" })
        }
        if(groupData){
            const userData = await User.findOne({userName : userName})
            groupData.members.push(userData._id)
        }

        // now save the data
        await groupData.save()
        .then(() => {
            res.status(201).send({
                message: `${userName} has added to the group ..!`
            })
        }).catch((error) => {
            res.status(402).send({
                message: "something wrong, member not added ..!",
                error: error
            })
        })

        
    } catch (error) {
        return res.status(401).send({ 
            message: "Please provide the correct usernameand group key",
            error: error.message
        })
    }
}