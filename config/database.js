const fs = require('fs');
const path = require('path');

// Path to data files
const loansPath = path.join(__dirname, '../data/loans.json');
const staffsPath = path.join(__dirname, '../data/staffs.json');

const readLoansData = () => {
  try {
    const data = fs.readFileSync(loansPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading loans data:', error);
    return [];
  }
};

const writeLoansData = (data) => {
  try {
    fs.writeFileSync(loansPath, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error('Error writing loans data:', error);
    return false;
  }
};

const readStaffsData = () => {
  try {
    const data = fs.readFileSync(staffsPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading staffs data:', error);
    return [];
  }
};

module.exports = {
  readLoansData,
  writeLoansData,
  readStaffsData
};