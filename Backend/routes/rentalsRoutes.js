const express = require('express');
const rentalsController = require('../controllers/rentalsController');

const router = express.Router();

router.get('/', rentalsController.getAllRentals);
router.get('/:id', rentalsController.getRentalById);
router.post('/', rentalsController.createRental);
router.put('/:id', rentalsController.updateRental);
router.delete('/:id', rentalsController.deleteRental);

module.exports = router;
