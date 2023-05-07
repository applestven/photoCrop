const { DataTypes } = require('sequelize')

const seq = require("../db/seq")

const Goods = seq.define('zd_goods',{
    goods_name:{
        type:DataTypes.STRING,
        allowNull:false,
        comment:'商品名称'
    },
    goods_price:{
        type:DataTypes.DECIMAL(10,2),
        allowNull:false,
        comment:'商品价格'
    },
    goods_num:{
        type:DataTypes.INTEGER,
        allowNull:false,
        comment:'商品库存'
    },
    goods_img:{
        type:DataTypes.STRING,
        allowNull:false,
        comment:'商品图片的url'
    }
},{
    // 偏执表 将模型定义为 paranoid Sequelize 支持 paranoid 表的概念. 
    // 一个 paranoid 表是一个被告知删除记录时不会真正删除它的表.反而一个名为 deletedAt 的特殊列会将其值设置为该删除请求的时间戳.
    paranoid: true,

})

Goods.sync()
// Goods.sync( { force: true })

module.exports = Goods