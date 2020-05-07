

const mongoose = require("mongoose");

delete mongoose.connection.models['Tradie'];

const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  reviews: {
    type: String,
  },
  UserName: {
    type: String,
    required: false
  },
});

const tradieSchema = new Schema({
  imageName: {
    type: String,
    required: false,
    default: "no photo yet"
  },
  imagePath: {
    type: String,
    required: false,
    default: "no photo yet"

  },
  name: { type: String, required: false },
  email: { type: String, required: false },
  password: {
    type: String,
    required: false
  },
  type: { type: String, required: false },
  postcode: { type: String, required: false },
  phone: { type: Number, required: false },
  rates: { type: Number, required: false },
  description: { type: String, required: false },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Reviews",
      default: "no review yet"
    }
  ]
});

const Tradie = mongoose.model("Tradie", tradieSchema);

module.exports = Tradie;
