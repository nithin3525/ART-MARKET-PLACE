import mongoose from "./mongo.js";

const schema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    itemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Addart', // Reference to the Addart model
        required: true
    }
});

const Cart = mongoose.model("Cart", schema, "Cart");

export default Cart;
