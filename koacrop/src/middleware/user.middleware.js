const { getUserInfo}   =  require('../service/user.service')
const bcrypt = require('bcryptjs')
const {
    userFormateError,
    userAlreadyExited,
    userRegisterError,
    userDoesNotExist,
    userLoginError,
    invalidPassword
} = require('../constant/err.type')
const userValidator = async(ctx,next)=>{
    console.log(1)
    console.log('用户名或密码为空',ctx)
    const {user_name , password} =ctx.request.body 
    // 合法性
    if(!user_name || !password){
        // console.error('用户名或密码为空',ctx.request.body)
        ctx.app.emit('error',userFormateError,ctx)
        // ctx.status = 400 
        // ctx.body = {
        //     code :'10001',
        //     message:'用户名或密码为空'
        // }
        return
    } 
    await next()
}
const verifyUser = async (ctx,next)=>{
    const { user_name} = ctx.request.body

    if(await getUserInfo({user_name})){
        // console.log("用户名重复")
        ctx.app.emit('error',userAlreadyExited,ctx)
        return
    }
    await next()
}
    // 加盐加密 
const crpytPassword = async(ctx ,next)=>{
    const { password } = ctx.request.body
    const salt = bcrypt.genSaltSync(10)
    //hash保存的是 密文
    // console.log('password',typeof password )
    const hash = bcrypt.hashSync(password,salt)
    ctx.request.body.password = hash 
    // console.log("拿到加盐hash",hash)
    await next()
}
const verifyLogin = async(ctx,next) =>{
    //1.判断用户是否存在（不存在：报错）
    const {user_name , password}  = ctx.request.body 
    try {
        const res = await getUserInfo({user_name})
        if(!res){
            console.error('用户名不存在',{ })
              ctx.app.emit('error',userDoesNotExist,ctx)
              return
            
        }

        //2.密码是否匹配（不匹配：报错）
        if(!bcrypt.compareSync(password,res.password)){
            return  ctx.app.emit('error',invalidPassword,ctx)
            
        }
    }catch(err){
        console.log('@err',err)
        return ctx.app.emit('error',userLoginError)
    }
    await next()
}

module.exports = {
    userValidator,
    verifyUser,
    crpytPassword,
    verifyLogin,
    
}