const db = require("../../models");
const router = require("express").Router();



// Matches with "/api/tradies"
router.route("/")
  .get(findAll)
// .post(create);

// Matches with "/api/tradies/:id"
router
  .route("/:id")
  .get(findById)
  .put(update)
  .delete(remove);
  // .post(review);

function findAll(req, res) {
  db.Tradie
    .find(req.query)
    .populate("reviews")
    .sort({ date: -1 })
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
}
function findById(req, res) {
  db.Tradie
    .findById(req.params.id)
    .populate("reviews")
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
}

function update(req, res) {
  console.log(req.body)
  db.Tradie
    .findOneAndUpdate({ _id: req.params.id }, 
      req.body
      )
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
}
function remove(req, res) {
  db.Tradie
    .findById({ _id: req.params.id })
    .then(dbModel => dbModel.remove())
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
}

// function create(req, res) {
//   Reviews
//     .create(req.body)
//     .then(({ _id }) => db.Tradie.findOneAndUpdate({}, { $push: { reviews: _id } }, { new: true }))
    
//     .then(dbUser => {
//       res.json(dbUser);
//     })
//     .catch(err => res.status(422).json(err));
// }

// router.post("/reviews/:id"), (req, res) => {
//   db.Tradie
//   .findOneAndUpdate({ _id: req.params.id }, 
//     consol.log(req.body)
//     )
//     .then(dbModel => res.json(dbModel))
//     .catch(err => res.status(422).json(err));
// }



//   .then(dbModel => {
//     const newReview = new Tradie({
//       reviews: [{
//         reviews: req.body.reviews,
//         userName: req.body.userName,

//       }]
//     }) 
//     newReview.save()
//     .then(dbModel => resjson(dbModel))

//   }

  
// }



module.exports = router;
