//1. 导入koa-router包 
const Router = require('koa-router')
// 中间件 控制器 
const { auth ,hadAdminPermission} = require('../middleware/auth.middleware')
const { create ,download, upload} = require('../controller/folder.controller')

// 2.实例化对象 
const router = new Router({ prefix: '/folder' })

// 创建文件夹 
router.post('/createFolder',auth,create)

// 上传文件
// curl -u admin:admin 'http://10.31.4.74/remote.php/dav/files/admin/test/' -T /root/text.txt -X PUT

// 下载文件
// curl -u admin:admin 'http://10.31.4.74/remote.php/dav/files/admin/test/1.md' -X GET -o test.md
// 获取公告 
router.post("/getNotice",download)

// 上传照片 
router.post("/upload",upload)



module.exports = router