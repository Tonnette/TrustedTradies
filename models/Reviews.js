const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  reviews: {
    type: String,
    default: "no reviews yet",
    required: false
  },
  rating: {
    type: Number,
    required: true
  },
  UserName: {
    type: String,
    required: false
  }
});

const Reviews = mongoose.model("Reviews", reviewSchema);

module.exports = Reviews;