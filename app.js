//base setup
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = process.env.PORT || 3000;
const router = express.Router();
const AppRecord = require("./models/AppRecord.js");

const mongoose = require("mongoose");
mongoose.set("useUnifiedTopology", true);
mongoose.set("useNewUrlParser", true);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/", router);

//connect / create database in MongoDB
mongoose
  .connect("mongodb://localhost/pagination-database")
  .then(() => {
    seedDB();
  })
  .catch(err => {
    console.log("Error connecting to Mongo");
  });

//Seed the database if it's empty
function seedDB() {
  AppRecord.find()
    .then(appsInDB => {
      if (appsInDB.length === 0) {
        for (let i = 1; i <= 20; i++) {
          let newApp = new AppRecord();
          newApp.id = i;
          newApp.name = "my-app-" + ("00" + i).slice(-3);
          newApp
            .save()
            .then()
            .catch(err => {
              console.log(`Error while creating a new app: ${err}`);
            });
        }
      }
    })
    .catch(err => console.log("Error while seeding Data Base"));
}

//Routes

router.post("/apps", (req, res) => {
  let by, start, end, max, order, limit, query;
  console.log(req.body);
  let range = req.body.params.range;

  //set values posted or defaults
  range.by ? (by = range.by) : (by = "id");
  range.start ? (start = range.start) : (start = 0);
  range.max ? (max = range.max) : (max = 50);
  range.order ? (order = range.order) : (order = "asc");

  //omitting end works on id and name
  range.end
    ? (query = { $gte: start, $lte: range.end })
    : (query = { $gte: start });

  AppRecord.find({ [by]: query })
    .select("-_id id name")
    .limit(limit)
    .sort({ [by]: order })
    .then(appsInDB => {
      res.json(appsInDB);
    });
});

app.listen(port, () => {
  console.log("app now listening on port 3000");
});
