const { readLoansData, writeLoansData } = require('../config/database');

// Get all loans
exports.getAllLoans = (req, res, next) => {
  try {
    let loans = readLoansData();
    const { status } = req.query;
    const { role } = req.user;

    // Filter by status if query parameter is provided
    if (status && ['pending', 'active'].includes(status)) {
      loans = loans.filter(loan => loan.status === status);
    }

    // Modify the response based on user role
    if (role === 'staff') {
      // For normal staff, remove totalLoan from applicant info
      loans = loans.map(loan => {
        const { applicant, ...rest } = loan;
        const { totalLoan, ...applicantData } = applicant;
        return { ...rest, applicant: applicantData };
      });
    }

    res.status(200).json({
      status: 'success',
      results: loans.length,
      data: {
        loans
      }
    });
  } catch (error) {
    next(error);
  }
};

// Get loans by user email
exports.getLoansByUserEmail = (req, res, next) => {
  try {
    const { userEmail } = req.params;
    const { role } = req.user;
    let loans = readLoansData();

    // Filter loans by user email
    loans = loans.filter(loan => loan.applicant.email === userEmail);

    // Modify the response based on user role
    if (role === 'staff') {
      // For normal staff, remove totalLoan from applicant info
      loans = loans.map(loan => {
        const { applicant, ...rest } = loan;
        const { totalLoan, ...applicantData } = applicant;
        return { ...rest, applicant: applicantData };
      });
    }

    res.status(200).json({
      status: 'success',
      results: loans.length,
      data: {
        loans
      }
    });
  } catch (error) {
    next(error);
  }
};

// Get expired loans
exports.getExpiredLoans = (req, res, next) => {
  try {
    const { role } = req.user;
    let loans = readLoansData();
    const currentDate = new Date();

    // Filter loans where maturityDate is in the past
    loans = loans.filter(loan => {
      const maturityDate = new Date(loan.maturityDate);
      return maturityDate < currentDate;
    });

    // Modify the response based on user role
    if (role === 'staff') {
      // For normal staff, remove totalLoan from applicant info
      loans = loans.map(loan => {
        const { applicant, ...rest } = loan;
        const { totalLoan, ...applicantData } = applicant;
        return { ...rest, applicant: applicantData };
      });
    }

    res.status(200).json({
      status: 'success',
      results: loans.length,
      data: {
        loans
      }
    });
  } catch (error) {
    next(error);
  }
};

// Delete a loan by ID
exports.deleteLoan = (req, res, next) => {
  try {
    const { loanId } = req.params;
    const loans = readLoansData();
    
    // Find the loan index
    const loanIndex = loans.findIndex(loan => loan.id === loanId);
    
    if (loanIndex === -1) {
      return res.status(404).json({
        status: 'fail',
        message: 'Loan not found with that ID'
      });
    }
    
    // Remove the loan
    loans.splice(loanIndex, 1);
    
    // Write the updated loans back to the file
    writeLoansData(loans);
    
    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (error) {
    next(error);
  }
};