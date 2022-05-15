const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const gravator = require('gravatar');
const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../../models/Users');
const auth = require('../../middleware/auth');





//@route    Post api/user
//@desc     Register User
//@access   public

router.post('/',
async (req, res) => {
 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    else {
        
        // console.log(req.cookies.otps);
        // console.log(req.body.otp);

        // if((req.cookies.otps)==(req.body.otp)){ 
            const {fname,lname,contact,d_o_b,username} = req.body;

        try {

        

            let user = await User.findOne({ username });
            
            if (user)
            {
               return res.status(400).json({errors: [{msg: 'Users already exists'}] });
            }


         

            user = new User({
                fname,lname,contact,d_o_b,username
            });

            

             await user.save();

            const payload = {
                user:{
                    id: user.id
                }
            }

            jwt.sign(payload, config.get('jwtSecret'),
            {expiresIn: 360000},
            (err,token)=>{
               // if(err)throw err;
              
               return res.status(210).json({token});
                    
            });

           
        } catch (error) {
           console.error(error.message);
           res.status(500).send('Server error....'); 
        }
    // }
    //     else{
    //         res.send("Incorrect Otp");
    //         console.log("Incorrct Otp");
    //     }
    //    res.clearCookie('otps');

       
    }
    
});


router.post('/del',auth,async (req,res) =>{ 
    try {

        let check = await User.findByIdAndRemove(req.user.id);
           if(check){
               res.json("Data Deleted Successfully")
           } 
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }

});


// router.post('/update',auth,
//     async(req,res)=>{

//         const {fname,lname,contact,address,subcaste,d_o_b} = req.body;


//            let user = new User({
//                 fname,
//                 lname,
//                 contact,
//                 address,
//                 subcaste,
//                 d_o_b
//             });
            
//             try {
//                 let check = await User.findByIdAndUpdate(
//                   req.user.id ,
//                   { $set:{ 
//                         fname:user.fname,
//                         lname:user.lname,
//                         contact:user.contact,
//                         address:user.address,
//                         subcaste:user.subcaste,
//                         d_o_b:user.d_o_b
//                     }
//                     },
//                   { new: true}
//                 );
//                 return res.json(check);
                
//               } catch (err) {
//                 console.error(err.message);
//                 return res.status(500).send('Server Error');
//               }
//     })


    
// router.post('/varify',
// async(req,res)=>{

    
//     console.log(req.body.id);

        
//         try {
//             let check = await User.findByIdAndUpdate(
//               req.body.id ,
//               { $set:{ 
//                 varified:"done"
//                 }
//                 },
//               { new: true}
//             );
//             return res.json(check);
            
//           } catch (err) {
//             console.error(err.message);
//             return res.status(500).send('Server Error');
//           }
// })

//     router.get('/',async (req,res) => {
//         try {
//             const users = await User.find({role:"O",varified:"default"});

//                   users.forEach(function(user) {
//                   //  console.log(user.fname);
//                   });
                  
                 
//                 return res.json(users)
//         } catch (error) {
//             console.error(error.message);
//             res.status(500).send('Server Error...');    
//         }});



//         //get pincode
//         router.post('/pincode',async (req,res)=>{
//             let options = {
//                 provider: 'openstreetmap',
//                 };
            
            
//             let geoCoder = NodeGeocoder(options);
        
//             let st = ""
//             let city = ""
//             let country = ""
//             geoCoder.geocode(req.body.address_pincode)
//             .then((abc)=> {
//                 abc.forEach(function(temp){
//                     const tempsid = temp.formattedAddress.split(",");  
//                     st = tempsid[2].trim()
//                     city = tempsid[1].trim()
//                     country = temp.country.trim()
//                 });
                
//                 res.json({"state":st,"city":city,"country":country})

//             })
//             .catch((err)=> {
//                 console.log(err);
//             });
         
//         });
    


module.exports = router;
