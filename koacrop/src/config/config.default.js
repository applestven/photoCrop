const dotenv = require("dotenv")

dotenv.config() 

// console.log('....',process.env.APP_PORT);
console.log('....',process.env.MYSQL_HOST);

module.exports = process.env