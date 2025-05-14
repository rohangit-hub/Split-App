import { Group } from "../models/group.model.js";
import { User } from "../models/user.model.js"
import { Expense } from "../models/expense.model.js"

export const expense = async (req, res) => {

    //get data from body
    const { groupName, member, receive } = req.body; // provide the userNeme in member

    if (!groupName || !member || !receive) {
        res.status(401).send({ message: "Please provide the correct details" })
    }
    
    const userData = await User.findOne({ _id: member }).exec();
    
    const newExpense = new Expense({
        groupName,
        member,
        receive : receive += receive,
    })

    newExpense.save().then(() => {
        res.status(201).send({
            message: `${userData.fullName} expenses has updated..!`
        })
    }).catch((error) => {
        res.status(402).send({
            message: "Something went wrong22 ..!",
            error: error
        })
    })

}