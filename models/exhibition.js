import mongoose from './mongo.js';

const exhibitionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    artists: {
        type: [String],
        required: true
    },
    description: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    contact: {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        }
    }
});
const Exhibition = mongoose.model('Exhibition', exhibitionSchema);
export default Exhibition;
