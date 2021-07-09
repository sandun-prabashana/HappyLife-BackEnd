const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    uid:String,
    date:String,
    details:String,
    withdrawal: Number,
    deposit:Number
  });
  
  module.exports = mongoose.model("Details", schema);