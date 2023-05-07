const jwt = require("jsonwebtoken") 
const { JWT_SECRET } = require("../config/config.default")
const { tokenExpiredError ,invalidToken ,hasNOtAdminPermission} = require('../constant/err.type')
const auth = async(ctx,next)=>{
    // 验证用户登录
    const { authorization='' } = ctx.request.header
    const token = authorization.replace('Bearer ','')
    // console.log('password',ctx.request.body)
    // console.log('@token',token)
    try {
        //user中包含payload的信息（id ,user_name ,is_admin）
        // console.log('user1',ctx.state.user)
        const user = jwt.verify(token ,JWT_SECRET)
        ctx.state.user = user 
        // console.log('user2用户验证，获取到用户的信息',ctx.state.user)
    } catch (error) {
        switch(error.name){
            case 'TokenExpiredError':
                return ctx.app.emit('error',tokenExpiredError,ctx)
            case 'JsonWebTokenError':
                return ctx.app.emit('error',invalidToken,ctx)
            default :
                console.error("token验证错误")
        }
    }
    await next()
}
// 判断用户是否有管理员权限 
const hadAdminPermission = async (ctx ,next) =>{
    // 使用ctx的is_admin 判断用户是否有管理员权限 
    const { is_admin} = ctx.state.user 
    // console.log("管理员权限",is_admin)
    if(!is_admin){
        console.error("该用户没有管理员权限" ,ctx.state.user)
        return ctx.app.emit('error' , hasNOtAdminPermission,ctx)
    }
    await next()
}

module.exports = {
    auth,
    hadAdminPermission
}