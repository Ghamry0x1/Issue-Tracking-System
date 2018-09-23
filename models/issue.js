const mongoose = require('mongoose');

const IssueSchema = mongoose.Schema({
  title: {
    type: String
  },
  responsible: {
    type: String
  },
  description: {
    type: String
  },
  severity: {
    type: String
  },
  status: {
    type: String,
    default: 'Open'
  }
});

let Issue = module.exports = mongoose.model('Issue', IssueSchema);
