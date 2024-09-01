import express from 'express'
import session from 'express-session';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = express.Router()

router.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: true
}));

// Middleware to check if user is authenticated
function isAuthenticated(req, res, next) {
    if (req.session && req.session.user) {
        return next();
    } else {
        res.status(401).sendFile(path.join(__dirname,'../html_pages/art_collection.html'));
    }
}

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
});

router.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
});

router.get('/logout',(req,res)=>{
     
    res.sendFile(path.join(__dirname,'../index.html'));
})

//artcollection page
router.get('/html_pages/art_collection.html',(req,res)=>{
    res.sendFile(path.join(__dirname, '../html_pages/art_collection.html'));
})

router.get('/editProfile.html',(req,res)=>{
    res.sendFile(path.join(__dirname, '../html_pages/editProfile.html'));
})

router.get('/artcollection',  (req, res) => {
     
    res.sendFile(path.join(__dirname, '../html_pages/art_collection.html'));
    
});
 
router.get('/html_pages/create.html',(req,res)=>{
    res.sendFile(path.join(__dirname,'../html_pages/art_collection.html'))
})

router.get('/create.html',(req,res)=>{
    res.sendFile(path.join(__dirname,'../html_pages/create.html'))
})

router.get('/profilePage.html',(req,res)=>{
    res.sendFile(path.join(__dirname,'../html_pages/profilePage.html'))
})
 
router.get('/html_pages/profilePage.html',(req,res)=>{
    res.sendFile(path.join(__dirname,'../html_pages/profilePage.html'))
})
 
router.get('/exhibition',(req,res)=>{
    res.sendFile(path.join(__dirname,'../html_pages/add-exhibition.html'))
})

router.get('/workshop',(req,res)=>{
    res.sendFile(path.join(__dirname,'../html_pages/postworkshop.html'))
})

router.get('/exhibitions',(req,res)=>{
    res.sendFile(path.join(__dirname,'../html_pages/exhibitions.html'))
})

router.get('/checkout',(req,res)=>{
    res.sendFile(path.join(__dirname,'../html_pages/checkout.html'))
})

router.get('/workshops',(req,res)=>{
    res.sendFile(path.join(__dirname,'../html_pages/workshops.html'))
})
export default router
