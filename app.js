const express = require('express');
const app = express();
const {router} = require('./routes/users.routes');

app.use(express.json());

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
