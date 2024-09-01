import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import bcrypt from 'bcryptjs'; // Import bcryptjs for password hashing
import bodyParser from 'body-parser';
import user from './models/User.js';
import multer from 'multer';
import addart from './models/addArt.js';
import Cart from './models/cart.js';
import fs from 'fs';
import navigateRouter from './routes/navigations.js';
import dataRouter from './routes/imagedata.js';
import cartRouter from './routes/cartdata.js';
import informationRouter from './routes/information.js';

var primary_key = "";

const app = express();
const port = 5000;

app.use(express.json())

app.use(bodyParser.urlencoded({ extended: true }));
 

// Get the directory name using import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the public folder

app.use('/css_pages', express.static(path.join(__dirname, "./css_pages")));
app.use('/html_pages',express.static(path.join(__dirname,"./html_pages")))
app.use('/svgs',express.static(path.join(__dirname,"./svgs")));
app.use('/scripts', express.static(path.join(__dirname, './scripts')));
app.use('/arts',express.static(path.join(__dirname,"./arts")));


app.use(express.urlencoded({ extended: true }));

//routes 
app.use('',navigateRouter);
app.use('/image-data',dataRouter);
app.use('/mycart',cartRouter);
app.use('/info',informationRouter)


//  fetching user details
app.get('/users/details',(req,res)=>{
    user.findOne({ email: primary_key }) // Assuming you only expect one user to be found
        .then((data) => {
            if (!data) {
                throw new Error("User not found");
            }
            res.status(200).json(data);  
        })
        .catch((error) => {
            console.error("Error fetching username:", error);
            res.status(500).json({ error: "Could not fetch the name" });
        });
});
   
//edit profile
app.post('/edit_profile', async (req, res) => {
    const { name, email, mobile, password, newPassword } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
    }

    try {
        // Find the user by email
        const foundUser = await user.findOne({ email });

        if (!foundUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Check if the password matches
        const passwordMatch = await bcrypt.compare(password, foundUser.password);

        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        // Update user's details
        foundUser.name = name || foundUser.name; // Update name if provided
        foundUser.mobile = mobile || foundUser.mobile; // Update mobile if provided

        // Update password if newPassword is provided
        if (newPassword) {
            const hashedPassword = await bcrypt.hash(newPassword, 10); // Hash the new password
            foundUser.password = hashedPassword; // Update the password
        }

        await foundUser.save(); // Save the updated user details

        res.status(200).json({ message: "Profile updated successfully" });
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

 

app.use((req, res, next) => {
    console.log(`${req.method} request received for ${req.url}`);
    next();
});


const Storage = multer.diskStorage({
    destination:'uploads',
    filename:(req,file,cb)=>{
        cb(null,file.originalname);
    }
})

const upload = multer({
    storage:Storage
}).single('image_upload')

app.post('/upload', upload, async (req, res) => {
    try {
        // Access uploaded file details using req.file
        const newImage = await addart.create({
            email:primary_key,
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            image: {
                data: req.file.filename,
                contentType: 'image/png'
            }
        });

        await newImage.save(); // Save the new image data to the database

        res.sendFile(path.join(__dirname,'./html_pages/profilePage.html')); // Send success response
    } catch (err) {
        console.error(err);
        res.status(500).send("Error uploading image"); // Send error response
    }
});

//user name on profile
app.get('/username', (req, res) => {
    user.findOne({ email: primary_key }) // Assuming you only expect one user to be found
        .then((data) => {
            if (!data) {
                throw new Error("User not found");
            }
            res.status(200).json({ name: data.name }); // Sending only the name property
        })
        .catch((error) => {
            console.error("Error fetching username:", error);
            res.status(500).json({ error: "Could not fetch the name" });
        });
});



app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Check if username and password are provided
    if (!email || !password) {
        return res.status(400).json({ error: "Username and password are required" });
    }

    try {
        // Find the user by email
        const foundUser = await user.findOne({ email: email });

        if (foundUser) {
            // Check if the password matches
            const passwordMatch = await bcrypt.compare(password, foundUser.password);

            if (passwordMatch) {
                // User authenticated successfully
                primary_key = email;
                
                console.log(primary_key);
                res.sendFile(path.join(__dirname, './html_pages/art_collection.html'));
            } else {
                // Invalid credentials
                res.status(401).json({ error: 'Invalid username or password' });
            }
        } else {
            // User not found
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error('Error finding user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

 

// Registration route
app.post('/register', async (req, res) => {
    const { name, email, mobile, password, confirmPassword } = req.body;

    try {
        // Check if passwords match
        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Passwords do not match" });
        }

       
        const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

        // Create a new user with hashed password
        const newUser = await user.create({
            name: name,
            email: email,
            mobile: mobile,
            password: hashedPassword // Save the hashed password
        });

        await newUser.save();

        // Send a success response
        primary_key = email;
        res.sendFile(path.join(__dirname, './html_pages/art_collection.html'));
    } catch (error) {
        // Handle any errors
        console.error("Error registering user:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Route to handle adding items to the cart
app.post('/add_to_cart', async (req, res) => {
    const item = req.body.item;
    console.log("Item ID:", item);
    console.log("Email:", primary_key);
    try {
        // Check if the item is already in the cart
        const existingCartItem = await Cart.findOne({ email: primary_key, itemId: item });

        if (!existingCartItem) {
            // Item not found in cart, push it
            await Cart.create({
                email: primary_key,
                itemId: item // Assuming item is the _id of a document from the Addart collection
            });
            console.log('Item added to cart');
             
            res.status(200) 
        } else {
            // Item already exists in cart
            console.log('Item already exists in cart');
            res.status(400);
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});


app.post('/delete-post', async (req, res) => {
    try {
        const id = req.body.item;
        // Assuming addart is the model for your MongoDB collection
        await addart.deleteOne({_id: id});
        await Cart.deleteOne({itemId:id})
        res.status(200).send("Post deleted successfully");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error deleting post");
    }
});

app.post('/remove-cart-item', async (req, res) => {
    try {
        const id = req.body.item;
        // Assuming addart is the model for your MongoDB collection
        await Cart.deleteOne({_id: id});
        res.status(200).send("Post deleted successfully");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error deleting post");
    }
});

app.listen(port,()=>{
    console.log("server connected on :: ",port);
})

export { primary_key };