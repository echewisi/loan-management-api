/**
 * Format date to a readable string
 * @param {Date} date - The date to format
 * @returns {string} Formatted date string
 */
exports.formatDate = (date) => {
    return new Date(date).toLocaleString();
  };
  
  /**
   * Check if a date is in the past
   * @param {string} dateString - The date string to check
   * @returns {boolean} True if the date is in the past
   */
  exports.isDateInPast = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    return date < now;
  };
  
  /**
   * Format currency value
   * @param {string} amount - The amount with currency symbol
   * @returns {string} Formatted amount
   */
  exports.formatCurrency = (amount) => {
    // Remove currency symbol and commas
    const numericValue = amount.replace(/[^\d.]/g, '');
    // Parse to float and format
    return parseFloat(numericValue).toLocaleString();
  };