
const { update } = require("../controller/addr.controller")
const Order = require("../model/order.model")
class OrderService {
    async createOrder(order) {
        return Order.create(order)
    }
    async findAllOrder(pageNum, pageSize, status) {
        const { rows, count } = await Order.findAndCountAll({
            attributes: ['address_id', 'goods_info', 'total', 'order_number', 'status'],
            // 需要传递 user_id  ,否则查询全部订单（未改）
            where: {
                status
            },
            offset: (pageNum - 1) * 10,
            limit: pageSize * 1
        })
        return {
            pageNum,
            pageSize,
            total: count,
            list: rows
        }
    }
    async updateStatus(id, status) {
        return await Order.update({ status }, { where: { id } })
    }
}

module.exports = new OrderService