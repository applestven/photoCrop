const path = require("path")


const Koa = require('koa') 
const KoaBody = require('koa-body')
const app = new Koa() 

const Mount = require('koa-mount');
const koaStatic =  require('koa-static')
//跨域
const cors = require('koa2-cors');
app.use(cors());
const  parameter = require('koa-parameter') // 参数校验

const router = require('../router')
const errHandler= require('./errHandler')

app.use(KoaBody({
    multipart:true , // 开启文件上传 
    formidable:{
        // 在这option里 ，不推荐使用相对路径（../../） ,
        //  相对路径不是相对当前路径 ，而是相对process进程 ，也就是koa-body的执行  
        //  process.cwd() 可找到其当前的相对路径
        uploadDir:path.join(__dirname,'../uploads') , // 上传的文件放在哪个路径下  // ./src/upload
        keepExtensions:true, //是否保留文件扩展名
        // maxFileSize: 100 * 1024 * 1024,    // 设置上传文件大小最大限制，默认2M
    },
    parsedMethods:['POST', 'PUT', 'PATCH','DELETE']

}))
// 直接网址 + 图片地址
app.use(koaStatic(path.join(__dirname,'../uploads')))
// app.use(koaStatic(path.join(__dirname,'../download')))
// 网址 + /download + 文件地址 
app.use(Mount('/download',koaStatic(path.join(__dirname,'../download'))))

app.use(parameter(app))
// app.use(userRouter.routes())
// allowedMethods 如果用其他的请求方式如option link 请求 ，不会404 ， 而是501
app.use(router.routes()).use(router.allowedMethods())

// 统一的错误处理
app.on('error',errHandler)

module.exports = app