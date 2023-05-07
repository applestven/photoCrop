
const { createUser, getUserInfo, updateById ,findUsers,searchUsers,removeUser} = require('../service/user.service')
const jwt = require("jsonwebtoken")

const { JWT_SECRET } = require("../config/config.default")
class UserController {
    async register(ctx, next) {
        // 1. 获取数据 
        const { user_name, password } = ctx.request.body
        // 错误处理
        //合法性
        // if(!user_name || !password){
        //     console.error('用户名或密码为空',ctx.request.body)
        //     ctx.status = 400 
        //     ctx.body = {
        //         code :'10001',
        //         message:'用户名或密码为空'
        //     }
        //     return
        // } 
        // 合理性 
        // if(getUserInfo({user_name})){
        //     ctx.status = 409
        //     ctx.body ={
        //         code : '10002',
        //         message:'用户已存在',
        //         result:'',
        //     }
        //     return
        // }   
        // 2. 操作数据 
        // console.log("操作数据")
        const res = await createUser(user_name, password)
        // console.log('@',res);
        // console.log('-11111111111',ctx.request.body);
        // 3. 返回结果 
        // ctx.body = ctx.request.body
        // ctx.body = '用户注册成功'
        ctx.body = {
            code: 0,
            message: '用户注册成功',
            result: {
                id: res.id,
                user_name: res.user_name
            },
        }
    }

    async login(ctx, next) {
        const { user_name } = ctx.request.body
        console.log('@user_name' ,user_name)
        // console.log('@jwt',jwt)
        //1. 获取用户信息（在token的payload中 ， 记录id，user_name ,is_admin）
        try {
            // 从返回结果对象中剔除password属性 ， 将剩下的属性放到res对象
            const { password, ...res } = await getUserInfo({ user_name })

            ctx.body = {
                code: 0,
                message: '用户登录成功',
                result: {
                    token: jwt.sign(res, JWT_SECRET, { expiresIn: '1d' })
                }
            }
        } catch (error) {
            console.error('用户登录失败', error)
        }

    }
    async changePassword(ctx, next) {
        // 1.获取数据
        // const { id } = ctx.state.user
        
        const  id  = ctx.request.body.id 
        // console.log("拿到用户id",ctx)
        console.log("拿到用户id",id)
        const password = ctx.request.body.password
        console.log("拿到用户密码",password)
        // 2.操作数据库
        if( await updateById({id,password})){
            ctx.body = {
                code : 0 ,
                message:'修改密码成功',
                result:''
            }
        }else{
            ctx.body ={
                code : '10007',
                message:"修改密码失败",
                result:''
            }
        }
        // 3.返回结果

        // ctx.body 

    }
    async remove(ctx){
        const user_id = ctx.request.params.id
        
        const res = await removeUser(user_id)
        ctx.body = {
            code:0 ,
            message:'删除用户成功',
            result:res,
        }

    }
    // 获取用户列表
    async userList(ctx,next){
        // 1.解析请求参数
        const { pageNum =1 ,pageSize = 10} = ctx.request.query 
        // 2.操作数据库
        const res =await findUsers(pageNum , pageSize)
        // 3.返回结果 
        ctx.body = {
            code : 0 ,
            message : "获取用户列表成功",
            result : res 
        }
    }
    // 
    async searchUser (ctx,next){
        const { searchVal ,pageNum,pageSize} = ctx.request.query
        const  res = await searchUsers(searchVal,pageNum,pageSize)
        ctx.body = {
            code : 0 ,
            message : "搜索成功",
            result : res 
        }

    }
}
module.exports = new UserController()