const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose=require('mongoose');
const path = require('path'); // to use __dirname
const session = require('express-session');

require('dotenv').config(); // to access the values .env file

const app = express();



// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});


try{
// MongoDB Atlas Connection
// const mongoUri = "mongodb+srv://ruchiraitte2000:dKjArRF0A4gLaArO@cluster0.lb4st.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

const mongoUri= "mongodb+srv://ruchiraitte2000:0a6FDASiO8LEW8nT@cluster0.lkhif.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

if (!mongoUri) {
    console.error('MongoDB URI not defined in .env file.');
    process.exit(1);
}

mongoose.connect(mongoUri)
.then(() => {

    console.log('Connected to MongoDB Atlas CLOUD !!');

})
.catch((error) => {
    console.error('Error connecting to MongoDB Atlas:', error);
});


}catch(e){
  console.log("cloud connecting error");
}

// importings of persons
  const farmer = require("./routes/farmerRoute");
  const doctor = require("./routes/doctorRoute");
  const startup = require("./routes/startUpRoute");
  const licensingAuthority = require("./routes/LicensingAuthorityRoute");
  const drugInspector = require("./routes/drugInspectorRoute");

// importing apis
  const chat = require("./routes/chatRoute");
  const district = require("./routes/districtRoute")
  const sendEmail = require("./routes/sendEmailRoute")
  const tokenVerify = require("./routes/tokenVerifyRoute");
  const status = require("./routes/statusRoute");
  const pdfQualityCheck=require("./routes/PdfQualityCheck");
  const verifyQuideline=require("./routes/VerifyQuidelineRoute");
  const PeerForum=require("./routes/PeerForumRoute");
  const Pdfmanagement=require("./routes/pdfUploadingRoute");

// assigning the persons
  app.use("/api",farmer);
  app.use("/api",doctor);
  app.use("/api",startup);
  app.use("/api",licensingAuthority);
  app.use("/api",drugInspector);

// assigning the apis
app.use("/api",chat);
app.use("/api",district);
app.use("/api",sendEmail);


app.use("/api",tokenVerify);
app.use("/api",status);
app.use("/api",pdfQualityCheck);
app.use("/api",verifyQuideline);
app.use("/api",PeerForum);
app.use("/api",Pdfmanagement);

// Serve the static files (HTML, CSS, JS)
app.use(express.static('public'));
// to display (serve) by default html content ( to make sure that the server is running when HOSTED)
app.get(['/', '/api'], (req, res) => {
  try{
  res.sendFile(__dirname + '/index.html');
  }catch(e){
    console.log("erorrrrr", e);
  }
});


const port = process.env.PORTT || 5002;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
