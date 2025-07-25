const express = require('express');
const router = express.Router();
const ScreenTime = require('../models/screentime')
const { authenticateUser } = require('../middleware/auth');
const moment = require('moment');

router.post('/log',authenticateUser,async (req,res) => {
    try {
        const { minutes } = req.body;
        const userId=req.user.userId;
        const today = moment().format('YYYY-MM-DD');

        let record= await ScreenTime.findOne({ user: userId , date : today });
        if(record){
            record.totalMinutes+= minutes;
            await record.save();
        }
        else{
            record = await ScreenTime.create({ 
                user:userId,
                date: today,
                totalMinutes:minutes
            });

        }
        res.status(200).json({ message: 'Screen time updated ', data: record});

    }
    catch(error){
        console.error('error logging screen time :',error);
        res.status(500).json({ message: ' error logging screen time :', error });

    }
        
    
});

router.get('/today',authenticateUser, async (req, res) => {
    try{
        const userId=req.user.userId;
        const today= moment().format('YYYY-MM-DD');
        const record = await ScreenTime.findOne({ user:userId,date:today}) || { totalMinutes:0};
        res.status(200).json({ totalMinutes : record.totalMinutes});
    }
    catch(error){
        console.error(" error in the today screen time ",error);
        res.status(500).json({ message: "error in server ", error });
    }
    
});

router.get('/history',authenticateUser, async(req, res) => {
try{
    const iserId=req.user.userId;
    const fromdate= moment().subtract(6,'days').format('YYYY-MM-DD');

    const todate = moment().format('YYYY-MM-DD');

    const history = await ScreenTime.find({
        user: userId,
        date:{ $gte: fromdate, $lte : todate }
    });

    res.status(200).json({ history });
}
catch(error){
    console.error(" error in the history screen time ",error);
    res.status(500).json({ message: "error in server ", error });
}

});

module.exports = router;