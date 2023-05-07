const path = require('path')
//解析传递的参数 用来调用service层(sequelize操作数据库) ,返回操作结果   ,
const { createGoods , updateGoods ,removeGoods,restoreGoods,findGoods } = require("../service/goods.service")
const { unSupportFileType ,fileUploadError,publishGoodsError ,invalidGoodsID}  = require('../constant/err.type')

class GoodsController {
    
    async upload(ctx,next){
        console.log(ctx.request.files) // files表示可以上传多个文件 ， file代表请求参数的名字 例如 img
        // ctx.body = '商品图片上传成功'
        const {file} =ctx.request.files

        const fileType = ['image/jpeg','image/png']
        if(file){
            if(!fileType.includes(file.mimetype)){
                return ctx.app.emit('error',unSupportFileType,ctx)
            }
            ctx.body ={
                code : 0 ,
                message:'商品图片上传成功',
                result:{
                    good_img:path.basename(file.filepath)
                }
            }
        }else{
            return ctx.app.emit('error',fileUploadError,ctx)
        }

    }
    async create (ctx){
        //直接调用service的createGoods方法
        try {
          const { createAt,updatedAt,...res} =  await createGoods(ctx.request.body)
          ctx.body = {
            code :0 ,
            message:'发布商品成功',
            result:res 
          }
        } catch (error) {
            console.error(error)
            return ctx.app.emit('error',publishGoodsError,ctx)
        }
    } 
    async update(ctx){
        try {
            const res = await updateGoods(ctx.params.id , ctx.request.body)
            if(res){
                ctx.body ={
                    code: 0 ,
                    message:"修改商品成功",
                    result:''
                }
            }else{
                return ctx.app.emit('error',invalidGoodsID , ctx)
            }
        } catch (error) {
            console.log(error)
        }

    }
    async remove(ctx){
        console.log("删除接口")
        const res = await removeGoods(ctx.params.id)
        console.log("删除返回",res)
        if(res){
            ctx.body = {
                code : 0,
                message:'下架商品成功',
                result:''
            }
        }else{
            return ctx.app.emit("error",invalidGoodsID,ctx)
        }
        
    }
    async restore(ctx){
        const res = await restoreGoods(ctx.params.id)
        if(res){
            ctx.body = {
                code : 0,
                message:'上架商品成功',
                result:''
            }
        }else{
            return ctx.app.emit("error",invalidGoodsID,ctx)
        }
    }
    async findAll(ctx){
        // 1. 解析 pageSize  和  pageNum 
        const {pageNum ,pageSize} = ctx.request.query
        console.log("findALL")
        // 2. 调用数据处理的相关方法 
        const res = await findGoods(pageNum , pageSize)
        // 3 . 返回结果 
        ctx.body ={
            code : 0 , 
            message:"获取商品列表成功",
            result:res
        }


    }
}

module.exports = new GoodsController()