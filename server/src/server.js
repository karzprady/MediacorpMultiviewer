const express = require('express');
const Multiviewer = require('./model/BCschema');
const {  mongoose } = require('mongoose');
const routes = require('./routes/multiviewerroutes');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(async (req, res, next) => {

 console.log(`Request Method: ${req.method}, Request URL: ${req.url}`)
  next()
}
)
async function DBconnect() {
    
    await mongoose.connect(process.env.MONGO_URI).then(() => {  
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB:', err);
});

}
const PORT=process.env.PORT || 3000;
DBconnect();

app.use('/api/multiviewer', routes);

app.listen(PORT, () => {    
    console.log(`Server is running on port ${PORT}`);
}); 