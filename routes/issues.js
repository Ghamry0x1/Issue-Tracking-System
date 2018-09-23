const express = require('express');
const Issue = require('../models/issue.js');
let router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  Issue.find((err, issues) => {
    if (err) {
      throw err;
    }
    else {
      res.json(issues);
    }
  })
});

router.get('/:id', function(req, res, next) {
  Issue.findById(req.params.id, (err, issue) => {
    if (err) {
      throw err;
    }
    else {
      res.json(issue);
    }
  })
});

router.post('/add', function(req, res, next) {
  let issue = new Issue(req.body);
  issue.save()
    .then(issue => {
      res.status(200).json({'issue': 'Added successfully'});
    })
    .catch(err => {
      res.status(400).send('Failed to create a new record')
    });
});

router.put('/update/:id', function(req, res, next) {
  Issue.findById(req.params.id, (err, issue) => {
    if(!issue)
      return next(new Error ('Couldnt load document'));
    else {
      issue.title = req.body.title;
      issue.responsible = req.body.responsible;
      issue.description = req.body.description;
      issue.severity = req.body.severity;
      issue.status = req.body.status;

      issue.save()
        .then(issue => {
          res.status(200).json('Update done');
        })
        .catch(err => {
          res.status(400).send('Update failed')
        });
    }
  })
});

router.delete('/delete/:id', function(req, res, next) {
  Issue.findByIdAndRemove({_id: req.params.id}, (err, issue) => {
    if(err)
      res.json(err);
    else {
      res.json('Removed successfully');
    }
  })
});

module.exports = router;
