import mongoose from './mongo.js';

const schema1 = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mobile: {
        type: Number, // Use Number instead of Int32
        required: false
    },
    password: {
        type: String,
        required: true
    }
});

const user = mongoose.model("users", schema1, "users");

export default user;
