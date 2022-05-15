var nodemailer = require("nodemailer");
const express = require("express");
const router = express.Router();
const cors = require("cors");

router.post('/',cors(), async (req, res) => {

  if (req.body.username) {
    var otp1 = Math.floor(100000 + Math.random() * 900000);
    
    console.log(otp1);
    
    res.cookie("otps",otp1);

    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "uscorein@gmail.com",
        pass: "Parthu@4911",
      },
    });

    const mailOptions = {
      from: "uscorein@gmail.com", // sender address
      to: req.body.username, // list of receivers
      subject: "Wedding Organizers Signup OTP", // Subject line
      html:
        '<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2"><div style="margin:50px auto;width:70%;padding:20px 0"><div style="border-bottom:1px solid #eee"><a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Wedding Organizers</a></div><p style="font-size:1.1em">Hi,</p><p>Thank you for choosing Wedding Organizers. Use the following OTP to complete your Sign Up procedures. OTP is valid for 5 minutes</p><h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">' +
        otp1 +
        '</h2><p style="font-size:0.9em;">Regards,<br />Project Team</p><hr style="border:none;border-top:1px solid #eee" /><div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300"><p>Wedding Organizers</p><p>Grp -1 , Fullstack project</p><p>Sem 8 Msc IT, Bmiit</p></div></div></div>', // plain text body
    };
   // @ts-ignore
   transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
     return res.status(400).send({ message: err });
    } else console.log(info);

    return res.status(200).send({ message: "otp sent  successfully" });
  });
} else {
  return res.status(400).send("mail error");
}
});
module.exports = router;