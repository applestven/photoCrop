// 连接数据库
const { Sequelize } = require('sequelize')

const { 
MYSQL_HOST,
MYSQL_POST ,
MYSQL_USER ,
MYSQL_PWD ,
MYSQL_DB ,

} = require('../config/config.default')
// console.log("拿到三位变量",MYSQL_DB,MYSQL_PWD,MYSQL_USER,MYSQL_HOST)
const seq = new Sequelize(MYSQL_DB,MYSQL_USER,MYSQL_PWD,{
    host:MYSQL_HOST,
    dialect:'mysql'
})
// console.log("数据库连接成功")
seq.authenticate()
.then(()=>{
    console.log('数据库连接成功')
})
.catch((err)=>{
    console.log('数据库连接失败');
}) 

module.exports = seq 