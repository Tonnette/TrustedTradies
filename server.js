const path = require('path');
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const routes = require("./routes/api");
var cors = require('cors')
require('dotenv').config()
const GridFsStorage = require("multer-gridfs-storage");
const Grid = require("gridfs-stream")
const methodOverride = require("method-override");
var passport = require('passport');

// console.log(process.env)



const app = express();
const PORT = process.env.PORT || 3001;

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

app.use(cors())

// Define middleware here
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// Serve up static assets (usually on heroku)

// Add routes, both API and view
app.use('/uploads', express.static('uploads'));

// app.use('/image', ImageRouter);

const database = require("./config/keys").mongoURI;

// Add routes, both API and view
app.use(routes);
// let gfs;
// const conn = mongoose.createConnection(database, { useNewUrlParser: true })
  // Connect to the Mongo DB
  mongoose
    .connect(
      database,
      { useNewUrlParser: true }
    )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

  mongoose.set('useFindAndModify', false);
// conn.once('open', function () {
//   gfs = Grid(conn.db, mongoose.mongo);
//   gfs.collection('uploads')

//   // all set!
// })

// var storage = new GridFsStorage({
//   url: mongoURI,
//   file: (req, file) => {
//     return new Promise((resolve, reject) => {
//       crypto.randomBytes(16, (err, buf) => {
//         if (err) {
//           return reject(err);
//         }
//         const filename = buf.toString('hex') + path.extname(file.originalname);
//         const fileInfo = {
//           filename: filename, 
//           bucketName: 'uploads'
//         };
//         resolve(fileInfo);
//       });
//     });
//   }
// });
// const upload = multer({ storage });

// app.post('/upload', upload.single('profileImage'), (req, res)  => {
//   res.json({ file: req.file })

// })



require('./config/passport');
app.use(passport.initialize());
// Routes

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}
// Start the API server
app.listen(PORT, function () {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
