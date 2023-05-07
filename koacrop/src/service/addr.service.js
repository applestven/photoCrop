const { Op } = require("sequelize")
const Address = require("../model/addr.model")
class AddrService {
    async createAddr(addr) {
        return await Address.create(addr)
    }
    async findAllAddr(user_id) {
        return await Address.findAll({
            where: user_id,
            attributes: ['id', 'consignee', 'phone', 'address', 'is_default']
        })
    }
    async updateAddr(id, addr) {
        return await Address.update(addr, { where: { id } })
    }
    async removeAddr(id){
        return await Address.destroy({where:{id}})
    }
    async setDefaultAddr(user_id,id){
        await Address.update({is_default:0},{where:{user_id}})
        return await Address.update({is_default:1},{where:{id}})
    }
}

module.exports = new AddrService()