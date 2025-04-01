const express=require('express');
const app=express();
const cors=require('cors');
require('dotenv').config()
const connectToDb=require('./Config/database');



app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT=process.env.PORT ||5000;

connectToDb();

//Routes 
const authRoutes=require('./Routes/authRoutes')
app.use('/auth',authRoutes);

const itemsRoutes=require('./Routes/itemsRoutes');
app.use('/items',itemsRoutes);

app.listen(PORT,()=>{
    console.log(`server running in port ${PORT} `)
})

