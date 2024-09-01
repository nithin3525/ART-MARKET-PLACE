import mongoose from "./mongo.js";

const schema2 = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type:String,
        required: true
    },
    price:{
        type:Number,
        required:true
    },
    image:{
        data:Buffer,
        contentType:String
    } 
});

const addart = mongoose.model("Arts", schema2, "Arts");

export default addart;
