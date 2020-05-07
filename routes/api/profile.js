// route/api/profile.js
const express = require('express');
const aws = require('aws-sdk');
const multerS3 = require('multer-s3');
const multer = require('multer');
const path = require('path');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");


// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

const Tradie = require("../../models/Tradie");
const Image = require("../../models/Image");

/**
 * express.Router() creates modular, mountable route handlers
 * A Router instance is a complete middleware and routing system; for this reason, it is often referred to as a “mini-app”.
 */
const router = express.Router();

const storageLocal = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/Users/tonnette/Desktop/trusted tradies/trusted-tradies/trusted-tradies/uploads/');
    // cb(null, '/uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  }
});
// const storageAWS = multerS3({
//   s3: s3,
//   bucket: 'tonhasanewbucket',
//   acl: 'public-read',
//   key: function (req, file, cb) {
//     cb(null, path.basename(file.originalname, path.extname(file.originalname)) + '-' + Date.now() + path.extname(file.originalname))
//   }
// }),

// profileImgUpload = multer({
//   storage: storageAWS,
//   limits: { fileSize: 2000000 }, // In bytes: 2000000 bytes = 2 MB
//   fileFilter: function (req, file, cb) {
//     checkFileType(file, cb);
//   }
// }).single('profileImage');

/**
 * @route POST api/profile/business-img-upload
 * @desc Upload post image
 * @access public
 */
router.post('/profile-img-upload', (req, res) => {
  console.log('hey hey hey', process.env)


  const s3 = new aws.S3({
    accessKeyId: process.env.BUCKETEER_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.BUCKETEER_AWS_SECRET_ACCESS_KEY,
    Bucket: process.env.BUCKETEER_BUCKET_NAME
  });


const profileImgUpload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'bucketeer-fe837e01-6761-4d1a-be19-9c8055baff62',
    acl: 'public-read',
    key: function (req, file, cb) {
      cb(null, path.basename(file.originalname, path.extname(file.originalname)) + '-' + Date.now() + path.extname(file.originalname))
    }
  }),
  limits: { fileSize: 2000000 }, // In bytes: 2000000 bytes = 2 MB
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  }
}).single('profileImage');

/**
 * Check File Type
 * @param file
 * @param cb
 * @return {*}
 */
function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images Only!');
  }
}

  profileImgUpload(req, res, (error) => {
    if (error) {
      console.log('errors', error);
      res.json({ error: error });
    } else {
      // If File not found
      if (req.file === undefined) {
        console.log('Error: No File Selected!');
        res.json('Error: No File Selected');
      } else {
        // If Success
        console.log('requestOkokok', req.file);
        let imagePath = req.file.location
        // let imageName = req.file.key
        const imageName = req.file.key;
        // const imageLocation = req.file.location;
    
        const newProfilePic = new Image({
          imageName: imageName,
          imagePath: imagePath
        })
        newProfilePic.save();
        console.log(newProfilePic);
        console.log('error', error);
     
        // Save the file name into database into profile model
        res.json({
          image: imageName,
          location: imagePath
        });
      }
    }
  });
})

router.post("/save", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  Tradie.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const newTradie = new Tradie({
        imageName: req.body.imageName,
        imagePath: req.body.imageLocation,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        type: req.body.type,
        postcode: req.body.postcode,
        description: req.body.description,
        phone: req.body.phone,
        rates: req.body.rates
      });
      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newTradie.password, salt, (err, hash) => {
          if (err) throw err;
          newTradie.password = hash;
          newTradie
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// End of single profile upload
// @route POST api/tradies/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
  // Form validation
  const { errors, isValid } = validateLoginInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;
  // Find user by email
  Tradie.findOne({ email }).then(tradie => {
    // Check if user exists
    if (!tradie) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }
    // Check password
    bcrypt.compare(password, tradie.password).then(isMatch => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: tradie.id,
          name: tradie.name
        };
        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926 // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token,
              payload: payload
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});



// We export the router so that the server.js file can pick it up
module.exports = router;