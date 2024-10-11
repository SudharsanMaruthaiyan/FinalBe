const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// connect mongodb 
const mongoURL ="mongodb+srv://sudharsan6078:CSSe0IXzlDA2xzCj@done.l9ghk.mongodb.net/";
// CSSe0IXzlDA2xzCj
mongoose.connect(mongoURL)

const detailSchema = new mongoose.Schema({
    name:String,
    dept:String,
    college:String,
})

const details = mongoose.model('detail', detailSchema);

app.get('/', async (req,res)=>{
    try{
        const data = await details.find();
        res.json({data , message:"data display"})
    }
    catch(err){
        res.status(400).json({message:err.message})
    }
})

app.post('/', async (req,res)=>{
    const data = new details(req.body);
    try{
        const savedata = await data.save();
        res.json({savedata, message:"data updated"});
    }
    catch(err){
        res.status(400).json({message:err.message})
    }
})



const PORT = 3000
app.listen(PORT , ()=>{
    console.log("server in running")
})