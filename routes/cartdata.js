import express from 'express'
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = express.Router()
import { primary_key } from '../server.js';
import art_data from '../models/addArt.js';
import cart_data from '../models/cart.js';
import fs from 'fs';


router.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'../html_pages/cart.html'));
})

router.get('/cartData', async (req, res) => {
    try {
        // Fetch cart data for the user
        const data = await cart_data.find({ email: primary_key });
        // Array to store orders
        let orders = [];

        for (const element of data) {
            // Fetch image data for each item in the cart
            const imageData = await art_data.find({ _id: element.itemId }).lean();

            // Convert image data to Base64 strings
            const imageBase64Strings = imageData.map(item => {
                const imageFilePath = path.join(__dirname, '../uploads', item.image.data.toString());
                const imageBase64 = fs.readFileSync(imageFilePath, 'base64');
                return {
                    data: imageBase64,
                    contentType: item.image.contentType,
                    itemId: item._id,
                    name: item.name,
                    price: item.price,
                    description: item.description,
                    id:element._id
                };
            });

            // Push image data into orders array
            orders.push(...imageBase64Strings);
        }

        // Send the orders array as JSON response
        res.status(200).json(orders);
    } catch (error) {
        // Log the error
        console.error('Error fetching data:', error);
        // Send error response
        res.status(500).json({ error: 'Error fetching data' });
    }
});



export default router;