const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')

const app = express();
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:5000'
 }));

 app.use(cors({
    origin: 'http://localhost:5000',
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization'
 }));

// connect mongodb 
const mongoURL ="mongodb+srv://sudharsan6078:CSSe0IXzlDA2xzCj@done.l9ghk.mongodb.net/";
// CSSe0IXzlDA2xzCj
mongoose.connect(mongoURL)

const DetailSchema = new mongoose.Schema({
    name:String,
    dept:String,
    college:String,
})

const Details = mongoose.model('Detail', DetailSchema);



app.post('/', async (req, res)=>{
    const data = new Details(req.body);
    try{
        const savedata = await data.save();
        res.json({savedata, message:"data updated"});
    }
    catch(err){
        res.status(400).json({message: err.message})
    }
})

app.get('/', async (req,res)=>{
    try{
        const data = await Details.Find();
        res.json({data , message:"data display"})
    }
    catch(err){
        res.status(400).json({message:err.message})
    }
})

const PORT = 3000
app.listen(PORT , ()=>{
    console.log("server in running")
})