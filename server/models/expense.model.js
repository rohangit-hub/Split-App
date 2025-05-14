import mongoose from "mongoose"

// SCHEMA DEFINE
const expenseSchema = new mongoose.Schema({
    groupName: {type : String , require : true},

    member: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    pay:{type:Number , default:0},
    receive:{type:Number , default:0},
    final:{type:Number, default :0},

}, { timestamps: true })


// MODEL DEFINE
export const Expense = mongoose.model("Expense" , expenseSchema)

