const Donor = require('../models/donor');

const donor_index = (req, res) => {
  Donor.find().sort({ createdAt: -1 })
    .then(result => {
      // res.render('index', { Donors: result, title: 'All Donors' });
      res.json(result);
    })
    .catch(err => {
      console.log(err);
    });
}

const donor_create_get = (req, res) => {
  res.render('create', { title: 'Add a new donor' });
}

const donor_edit_get = (req, res) => {
  const id = req.params.id;
  Donor.findById(id)
    .then(result => {
      // res.render('edit', { Donor: result, title: 'Edit Donor' });
      res.json(result);
    })
    .catch(err => {
      console.log(err);
      res.json({ redirect: '/404', title: 'Donor not found' });
    });
}

const donor_create_post = (req, res) => {
  const donor = new Donor(req.body);
  console.log(req.body);
  donor.save()
    .then(result => {
      res.redirect('/donors');
    })
    .catch(err => {
      console.log(err);
    });
}

const donor_delete = (req, res) => {
  const id = req.params.id;
  Donor.findByIdAndDelete(id)
    .then(result => {
      //res.json({ redirect: '/Donors' });
      res.json(result);
    })
    .catch(err => {
      console.log(err);
    });
}

const donor_update = (req, res) => {
  const id = req.params.id;
  console.log(id);
  console.log(req.body);
  Donor.findByIdAndUpdate(id,{$set:req.body}) 
    .then(result => {
      //res.redirect('/Donors');
      res.json(result);
    })
    .catch(err => {
      console.log(err);
    });  
}


module.exports = {
  donor_index, 
  donor_create_get, 
  donor_create_post, 
  donor_delete,
  donor_edit_get,
  donor_update,
}