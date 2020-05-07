
const router = require("express").Router();
const Reviews = require("../../models/Reviews");
const Tradie = require("../../models/Tradie");
// const db = require("../models");
const db = require("../../models");
const mongoose = require("mongoose");

// router.post("/", (req, res) => {
//   console.log(req.body)
// const newReview = new Review ({
//   review_text: req.body.review_text
// });
// newReview.save()

// })
mongoose.set('useFindAndModify', false);

// Matches with "/api/reviews"
router.route("/")
  .get(findAll)
  .post(create);

// Matches with "/api/reviews/:id"
router
  .route("/:id")
  .get(findById)
  .put(update)
  .delete(remove);

function findAll(req, res) {
  Reviews
    .find(req.query)
    .sort({ date: -1 })
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
}
function findById(req, res) {
  Reviews
    .findById(req.params.id)
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
}


function create(req, res) {
  console.log(req.body)
  // const traideId = body.traideId
  // console.log("hellooooo" + JSON.stringify(body))
  // const newReview = req.body.newReview
  const newReview = req.body.reviews
  const tradieId = req.body.tradieId
  const UserName = req.body.UserName
  const rating = req.body.rating
  console.log("this is the rating " + rating)

  const body = {
    reviews: newReview,
    UserName: UserName,
    rating: rating

  }
  Reviews
    .create(body)
    .then(( reviews ) => {
      // console.log(reviews)
      db.Tradie.findOneAndUpdate({
        _id: tradieId
      }, { $push: { 
        reviews: reviews._id,
        Username: req.body.UserName,
        rating: req.body.rating,
      
      } }, { new: true })
      .then(dbUser => {
        console.log(dbUser)
      })
      .catch(err => console.error(err));

    })

    .then(dbUser => {
      res.json(dbUser);
    })
    .catch(err => res.status(422).json(err));
}

function update(req, res) {
  // console.log("hellooooo" + JSON.stringify(req.body))
  Reviews
    .findOneAndUpdate({ _id: req.params.id },
      req.body
    )
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
}
function remove(req, res) {
  Reviews
    .findById({ _id: req.params.id })
    .then(dbModel => dbModel.remove())
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
}



module.exports = router;
