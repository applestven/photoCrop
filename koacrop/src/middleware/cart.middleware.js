const {invalidGoodsID,cartFormatError}  =require ("../constant/err.type")
const validator = (rules) =>{ // 使用闭包做一个通用的数据格式校验
    return async (ctx,next) =>{
        // 利用koa-parameter校验数据的格式
        try{
            ctx.verifyParams(rules)
        }catch(err){
            // invalidGoodsID.result = err
            // return ctx.app.emit("error",invalidGoodsID,ctx)
            console.error(err)
            cartFormatError.result = err 
            return ctx.app.emit('error',cartFormatError,ctx)
        }
        await next()
    }
}

module.exports = {
    validator
}