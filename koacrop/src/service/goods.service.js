const Goods = require('../model/goods.model')
// 调用数据库 对数据进行处理
class GoodsService {
    async createGoods(goods) {
        const res = await Goods.create(goods)
        return res.dataValues
    }
    async updateGoods(id, goods) {
        const res = await Goods.update(goods, { where: { id } })

        return res[0] > 0 ? true : false
    }
    async removeGoods(id){
        console.log("获取id ",id)
        const res = await Goods.destroy({where:{ id }}) // 
        console.log("数据库操作返回",res)
        return res > 0 ? true : false

    }
    async restoreGoods(id){
        const res = await Goods.restore({where:{id}})
        return res > 0 ? true : false
    }
    async findGoods(pageNum , pageSize){
        const total = await Goods.count() // 获取数量
        // const count = await Goods.findAll() // 获取数量
        // console.log(count)

        // 2.获取分页的具体数据 
        // const offset = (pageNum -1 ) * pageSize
        // const count=  await Goods.findAll({offset :offset,limit:pageSize*1 })

        const offset = (pageNum -1 ) * pageSize
        const {count ,rows}=  await Goods.findAndCountAll({offset :offset,limit:pageSize*1 })
        console.log("count",count )
        // console.log("rows",rows )
        return {
            pageNum,
            pageSize,
            total,
            list :rows
        }
    }
}

module.exports = new GoodsService()