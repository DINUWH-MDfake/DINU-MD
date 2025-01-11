// Example of using a simple in-memory database (replace with MongoDB or any other DB if needed)
let database = {};

function setData(key, value) {
  database[key] = value;
}

function getData(key) {
  return database[key];
}

module.exports = { setData, getData };
