var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")
var nodemailer=require("nodemailer")

const app = express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true  
}) )

/*var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'name',
      pass: 'email'
    }
  });

  var mailOptions = {
    from: 'email',
    to: 'email',
    subject: 'here your login otp',
    text: ``
  };
  transporter.sendMail(mailOptions, function(error, info){
    var seq = (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);
    console.log(seq);
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });*/
  
mongoose.connect('mongodb://localhost:27017/admin',{
    useNewUrlParser:true,
    useUnifiedTopology:true
    
});

var db= mongoose.connection;

db.on('error',()=>console.log("error in connecting to database"));
db.once('open',()=>console.log("connected to databse"))



app.post("/sign_in",(req,res)=>{
    var name = req.body.name;
    var email= req.body.email;
    var otp=req.body.otp;

    var data={
        "name":name,
        "email":email,
        "otp":otp
    }
    db.collection('login').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("record inserd successfully!");
    });
    return res.redirect('signup_success.html');
})



app.get("/",(req,res)=>{
    res.send({
        "Allow-access-Allow-Origin": '*'
    })
    return res.redirect('login.html');
}).listen(3000);

console.log("listening on PORT 3000")
