/**
 * Validate email format
 * @param {string} email - The email to validate
 * @returns {boolean} True if email is valid
 */
exports.isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  /**
   * Validate loan ID format
   * @param {string} id - The loan ID to validate
   * @returns {boolean} True if ID is valid
   */
  exports.isValidLoanId = (id) => {
    // Check if ID is a 6-digit string
    return /^\d{6}$/.test(id);
  };
  
  /**
   * Validate status value
   * @param {string} status - The status to validate
   * @returns {boolean} True if status is valid
   */
  exports.isValidLoanStatus = (status) => {
    return ['pending', 'active'].includes(status);
  };