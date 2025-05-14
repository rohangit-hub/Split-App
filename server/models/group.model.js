import mongoose from "mongoose"

const groupSchema = new mongoose.Schema({
    name: {type: String , required: true},
    groupKey : {type: String , required: true, unique:true},
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }]
}, { timestamps: true })


// MODEL DEFINE
export const Group = mongoose.model("Group" , groupSchema)