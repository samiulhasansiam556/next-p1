
import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
    title : {type:String,require:true},
    desc : { type:String}
})

const TodoModel = mongoose.models.TodoApp || mongoose.model("TodoApp",TodoSchema)

export default TodoModel;