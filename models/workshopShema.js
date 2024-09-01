import mongoose from './mongo.js'

const workshopSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    contactName: {
        type: String,
        required: true
    },
    contactEmail: {
        type: String,
        required: true
    },
    contactPhone: {
        type: String,
        required: true
    },
    artType: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    fee: {
        type: Number,
        required: true
    },
    capacity: {
        type: Number,
        required: true
    }
     
});

const Workshop = mongoose.model('Workshop', workshopSchema);

export default Workshop;
