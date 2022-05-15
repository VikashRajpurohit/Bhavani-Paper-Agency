const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/Users');
const config = require('config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator/check');


//@route    Get api/auth
//@desc     Test Route
//@access   public

router.get('/', auth,async (req,res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error...');    
    }});

//@route    Post api/auth
//@desc     Authenticate user & get token
//@access   public

router.post('/', [
     check('username', 'Include a valid e-mail').isEmail(),
  ],
async (req, res) => {


    const errors = validationResult(req);
    if (!errors.isEmpty()) {
          return res.status(400).json("abcd");
    }
    else {
        console.log(req.cookies.otps);
        console.log(req.body.otp);

        if((req.cookies.otps)==(req.body.otp)){ 
        const {username} = req.body;

        try {
            let user = await User.findOne({ username });
             
            if (!user)
            {
               return res.status(400).send("invalid cradenitials");
            }

            const payload = {
                user:{
                    id: user.id
                } 
            }

            jwt.sign(payload, config.get('jwtSecret'),
            {expiresIn: 360000},
            (err,token)=>{
               // if(err)throw err;
              
               res.cookie("token",token)
               
                return res.status(210).json({token});
            });

           
        } catch (error) {
           console.error(error.message);
           res.status(500).send('Server error....'); 
        }
    }
    else{
        res.send("Incorrect Otp");
        console.log("Incorrct Otp");
    }
   res.clearCookie('otps');
    }
       
}
);


module.exports = router;   
