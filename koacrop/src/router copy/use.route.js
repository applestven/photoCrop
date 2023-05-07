const Router = require('koa-router')
const {
    userValidator ,
    verifyUser,
    crpytPassword,
    verifyLogin,
    
} = require('../middleware/user.middleware')

const {
    auth,
    hadAdminPermission
} = require('../middleware/auth.middleware')
const {register , login ,changePassword} = require('../controller/user.controller')

const router = new Router({ prefix: '/users' })
// 注册接口
router.post('/register',userValidator,verifyUser, crpytPassword,register)
// 登录接口 
router.post('/login',userValidator,verifyLogin,login)
// 修改密码接口 
router.patch('/',auth,hadAdminPermission,crpytPassword,changePassword,(ctx,next)=>{
    // console.log(ctx.state.user)
    ctx.body = '修改密码成功'
})
module.exports  = router 