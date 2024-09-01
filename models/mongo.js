import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/ArtGallery')
.then(() => {
    console.log("Database connected");
})
.catch((error) => {
    console.error("Failed to connect to database:", error);
});

export default mongoose;