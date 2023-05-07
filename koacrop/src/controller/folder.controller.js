const path = require('path')
const fs = require("fs")
const { emptyDir } = require("../utils/clearfolder")

const {marked} = require('marked'); // 将md转化为html的js包

// const 
const { folderCreateError, getFolderError, orderFolderError, fileUploadError, unSupportFileType } = require("../constant/err.type")
const { createFloder } = require("../service/folder.service")
const {
    NEXTCLOUD_PATH,
    NEXTCLOUD_USER,
    NEXTCLOUD_PWD,
    NEXTCLOUD_NOTICE_PATH,
    NEXTCLOUD_NOTICEIMG_PATH
} = require('../config/config.default')

class folderContrlller {

    async create(ctx) {//创建目录
        console.log("拿到")
        console.log(ctx.request.body)
        const { path } = ctx.request.body
        let fullPath = NEXTCLOUD_PATH + path
        // http://192.168.0.188:8181/remote.php/dav/files/root/
        // var curl = 'curl http://www.baidu.com'

        // curl -u admin:admin 'http://10.31.4.74/remote.php/dav/files/admin/test2/' -X MKCOL

        var curl = 'curl -u ' + NEXTCLOUD_USER + ':' + NEXTCLOUD_PWD + ' ' + fullPath + ' -X MKCOL'
        // console.log("curl 命令 ",curl)
        var execSync = require("child_process").execSync;
        // var result = execSync(curl);
        var res = Buffer.from(execSync(curl)).toString();
        if (res == '') {
            ctx.body = {
                code: 0,
                message: '目录创建成功',
                result: {

                },
            }
        } else {
            console.error("创建失败", res)
            folderCreateError.result = res
            return ctx.app.emit('error', folderCreateError, ctx)
        }
    }
    async download(ctx) { // 下载文件 获取图片 获取文件
        console.log('@获取公告');
        // 拿到读取命令  1 读取这个原图事项
        const { order } = ctx.request.body
        let execSync = require("child_process").execSync;
        // curl -u admin:admin 'http://10.31.4.74/remote.php/dav/files/admin/test/1.md' -X GET -o
        if (order == 1) { // 读取注意事项
            var curl = 'curl -u ' + NEXTCLOUD_USER + ':' + NEXTCLOUD_PWD + ' ' + NEXTCLOUD_PATH + encodeURI(NEXTCLOUD_NOTICE_PATH) + ' -X GET -o '+path.join(__dirname,"../download")+'/test.md'
            console.log(curl)
            try {
                // 处理 读取文件是否成功与否   并返回错误 
                let res = execSync(curl);
                console.log('@res',res)
                
                //  console.log(path.join(__dirname,'../download/'))
                const filePath = path.join(__dirname, `../download/test.md`);
                const data = fs.readFileSync(filePath,'utf-8');
                // console.log(typeof reader)
                // console.log(Object.prototype.toString.call(res))
                // 未判断获取是否成功 
                ctx.body = {
                    code: 0,
                    message: "读取文件成功",
                    res: marked(data)
                };
            } catch (err) {
                console.log('err', err)
                return ctx.app.emit("error", getFolderError, ctx)
            }
            return
        } else if (order == 2) { // 读取图片
            var curl = 'curl -u ' + NEXTCLOUD_USER + ':' + NEXTCLOUD_PWD + ' ' + NEXTCLOUD_PATH + encodeURI(NEXTCLOUD_NOTICEIMG_PATH) + ' -X GET -o '+ path.join(__dirname,'../download')+'/notice.jpg'
            console.log(curl)
            try {
                let res = execSync(curl);
                const filePath = path.join(__dirname, `../download/notice.png`);
                const reader = fs.readFileSync(filePath);
                // console.log(Object.prototype.toString.call(res))
                // 未判断获取是否成功 
                ctx.body = {
                    code: 0,
                    message: "读取图片成功",
                    res: reader
                };
            } catch (err) {
                console.log('err',err)
                return ctx.app.emit("error", getFolderError, ctx)
            }
            return
        }

        // ctx.body = {
        //     code: 0,
        //     message: '目录创建成功',
        //     result: {

        //     },
        // }
        return ctx.app.emit("error", orderFolderError, ctx)


        // console.log(res)
        // console.log(typeof res)

        // var ress = Buffer.from(execSync('ls')) 

        // console.log(ress)
        // 
        // let data = fs.readFileSync(res)
        // console.log(data.toString)
    }
    async upload(ctx, next) { //上传照片 
        // 创建文件夹 
        // console.log('@ctx',ctx.request)
        const { pathOne, pathTwo } = ctx.request.body
        const { file } = ctx.request.files
        // console.log(pathOne) 
        // console.log(pathTwo ) 
        // console.log('@ctx.request',ctx.request.files)
        // console.log('@files',file)
        // ctx.body = ctx.request 
        // return
        // console.log('@request',ctx.request.pathOne)
        // console.log("@mimetype",file.mimetype)
        const fileType = ['image/jpeg', 'image/png','application/pdf']
        if (file) {
            if (Object.prototype.toString.call(file) == '[object Array]') {
                if (file.some((item) => { console.log("@mimetype", item.mimetype); return !(fileType.includes(item.mimetype)) })) {
                    return ctx.app.emit('error', unSupportFileType, ctx)
                }
            } else if (Object.prototype.toString.call(file) == '[object Object]') { //上传单个文件 
                console.log("@mimetype", file.mimetype)
                if (!fileType.includes(file.mimetype)) {
                    return ctx.app.emit('error', unSupportFileType, ctx)
                }
            }

            // 创建文件夹 
            let curl1 = 'curl -u ' + NEXTCLOUD_USER + ':' + NEXTCLOUD_PWD + ' ' + NEXTCLOUD_PATH + encodeURI(pathOne) + ' -X MKCOL'
            let curl2 = 'curl -u ' + NEXTCLOUD_USER + ':' + NEXTCLOUD_PWD + ' ' + NEXTCLOUD_PATH + encodeURI(pathOne + '/' + pathTwo) + ' -X MKCOL'
            console.log("创建文件夹curl1 命令 ", curl1)
            console.log("创建文件夹curl2 命令 ", curl2)
            let execSync = require("child_process").execSync;
            // let result = execSync(curl);
            Buffer.from(execSync(curl1)).toString();
            let res2 = Buffer.from(execSync(curl2)).toString();
            console.log("@res2创建文件夹", res2)
            // if(res2 == ''){ // 上传失败的情况下 文件夹已创建  , 再次上传不该有阻拦
            //  上传到云端 
            // curl -u admin:admin 'http://10.31.4.74/remote.php/dav/files/admin/test/' -T /root/text.txt -X PUT

            // -T D:/gitee/photo-manage/koa/src/uploads/2df43749c25b1b039543f9c01.jpg
            // curl -u root:12345687 http://192.168.0.188:8181/remote.php/dav/files/root/%E7%AC%AC%E4%B8%80%E6%96%87%E4%BB%B6%E5%A4%B9/%E7%AC%AC%E4%BA%8C%E6%96%87%E4%BB%B6%E5%A4%B9/ -T D:/gitee/photo-manage/koa/src/uploads/2df43749c25b1b039543f9c01.jpg -X PUT
            // -F "file=@/Users/fungleo/Downloads/401.png"


            // let curl = 'curl -u '+NEXTCLOUD_USER+':'+NEXTCLOUD_PWD+' '+NEXTCLOUD_PATH+encodeURI(pathOne+'/'+pathTwo+'/')+' -T '+path.join(__dirname,'../uploads')+'\\'+'2df43749c25b1b039543f9c00.jpg -X PUT'

            // file.forEach(item => {
            //     let curl = 'curl -u '+NEXTCLOUD_USER+':'+NEXTCLOUD_PWD+' '+NEXTCLOUD_PATH+encodeURI(pathOne+'/'+pathTwo+'/')+' -T '+path.join(__dirname,'../uploads')+'\\'+item.filepath+' -X PUT'
            // });
            
            let curl;
            let res;
            if (Object.prototype.toString.call(file) == '[object Array]') { // 上传多个个文件的对象为Array
                console.log('@上传多个文件夹')
                try {
                    for (let i = 0; i < file.length; i++) {
                        curl = 'curl -u ' + NEXTCLOUD_USER + ':' + NEXTCLOUD_PWD + ' ' + NEXTCLOUD_PATH + encodeURI(pathOne + '/' + pathTwo + '/') + ' -T ' + file[i].filepath + ' -X PUT'
                        curl = curl.replace(/\\/g, '/')
                        console.log("@curl" + i, curl)
                        res = Buffer.from(execSync(curl)).toString();
                        console.log('@res上传第' + i + '个文件', res)
                        if (res == '') {
                            // 上传成功
                            console.log("上传成功")
                        } else {
                            return ctx.app.emit('error', fileUploadError, ctx)
                        }
                    }
                } catch (error) {
                    return ctx.app.emit('error', fileUploadError, ctx)
                }
            } else if (Object.prototype.toString.call(file) == '[object Object]') { //上传单个文件的对象为object 
                console.log("@上传单个文件 ");
                try {
                    // file.newFilename = file.originalFilename
                    // 给文件重命名  遇到问题： curl不支持中文路径 ， encodeURI后 curl找不到系统文件 ,只能上传成功后再给文件改名 （上传前改弃）
                    let originalFilename = file.originalFilename
                    console.log('@originalFilename',originalFilename)
                    // fs.rename(file.filepath,path.join(__dirname,"../uploads/"+file.originalFilename),(err)=>{
                    //     console.log("@err重命名",err)
                    // });
                    console.log("@fs",typeof file)
                    console.log("@file",file['filepath'])
                    // file.``filepath = path.join(__dirname,"../uploads/"+file.originalFilename)

                    // curl = 'curl -u '+'-H Content-type:application/x-www-form-urlencoded;charset=GBK' + NEXTCLOUD_USER + ':' + NEXTCLOUD_PWD + ' ' + NEXTCLOUD_PATH + encodeURI(pathOne + '/' + pathTwo + '/') + ' -T ' + encodeURI(path.join(__dirname,'../uploads/'+originalFilename)) + ' -X PUT'
                    curl = 'curl -u ' + NEXTCLOUD_USER + ':' + NEXTCLOUD_PWD + ' ' + NEXTCLOUD_PATH + encodeURI(pathOne + '/' + pathTwo + '/') + ' -T ' + file['filepath'] + ' -X PUT'
                    console.log("@curl",curl)
                    curl = curl.replace(/\\/g, '/')
                    res = Buffer.from(execSync(curl)).toString();
                    console.log('@res上传单个文件', res)
                    // console.log("@查看文件名",file)
                    if (res == '') {
                        // 上传成功  给文件重命名  
                        // let renameCurl = 'curl -u '+NEXTCLOUD_USER+':'+NEXTCLOUD_PWD+' '+NEXTCLOUD_PATH+ +encodeURI(pathOne+'/'+pathTwo+'/')+file.newFilename+' Destination: '+NEXTCLOUD_PATH+encodeURI(pathOne+'/'+pathTwo+'/'+file.originalFilename)+' -X MOVE'
                        // console.log("@renameCurl",renameCurl)
                        // let renameres = Buffer.from(execSync(renameCurl)).toString();
                        // console.log("@上传成功,修改文件名", renameres)
                    } else {
                        return ctx.app.emit('error', fileUploadError, ctx)
                    }
                } catch (error) {
                    console.log('@error', error)
                    return ctx.app.emit('error', fileUploadError, ctx)
                }
            } else {
                return ctx.app.emit('error', fileUploadError, ctx)
            }



            // let execSync = require("child_process").execSync;



            // 清除临时图片文件夹 
            emptyDir(path.join(__dirname, '../uploads'))

            ctx.body = {
                code: 0,
                message: '图片上传成功',
                result: {
                    // good_img:path.basename(file[0].filepath)
                }
            }
            return




        } else if (file && Object.prototype.toString.call(file) == '[object Object]') {
            let curl1 = 'curl -u ' + NEXTCLOUD_USER + ':' + NEXTCLOUD_PWD + ' ' + NEXTCLOUD_PATH + encodeURI(pathOne) + ' -X MKCOL'

        } else {
            return ctx.app.emit('error', fileUploadError, ctx)
        }
        //上传用户照片 

    }

}

module.exports = new folderContrlller()