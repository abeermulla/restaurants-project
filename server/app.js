const express = require('express')
const mysql = require('mysql')
const app = express()
const cors = require('cors');
const cookieParser = require('cookie-parser')
const refreshfunc = require('./myRepository').refresh
app.use(cors({ origin: "http://localhost:3000", optionsSuccessStatus: 200 }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static('build'));
const path = require('path');

// const root = require('path').join(__dirname, 'build')
// app.use(express.static(root));
// app.get("*", cors(), (req, res) => {
//     res.sendFile('index.html', { root });
// })



app.use(function (req, res, next) {
    console.log('Time:', Date.now())
    console.log("inside middleware to call refresh");
    let x = refreshfunc(req, res);
    console.log("refresh returned status = ", x);
    res.myStatusCode = x;
    next();
})



app.use('/business', require('./myRoute'));

app.use('/users', require('./myRoute'));

app.use('/commentsandrating', require('./myRoute'));

app.use('/tablereservation', require('./myRoute'));


//------------------------------------------------
const port = process.env.PORT || 5789;
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})