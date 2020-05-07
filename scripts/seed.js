const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Books collection and inserts the books below

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/trustedtradies"
);

const tradieSeed = [
  {
    imageName: "test",
    imageData: "test",
    type: "Carpenter",
    name: "mat",
    email: "mat@mat.com",
    password:
      "matty1234",
    postcode: 2031,
    description: "im a great tradie",
    phone: 987876765,
    rates: 70
  },
  {
    imageName: "test",
    imageData: "test",
    type: "Tiler",
    name: "nat",
    email: "nat@mat.com",
    password:
      "natty1234",
    postcode: 2032,
    description: "im a great tradie",
    phone: 987876765,
    rates: 70
  },
  {
    imageName: "test",
    imageData: "test",
    type: "Builder",
    name: "vat",
    email: "vat@mat.com",
    password:
      "vatty1234",
    postcode: 2033,
    description: "im a great tradie",
    phone: 987876765,
    rates: 70
  },
  {
    imageName: "test",
    imageData: "test",
    type: "Carpenter",
    name: "rat",
    email: "rat@mat.com",
    password:
      "ratty1234",
    postcode: 2034,
    description: "im a great tradie",
    phone: 987876765,
    rates: 70
  },
  {
    imageName: "test",
    imageData: "test",
    type: "Electrician",
    name: "pat",
    email: "pat@mat.com",
    password:
      "patty1234",
    postcode: 2035,
    description: "im a great tradie",
    phone: 987876765,
    rates: 70
  },
  {
    imageName: "test",
    imageData: "test",
    type: "Electrician",
    name: "tat",
    email: "tat@mat.com",
    password:
      "tatty1234",
    postcode: 2031,
    description: "im a great tradie",
    phone: 987876765,
    rates: 70
  },
  {
    imageName: "test",
    imageData: "test",
    type: "Electrician",
    name: "sat",
    email: "sat@mat.com",
    password:
      "satty1234",
    postcode: 2032,
    description: "im a great tradie",
    phone: 987876765,
    rates: 70
  },
  {
    imageName: "test",
    imageData: "test",
    type: "Plumber",
    name: "lat",
    email: "lat@mat.com",
    password:
      "latty1234",
    postcode: 2033,
    description: "im a great tradie",
    phone: 987876765,
    rates: 70
  },
  {
    imageName: "test",
    imageData: "test",
    type: "Plumber",
    name: "jat",
    email: "jat@mat.com",
    password:
      "jatty1234",
    postcode: 2034,
    description: "im a great tradie",
    phone: 987876765,
    rates: 70
  },
  {
    imageName: "test",
    imageData: "test",
    type: "Plumber",
    name: "hat",
    email: "hat@mat.com",
    password:
      "hatty1234",
    postcode: 2035,
    description: "im a great tradie",
    phone: 987876765,
    rates: 70
  },

];

db.Tradie
  .remove({})
  .then(() => db.Tradie.collection.insertMany(tradieSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
