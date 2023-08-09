const express = require('express');
const path = require('path');
const port = 8000;
const db=require('./config/mongoose');
const Contact = require('./models/contact');
const app = express();
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));
// middleware1
// app.use(function(req, res, next){
   

//     req.myName = "Arpan"
//     // console.log('middleware 1 called');
//     next();
// });

// // middleware2
// app.use(function(req, res, next){
    
//     console.log('My name called from MW2', req.myName);
//     // console.log('middleware 2 called');
//     next();
// });
var contactList = [
    {
        name: "Arpan",
        phone: "1111111111"
    },
    {
        name: "Tony Stark",
        phone: "1234567890"
    },
    {
        name: "Coding Ninjas",
        phone: "12131321321"
    }
]

app.get('/', function(req, res){
   
    Contact.find({}, function(err, contacts){
        if(err){
            console.log("error in fetching contacts from db");
            return;
        }
        return res.render('home',{
            title: "Contact List",
            contact_list: contacts
        });

    })
  
})
app.post('/create-contact', function(req, res){
   // contactList.push(req.body);
   // return res.redirect('/');
   Contact.create({
    name: req.body.name,
    phone: req.body.phone
}, function(err, newContact){
    if(err){console.log('Error in creating a contact!')
        return;}
        console.log('******', newContact);
        return res.redirect('back');
})

});

app.get('/profile',function(req,res)
{ //console.log('from the get route controller', req.myName);
    return res.render('profile',{title:"just go to hell"});
});




app.listen(port, function(err){
    if (err) {
        console.log("Error in running the server", err);
    }
    console.log('Yup!My Server is running on Port', port);
})
// for deleting a contact
app.get('/delete-contact/', function(req, res){
    console.log(req.query);
    let id = req.query.id

    Contact.findOneAndDelete(id, function(err){
        if(err){
            console.log('error in deleting the object');
            return;
        }
        return res.redirect('back');
    })


   
});