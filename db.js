// db.js
const mysql = require('mysql2');
const fs = require('fs');
// Create a connection to the database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: '1v1.lol'
});

connection.connect((err) => {
  if (err) {
    console.error('[$] Error connecting to the database:', err.stack);
    return;
  }
  console.log('[$] Connected to MySQL database.');
});
function getUserData(token, callback) {
    connection.query('SELECT json FROM users WHERE token = ?', [token], (err, results) => {
      if (err) return callback(err);
    
      if (results.length === 0) {
        const baseUser = JSON.parse(fs.readFileSync("./Helpers/BaseUser.json"))
        let newUserData = JSON.stringify(baseUser);
        console.log("[$] Creating new user...")
        connection.query('INSERT INTO users (token, json) VALUES (?, ?)', [token, newUserData], (err) => {
          if (err) return callback(err);
          callback(null, baseUser);
        });
      } else {
        callback(null, JSON.parse(results[0].json));
      }
    });
  }
  
function updateUserData(token, jsonData, callback) {
    let jsonStr = JSON.stringify(jsonData);
    connection.query('UPDATE users SET json = ? WHERE token = ?', [jsonStr, token], (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    });
}
module.exports = { connection, getUserData, updateUserData };