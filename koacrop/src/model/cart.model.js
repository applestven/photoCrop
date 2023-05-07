// 1.导入sequelize 的连接 
const { DataTypes } = require('sequelize')
const seq = require("../db/seq")
const Goods = require("./goods.model")
// 2.定义Cart模型
const Cart = seq.define("zd_carts",{
    goods_id:{
        type:DataTypes.INTEGER,
        allowNull:false ,
        comment:'商品的id',
    },
    user_id:{
        type:DataTypes.INTEGER,
        allowNull:false , 
        comment:'用户的id',
    },
    number:{
        type:DataTypes.INTEGER,
        allowNull:false,
        defaultValue:1,
        comment:'商品的数量',
    },
    selected:{
        type:DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue:true,
        comment:'是否选中'
    }
})

// 3. 同步数据（建表）
Cart.sync()
// Cart.sync({force:true})
// 3. 查购物车 关联 商品（以购物车goods_id 查询 商品）
Cart.belongsTo(Goods,{
    foreignKey:'goods_id', // 外键
    as:'goods_info' // 查出的结果别名
})
// 4. 导出Cart模型
module.exports = Cart 