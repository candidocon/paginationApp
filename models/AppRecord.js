const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AppSchema = new Schema({
  id: Number,
  name: String
});

module.exports = mongoose.model("AppRecord", AppSchema);
