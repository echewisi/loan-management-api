const express = require('express');
const loanController = require('../controllers/loanController');
const authenticate = require('../middleware/auth');
const { restrictTo } = require('../middleware/roleCheck');

const router = express.Router();

// Protect all routes after this middleware
router.use(authenticate);

// Route to get all loans (with optional status filter)
router.get('/', loanController.getAllLoans);

// Route to get user's loans by email
router.get('/:userEmail/get', loanController.getLoansByUserEmail);

// Route to get expired loans
router.get('/expired', loanController.getExpiredLoans);

// Route to delete a loan (restricted to superAdmin only)
router.delete('/:loanId/delete', restrictTo('superAdmin'), loanController.deleteLoan);

module.exports = router;