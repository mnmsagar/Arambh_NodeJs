const express = require('express');
const app = express();
const fs = require('fs');
const {router} = require('./routes/users.routes');

let file = JSON.parse(fs.readFileSync('./models/data.json','utf8'));
console.log(file);
app.use(express.json()); // used to parse json data in to the file 

// app.post('/signUp',async (req,res)=>{
//     console.log(req.body);
//     file.push(req.body);

//     await fs.writeFile('./models/data.json',JSON.stringify(file),(err)=>{
//         if(err){
//             console.log("Error Found!!");
//             return;
//         }
//         console.log("File Written Successfully!!");
//     })
//     res.json({
//         message : "Hello",
//         statusCode : 201
//     })
// })

app.use('/users',router);
app.use('*',(req,res)=>{
    res.json({
        message : "Not Valid !!!",
        statusCode : 401
    })
})

app.listen(3000,()=>{
    console.log("Server Started !!")
})
