var nodemailer = require("nodemailer");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "uscorein@gmail.com",
      //pass: "a=Amit111/////",
      pass: "Parthu@4911"
    },
  });

  const mailOptions = {
    from: req.body.email, // sender address
    to: "18bmiit079@gmail.com", // list of receivers
    subject: "Enquiry for "+ req.body.message, // Subject line
    html:
      '<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2"><div style="margin:50px auto;width:70%;padding:20px 0"><div style="border-bottom:1px solid #eee"><a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Bhavani Paper Agency (Enquiry)</a></div><p style="font-size:1.1em">Hello Sir/Ma\'am,</p><p> Mail From : ' +
      req.body.email +
      "<br>Customer name : " +
      req.body.name +
      "<br>Contact : " +
      req.body.contact +
      
      '</p><p style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">' +
      req.body.message +
      '</p><p style="font-size:0.9em;">Regards,<br />GHRIT</p><hr style="border:none;border-top:1px solid #eee" /><div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300"></div></div></div>', // plain text body
  };

  // @ts-ignore
  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
      res.status(200).send({ message: "mail sent  successfully" });
    }
  });
});
module.exports = router;
