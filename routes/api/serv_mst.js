const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const config = require('config');
const jwt = require('jsonwebtoken');
const Serv_mst = require('../../models/Serv_mst');
const auth = require('../../middleware/auth');
const User = require('../../models/Users');

router.post('/',auth,[
    check ('servicecategories','Service type is required').not().isEmpty()
],

async (req,res) =>{ 
    const errors = validationResult(req);
    if(!errors.isEmpty)
    {
        return  res.status(400).json({errors : errors.array()});
    }    
        
         const {servicecategories,description,fid} = req.body;
        console.log(req.body)
        try{

        let service = new Serv_mst({servicecategories,description});

        await service.save();
        service.fid=service.id;
        await service.save();
        const payload = {
            service:{
                id: service.id
            }
        }

        jwt.sign(payload, config.get('jwtSecret'),
        {expiresIn: 360000},
        (err,token)=>{
           // if(err)throw err;
                res.json({token});
        });
        console.log(servicecategories);
        
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send('Server error....'); 
     }
    
});


router.delete('/',auth,async (req,res) =>{ 
    try {
        let tid= req.body.id; 
        console.log(tid);
        const decoded = jwt.verify(tid, config.get('jwtSecret'));
    
        let check = await Serv_mst.findByIdAndRemove(decoded.service.id);
           if(check){
               res.json("Data Deleted Successfully")
           } 
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

    router.get('/',auth,async (req,res) => {
    try {
        const user = await Serv_mst.find();
        //res.send(user);
        console.log("Abcd");
        res.send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error...');    
    }});

module.exports = router;