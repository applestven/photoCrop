// 参数校验 npm i koa-parameter
const { goodFormatError, unSupportFileType} = require('../constant/err.type')
const validator = async (ctx, next) => {
    try {
        ctx.verifyParams({
            goods_name: { type: 'string', require: true },
            goods_price: { type: 'number', require: true },
            goods_num: { type: 'number', require: true },
            goods_img: { type: 'string', require: true },
        })
    } catch (err) {
        // console.log("参数校验", err);
        // return ctx.app.emit('error',err,ctx)
        goodFormatError.result = err
        // console.log("参数校验")
        return ctx.app.emit('error', goodFormatError, ctx)
    }
    await next()
}

module.exports = {
    validator
}

