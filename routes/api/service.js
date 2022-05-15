const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const config = require('config');
const jwt = require('jsonwebtoken');
const Service = require('../../models/Service');
const cors = require("cors");
const auth = require('../../middleware/auth');
var mongoose = require('mongoose');


router.post('/',auth,cors(),
async (req,res) =>{ 
    
    const errors = validationResult(req);
    
    if(!errors.isEmpty)
    {
        return  res.status(400).json({errors : errors.array()});
    }    

    
    if (!req.files) {
        console.log(req.files);
        return res.send(`Please Upload a file`);
    }
  
    const file = req.files.img;

    console.log("photoname " +  file.name);
    console.log(req.body.sname)
  
     if (!file.mimetype.startsWith("image")) {
      return res.send("Please upload an image");
    }
  
    //Check file size
    if (file.size > process.env.MAX_FILE_UPLOAD) {
      return res.send("Please upload an image less than" +process.env.MAX_FILE_UPLOAD )
      
    }
  
    //Create Custom filename
    file.mv(`${"./public/uploads"}/${file.name}`, async (err) => {
      if (err) {
        console.error(err);
        return res.send("File Upload Problem");
      }
    });

    const {
        stid,
        sname,
        img,
        sdescription
    }=req.body;

    
    let service = new Service({stid,sname,img,sdescription});
     service.img=file.name
     console.log(stid)
    service.stid=mongoose.Types.ObjectId(stid); 

    await service.save();
   
    const payload = {
        service: {
            id: service.id
        }
    }
    jwt.sign(payload, config.get('jwtSecret'),
    {expiresIn: 360000},
    (err,token)=>{
        if(err)throw err;
            res.json({token});
    });
   
})




// router.post('/update',
//     async(req,res)=>{

//         const {
//             stid,
//             sname,
//             sfees,
//             slocation,
//             sdescription
//         }=req.body;
      
//         let service = new Service({stid,sname,sfees,slocation,sdescription});
//         service.sdescription = sdescription.split(",");
//         try {
//                 console.log(await req.service.id)
//              let check = await Service.findByIdAndUpdate(
//                   req.service.id,
//                   { $set:{ 
//                       sname:service.sname,
//                       sfees:service.sfees,
//                       slocation:service.slocation,
//                       sdescription:service.sdescription
//                   }
//                     },
//                   { new: true}
//                 );
//                 return res.json(check);
                
//               } catch (err) {
//                 console.error(err.message);
//                 return res.status(500).send('Server Error');
//               }
//     })




    // router.post('/getme',servid,async (req,res) =>{ 
    //     try {
    
    //         let check = await Service.findById(req.service.id);
    //            if(check){
    //                res.json(check)
    //            }
    //            else{
    //             res.json("Not found") 
    //            } 
    //     } catch (error) {
    //         console.error(error.message);
    //         res.status(500).send('Server Error');
    //     }
    
    // });
    

router.post('/delete',auth,async (req,res) =>{ 
    try {

        let check = await Service.findByIdAndRemove(req.body.id);
           if(check){
               res.json("Data Deleted Successfully")
           } 
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }

});

router.get('/',async (req,res) => {
    try {
        const user = await Service.find();
        //res.send(user);
        console.log("Abcd");
        res.send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error...');    
    }});


module.exports = router;