const Router = require("koa-router")
const router = new Router({ prefix: "/order" })

// 中间件
const { auth } = require("../middleware/auth.middleware")

const { validator } = require("../middleware/order.middleware")

// 控制器 
const {create ,findAll ,update} = require("../controller/order.controller")
// const { findAll } = require("../controller/cart.controller")

// // 提交订单
// router.post(
//     "/",
//     auth, 
//     validator({
//         address_id: 'int',
//         goods_info: "string",
//         total: "string"
//     }),create)
// // 获取订单 
// router.get("/",auth,findAll) 

// // 更新订单（更新状态）
// router.patch("/:id",auth ,validator({ status:'number' }),update)



module.exports = router