const express = require('express');
const fs = require('fs');
const path = require('path');
const port = 80;
const app = express();
// const bodyparser = require('body-parser')  //hasnot been used in this filed
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/dance_website', {useNewUrlParser: true})


//Define mongoose schema
var contactSchema = new mongoose.Schema({
    name: String,
    number: String,
    email: String,
    password: String
});

//Defining a model
var Contact = mongoose.model('contact', contactSchema)

var signSchema = new mongoose.Schema({

    email: String,
    password: String
});

//Defining a model
var sign = mongoose.model('sign', signSchema)

//EXPRESS SPECIFIC STUFF    
app.use('/static', express.static('static')) //For serving static files
app.use(express.urlencoded())

//PUG SPECIFIC STUFF
app.set('view engine', 'pug') //Set the templete engine as pug
app.set('views', path.join(__dirname, 'views')) //Set the views directory

//ENDPOINT
app.get('/',(req,res)=>{
    const params = { }
    res.status(200).render('home.pug',params)
})
app.get('/contact',(req,res)=>{
    const params = { }
    res.status(200).render('contact.pug',params)
})

app.get('/sign_in',(req,res)=>{
    const params = { }
    res.status(200).render('sign_in.pug',params)
})

app.post('/contact',(req,res)=>{
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send("this item has been save to the databased")
        
    }).catch(()=>{
        res.status(400).send("Item was not saved to the database")
    })
    // res.status(200).render('contact.pug',params)
})

app.post('/signin',(req,res)=>{
    var myData = new sign(req.body);
    myData.save().then(()=>{
        // res.send("this item has been save to the databased")
        res.render('home.pug')
    }).catch(()=>{
        res.status(400).send("Item was not saved to the database")
    })
    // res.status(200).render('contact.pug',params)
})

//START THE SERVER
app.listen(port, ()=>{
    console.log(`the application started successfully on part${port}`);
})