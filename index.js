var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")

const app = express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true  
}) )

mongoose.connect('mongodb://localhost:27017/admin',{
    useNewUrlParser:true,
    useUnifiedTopology:true
    
});

var db= mongoose.connection;

db.on('error',()=>console.log("error in connecting to database"));
db.once('open',()=>console.log("connected to databse"))

app.post("/sign_up",(req,res)=>{
    var name=req.body.name;
    var email= req.body.email;
    var password=req.body.password;

    var data={
        "name": name,
        "email": email,
        "password" :password
    }
    db.collection('users').insertOne(data,(err,collection)=>{
        if(err){
            throw err;

        }
        console.log("record insert successfully");
    });
    return res.redirect('login.html');
})



app.get("/",(req,res)=>{
    res.send({
        "Allow-access-Allow-Origin": '*'
    })
    return res.redirect('index.html');
}).listen(3000);

console.log("listening on PORT 3000")



