//applications

const express = require('express');
const app = express();
const bodyparser = require("body-parser")
const session = require("express-session")
const {v4:uuidv4} = require("uuid")
var fs = require("fs")

//variable declarations
const port = 3001;
const credential = {
    Username : "juandelacruz@gmail.com",
    Password : "delacruz",
}
//use
app.use('/css', express.static(__dirname+ '/public'))
app.use('/js', express.static(__dirname+ '/public'))

app.use(express.static('public'))
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended: true}))
app.use(express.json());       
app.use(express.urlencoded({extended: true})); 

app.use(session({
    secret: uuidv4(),
    resave: false,
    saveUninitialized: true
}))

//set

app.set('view engine', 'ejs')
app.set('views', './views')

//get

app.get('', (req, res)=> {
    res.render('homepage')
})

app.get('/', (req, res)=> {
    res.render('fundtransfer')
})

app.get('/homepage', (req, res)=> {
    res.render('homepage')
})

app.get('/accounts', (req, res)=> {
    res.render('accounts')
})

app.get('/fundtransfer', (req, res)=> {
    res.render('fundtransfer')
})
app.get('/registration', (req, res)=> {
    res.render('registration')
})

//post

app.post('/login', (req, res)=>{
    if(req.body.Username == credential.Username && req.body.Password == credential.Password){
        req.session.user = req.body.Username;
        res.redirect("accounts")
    }else{
        res.end("Invalid Username or Password")
    }
})

//listen

app.listen(3000);
console.log("Running on port " + port);