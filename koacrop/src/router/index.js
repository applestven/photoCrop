const fs  = require('fs')
const Router = require('koa-router')
const router = new Router()
// 读取本目录router下的文件 进行循环引入，
// 完成一次引入多个路由文件的入口文件
// 供app/index.js做路由配置
fs.readdirSync(__dirname).forEach(file=>{
    // console.log(file)
    if(file !== "index.js"){ 
        let r = require( './'+file )
        // console.log(r)
        router.use(r.routes())
    }
})

module.exports = router 