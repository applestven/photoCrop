module.exports = (err ,ctx)=>{
    let status = 500
    console.log('err',err)
    switch(err.code){
        case '10001':
            status = 400
        case '10002':
            status = 409
        case '10004':
            status = 200
            break
        default:
            status = 200           
    }
    
    ctx.status = status
    ctx.body = err
    console.log("到这：错误处理函数ctx",ctx.status)
}