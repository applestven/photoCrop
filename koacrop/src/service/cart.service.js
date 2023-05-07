const {Op} = require('sequelize')
const Cart = require("../model/cart.model")
const Goods = require("../model/goods.model")
// service 业务层 处理逻辑相关
class CartService {
    async creteOrUpdate(user_id,goods_id){
        // 根据user_id 和 goods_id查找有没有记录
        let res = await Cart.findOne({
            where:{
                [Op.and]:{
                    user_id,
                    goods_id,
                },
            },
        })

        if(res){
            // 已经存在一条记录 , 将number+1
            await res.increment('number')
            return await res.reload 
        }else{
            return await Cart.create({
                user_id,
                goods_id
            })
        }
    }
    async findCarts(pageNum , pageSize){
        const offset = (pageNum -1 ) * pageSize
        const {count ,rows} =await Cart.findAndCountAll({
            attributes:['id','number','selected'],
            offset :offset,
            limit:pageSize * 1,
            include:{
                model:Goods,
                as:'goods_info', // 别名
                attributes:['id','goods_name','goods_price','goods_img'] 
            }
        })
        return {
            pageNum,
            pageSize,
            total:count,
            list:rows 
        }
    }
    async updateCarts(params){
        const {id , number , selected} = params
        const res = await Cart.findByPk(id)
        if(!res) return ""

        number !== undefined ? (res.number =number):''
        selected !== undefined ? res.selected =selected :''

        return res.save()
    }
    async removeCarts(ids){
        Cart.destroy({
            where:{
                id:{
                    [Op.in]:ids,
                }
            }
        })
    }
    async selectedCart(selected,user_id){
        return await Cart.update({selected:selected},{
            where:{
                user_id,
            }
        })
    }
}

module.exports  = new CartService()