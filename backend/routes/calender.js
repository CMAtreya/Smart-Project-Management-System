const express = require('express')
const router = express.Router();
import calender from '../models/calender';


router.post('/calender', async (req,res) =>{
    const data = req.body;
    if(!data.decription || !data.event || !)
})