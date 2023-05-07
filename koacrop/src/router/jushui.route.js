// 聚水潭对接接口
const {getToken ,getOrder}= require( "../controller/jushui.controller")
const {CommonSign}= require( "../middleware/jushui.middleware")
//1. 导入koa-router包 
const Router = require('koa-router')


// 2.实例化对象 
const router = new Router({ prefix: '/jushui' })


// 获取access_token (会返回sign  以及其他参数)
router.post('/getAsstoken',getToken)

// 获取订单 getOrder
router.post('/order',CommonSign,getOrder)


module.exports = router