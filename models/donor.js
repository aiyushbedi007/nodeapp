const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const donorSchema = new Schema({
  bloodGroup: {
    type: String,
    required: true,
  },
  dname: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
}, { timestamps: true });

const Donor = mongoose.model('Donor', donorSchema);
module.exports = Donor;