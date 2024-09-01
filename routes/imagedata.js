import express from 'express'
 
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = express.Router()
import { primary_key } from '../server.js';
import art from '../models/addArt.js';
import Cart from '../models/addArt.js'
import fs from 'fs';

router.get('/images', async (req, res) => {
    try {
        // Exclude data corresponding to a specific email
        const excludedEmail = primary_key;
         
        const imageData = await art.find({ email: { $ne: excludedEmail } }).lean();
// Map the imageData to construct the path to the uploaded images
const imagePaths = await Promise.all(imageData.map(async item => {
    const itemId = item._id.valueOf();
    let btn = false; // Initialize btn for each item iteration

    try {
        const cartItem = await Cart.findOne({ itemId: itemId });
        if (cartItem) {
            console.log('Item found in cart:', cartItem);
            btn = true;
        } else {
            console.log('Item not found in cart');
        }
    } catch (error) {
        console.error('Error finding cart item:', error);
        throw error; // Propagate the error to the catch block
    }

    return ({
        data: path.join(__dirname, '../uploads', item.image.data.toString()), // Convert buffer to string and then construct the path
        contentType: item.image.contentType,
        itemId: itemId,
        name: item.name,
        description: item.description,
        btn: btn
    });
}));
        // Map the imageData to convert Binary data to Base64 strings
        const imageBase64Strings = imagePaths.map(item => {
            return ({
                data: fs.readFileSync(item.data, 'base64'), // Read the image file and convert it to Base64
                contentType: item.contentType,
                itemId: item.itemId,
                name: item.name,
                description: item.description,
                btn: item.btn
            })
             
        });

        // Send the Base64 encoded image data as a response
        res.status(200).json(imageBase64Strings);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Error fetching data' });
    }
});


router.get('/profile-posts', async (req, res) => {
    try {
        const imageData = await art.find({ email: primary_key} ).lean();
        // Map the imageData to construct the path to the uploaded images
        const imagePaths = imageData.map(item => {
            const itemId = item._id.valueOf();
            return ({
                data: path.join(__dirname, '../uploads', item.image.data.toString()), // Convert buffer to string and then construct the path
                contentType: item.image.contentType,
                itemId: itemId,
                name: item.name,
                description: item.description
            })
        });

        // Map the imageData to convert Binary data to Base64 strings
        const imageBase64Strings = imagePaths.map(item =>{
            return ({
                data: fs.readFileSync(item.data, 'base64'), // Read the image file and convert it to Base64
                contentType: item.contentType,
                itemId:item.itemId,
                name: item.name,
                description: item.description
            })
        } );
         
        // Send the Base64 encoded image data as a response
        res.status(200).json(imageBase64Strings);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Error fetching data' });
    }
});

export default router;