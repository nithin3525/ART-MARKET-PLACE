import express from 'express'
 
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = express.Router();
import Exhibition from '../models/exhibition.js'
import Workshop from '../models/workshopShema.js';
import fs from 'fs';


router.post('/add-exhibition', async (req, res) => {
    try {
        const { title, date, artists, description, location, contactName, contactEmail, contactPhone } = req.body;

        // Create a new Exhibition instance
        const newExhibition = new Exhibition({
            title,
            date,
            artists: artists.split(','), // Split artists by comma to create an array
            description,
            location,
            contact: {
                name: contactName,
                email: contactEmail,
                phone: contactPhone
            }
        });

        // Save the new exhibition to the database
        const savedExhibition = await newExhibition.save();

        res.status(201).json(savedExhibition);
    } catch (error) {
        console.error('Error adding exhibition:', error);
        res.status(500).json({ error: 'Error adding exhibition' });
    }
});

router.get('/get-exhibitions', async (req, res) => {
    try {
        console.log("exhibitions")
        const currentDate = new Date();
        const exhibitions = await Exhibition.find({ date: { $gte: currentDate } });
        console.log(exhibitions)
        res.json(exhibitions);
    } catch (error) {
        console.error('Error fetching exhibitions:', error);
        res.status(500).json({ error: 'Error fetching exhibitions' });
    }
});

router.post('/add-workshop', async (req, res) => {
    try {
        // Create a new workshop object based on the request body
        const newWorkshop = new Workshop({
            title: req.body.title,
            description: req.body.description,
            date: req.body.date,
            time: req.body.time,
            location: req.body.location,
            contactName: req.body.contactName,
            contactEmail: req.body.contactEmail,
            contactPhone: req.body.contactPhone,
            artType: req.body.artType,
            duration: req.body.duration,
            fee: req.body.fee,
            capacity: req.body.capacity,
        });

        // Save the new workshop to the database
        const savedWorkshop = await newWorkshop.save();

        res.sendFile(path.join(__dirname,'../html_pages/profilePage.html'));
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/workshops', async (req, res) => {
    try {
        const currentDate = new Date();
        const workshops = await Workshop.find({ date: { $gte: currentDate } });
        res.json(workshops);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


export default router;

