const {commonFormatError }  = require("../constant/err.type")
const validator = (rules)=>{
    return async (ctx,next)=>{
        try {
            ctx.verifyParams(rules)
        } catch (err) {
            console.log(err)
            commonFormatError.result = err
            return ctx.app.emit("error",commonFormatError,ctx)
        }
        await next()
    }
}
module.exports ={
    validator
}