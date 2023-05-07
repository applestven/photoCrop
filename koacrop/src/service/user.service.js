const User = require("../model/user.model")

const seq = require('sequelize');
const Op = seq.Op;
class UserService{
    async createUser(user_name ,password){
        // todo : 写入数据库
        // await表达式 ：promise对象的值
        // console.log("开始执行service操作数据库")
        const res = await User.create({user_name,password})
        // console.log('service操作数据库执行结果',res)
        return res.dataValues
        
    }
    async getUserInfo({id,user_name,password,is_admin}){
        const whereOpt = {}

        id && Object.assign(whereOpt,{id})
        user_name && Object.assign(whereOpt,{user_name})
        password && Object.assign(whereOpt,{password})
        is_admin && Object.assign(whereOpt,{is_admin})

        const res = await User.findOne({
            attributes:['id','user_name','password','is_admin'],
            where:whereOpt,
        })
        return res ? res.dataValues :null
    }
    async updateById({id,user_name,password,is_admin}){
        const whereOpt = {id}
        const newUser = {} 
        user_name && Object.assign(newUser,{user_name})
        password && Object.assign(newUser,{password})
        is_admin && Object.assign(newUser,{is_admin})
        // console.log('newUser',newUser);
        const res = await User.update(newUser , {where:whereOpt})
        // console.log(res,'@@');
        return res[0] > 0 ? true :false
    }
    
    async removeUser(id){
        return await User.destroy({where:{id}})
    }
    async findUsers(pageNum , pageSize){
        const offset = (pageNum -1 ) * pageSize
        const {count ,rows} =await User.findAndCountAll({
            attributes:['id','user_name','password','is_admin','updatedAt','createdAt'],
            offset :offset,
            limit:pageSize * 1,
            // include:{
            //     model:Goods,
            //     as:'goods_info', // 别名
            //     attributes:['id','goods_name','goods_price','goods_img'] 
            // }
        })
        
        return {
            pageNum,
            pageSize,
            total:count,
            list:rows 
        }
    }
    async searchUsers(searchVal,pageNum,pageSize){
        const offset = (pageNum -1 ) * pageSize
        // 查数量
        let res = await User.findAndCountAll({where: { 
            'user_name':{
                [Op.like]:'%'+searchVal+'%' 
            }
        }})
        // const res =await User.findAll({
        //     attributes: {exclude: ['password','is_admin']},
        //     where:{
        //         'user_name':{
        //             [Op.like]:'%'+searchVal+'%' 
        //         }
        //     },
        //     // offset :offset,
        //     // limit:pageSize * 1,
        //     // include:{
        //     //     model:Goods,
        //     //     as:'goods_info', // 别名
        //     //     attributes:['id','goods_name','goods_price','goods_img'] 
        //     // }
        // })
        return {
            pageNum,
            pageSize,
            total:res.count,
            list:res.rows
        }
    }
}

module.exports = new UserService()