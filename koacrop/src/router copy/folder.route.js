//1. 导入koa-router包 
const Router = require('koa-router')
// 中间件 控制器 
const { auth ,hadAdminPermission} = require('../middleware/auth.middleware')
const { createFolder } = require('../controller/folder.controller')

// 2.实例化对象 
const router = new Router({ prefix: '/folder' })

// 创建文件夹 
router.post('createFolder',auth,createFolder)