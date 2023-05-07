const { createOrder ,findAllOrder ,updateStatus} = require("../service/order.service")

class OrderController {
    async create(ctx) {
        //1. 解析传递的信息  用户id  商品id  数量 
        const user_id = ctx.state.user.id
        const { address_id, goods_info, total } = ctx.request.body

        const order_number = "XZD" + Date.now()


        //2. 调用service 获取操作数据库返回信息
        const res = await createOrder({
            user_id,
            address_id,
            goods_info,
            total,
            order_number
        })
        //3. 返回结果 
        ctx.body = {
            code: 0,
            message: "生成订单成功",
            result: res
        }
    }
    async findAll(ctx) {
        const { pageNum = 1, pageSize = 10, status = 0 } = ctx.request.query

        const res =await findAllOrder(pageNum, pageSize, status)

        ctx.body = {
            code: 0,
            message: "获取订单成功",
            result: res
        }
    }
    async update(ctx){
        const { id } = ctx.request.params
        const { status } = ctx.request.body 
        // console.log('id' , id , status)
        //
        const res = await updateStatus(id ,status)

        ctx.body = {
            code : 0 , 
            message:'',
            result:res
        }
    }
}

module.exports = new OrderController()