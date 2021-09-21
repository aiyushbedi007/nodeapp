const express = require('express');
const donorController = require('../controllers/donorController');

const router = express.Router();

router.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

router.get('/create', donorController.donor_create_get);
router.get('/', donorController.donor_index);
router.post('/', donorController.donor_create_post);
router.delete('/:id', donorController.donor_delete);
router.get('/edit/:id/', donorController.donor_edit_get );
router.patch('/:id', donorController.donor_update);


module.exports = router;