//import important package: express, mongoose, cors(for API).
//configure them
//creating Route

import express from "express";
import cors from "cors";
import mongoose from "mongoose";

const app = express();
app.use(express.json());
// app.use(express.urlencoded());
app.use(cors());

//to connect to the DB use mongoose

mongoose.connect("mongodb://127.0.0.1:27017/myLoginDB", {
useNewUrlParser: true,
  useUnifiedTopology: true,
});

//Creating Routes

app.get("/login/:username", (req, res) => {
  console.log(req.params)
  User.findOne({username: req.params.username})
  .then((user)=>{
    if(user){
      res.send({message: 'Login successful!',...user})
    }else{
      res.send({message: 'Login failed!'})
    }
  })

});

app.get('/home/:user',(req,res)=>{
  console.log('params: ', req.params)
  User.findOne({username: req.params.user})
    .then((user)=>{
      if(user){
        res.send({...user})
      }else{
        res.send({message: 'User not found!'})
      }
  })
})

app.post('/register', (req, res)=>{

  User.findOne({username: req.body.username})
  .then((user)=>{
    if(user){
      res.send({message: 'User already registered!'})
    }else{
      // const new_user = {...req.body}
      const user = new User(
        req.body
      )
      user.save()
      .then(() => res.send(JSON.stringify(user)))
      .catch((err)=>console.log(err)) 
    }
  })
          
})

app.put('/update', (req,res)=>{
  User.findOneAndUpdate({username: req.body.username},{...req.body}, {new: true})
   .then((user) => {
     user.save();
     res.send(JSON.stringify(user))
   })
})
 

const userSchema = new mongoose.Schema({
    username: String,
    name: String,
    email: String,
    phone: Number,
    password: String,
})

const User = new mongoose.model('User', userSchema)

app.listen(9002, () => {
  console.log("Backend running!");
});

