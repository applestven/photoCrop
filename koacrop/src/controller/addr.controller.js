const { createAddr ,findAllAddr,updateAddr,removeAddr,setDefaultAddr} = require("../service/addr.service")

class AddrController{
    async create(ctx){
        // 解析 user_id， consignee ， phone ，address
        const user_id = ctx.state.user.id 
        const {consignee , phone , address } = ctx.request.body
        console.log("daozhe-------------",)
        // 调用数据库方法 
        const res = await createAddr({user_id,consignee,phone,address})
        console.log("daozhe-------------",res)
        ctx.body = {
            code : 0 ,
            message : "添加地址成功",
            result:res,
        }
    }
    async findAll(ctx){
        const userid = ctx.state.user.id 

        const res = await findAllAddr(userid)

        ctx.body = {
            code : 0 ,
            message :"获取列表成功",
            result:res
        }

    }
    async update(ctx){
        const addr_id = ctx.request.params.id

        const res = await updateAddr(addr_id,ctx.request.body)

        ctx.body = {
            code:0 ,
            message:'更新地址成功',
            result:res,
        }
    }
    async remove(ctx){
        const addr_id = ctx.request.params.id
        
        const res = await removeAddr(addr_id)
        ctx.body = {
            code:0 ,
            message:'删除地址成功',
            result:res,
        }

    }
    async setDefault(ctx){
        const addr_id = ctx.request.params.id
        const user_id = ctx.state.user.id
        const res = await setDefaultAddr(user_id,addr_id)

        ctx.body = {
            code : 0 ,
            message : '设置默认地址成功',
            result:res
        }
    }
}
module.exports = new AddrController()