const mongoose = require("mongoose")

let User_taskSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    task:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"task"
    },
    module:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"module"
    },
    project:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"project"
    }
    
})

let User_taskModel = mongoose.model("UserTask",User_taskSchema)
module.exports = User_taskModel