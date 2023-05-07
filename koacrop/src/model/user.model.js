// sequelize 主要通过Model对应数据表
const { DataTypes}  = require('sequelize')

const seq = require('../db/seq')

// 创建模型（Model zd_user -> 表 zd——users）
const User = seq.define('zd_user',{
    user_name:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true,
        comment:"用户名,唯一"
    },
    password:{
        type :DataTypes.CHAR(64),
        allowNull:false ,
        comment:"密码"
    },
    is_admin:{
        type:DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue:0,
        comment:'是否为管理员，0：不是管理员（默认）；1：是管理员'
    }  
})
User.sync()
 // 强制同步数据库 （创建数据表） 会清除原数据表
// User.sync({force:true})
// User.sync() - 如果表不存在,则创建该表(如果已经存在,则不执行任何操作)
// User.sync({ force: true }) - 将创建表,如果表已经存在,则将其首先删除
// User.sync({ alter: true }) - 这将检查数据库中表的当前状态(它具有哪些列,它们的数据类型等),然后在表中进行必要的更改以使其与模型匹配.

// 直接 执行这个文件 将会在数据库中  创建这个表  node user.module.js
module.exports = User