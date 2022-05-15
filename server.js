const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const session = require("express-session");
const app = express();
const cookieParer = require('cookie-parser');
const bodyParser = require('body-parser');
const fileupload = require('express-fileupload');

//Database Check
connectDB();


//Init Middleware
app.use(express.json({ extended: false }));
const oneDay = 1000 * 60 * 60 * 24;
app.use(
  session({
    key: "userId",
    secret: "abcdefghijklmno",
    saveUninitialized: false,
    cookie: { maxAge: oneDay },
    resave: true
  })
);

app.use(fileupload());

app.use(cors({
  origin: ["http://localhost:3000"],
  methods: ["GET", "POST"],
 credentials: true
}
));




app.use('/images', express.static('public/uploads'));

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.use(cookieParer());
app.use(bodyParser.urlencoded({ extended: true }));

//Api Check
app.get('/', (req, res) => res.send("APi running"));

//Route Check
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/serv_mst', require('./routes/api/serv_mst'));
app.use('/api/service', require('./routes/api/service'));
app.use('/api/otp', require('./routes/api/email')); 
app.use('/api/sendmail', require('./routes/api/sendmail'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
