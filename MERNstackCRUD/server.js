const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const db = require('./app/models');


const app = express();


var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));
// parse requests of content type
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


app.get('/',(req,res)=>{
  res.json({message: "Welcome to my application"});
});

db.mongoose
  .connect(db.url,{
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(()=>{
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connected to db", err);
    process.exit();
  });

require("./app/routes/movies.routes")(app);
require("dotenv").config();

const PORT = process.env.NODE_DOCKER_PORT || 8080;
app.listen(PORT,()=>{
  console.log(`Server is running on ${PORT}`);
});
