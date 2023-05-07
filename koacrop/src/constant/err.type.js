// 在出错的地方使用ctx.app.emit提交错误
// 在app中通过app.on监听
module.exports = {
    userFormateError: {
        code: '10001',
        message: '用户名或密码为空',
        result: ''
    },
    userAlreadyExited: {
        code: '10002',
        message: '用户已经存在',
        result: ''
    },
    userRegisterError: {
        code: '10003',
        message: '用户注册错误',
        result: ''
    },
    userDoesNotExist:{
        code :'10004',
        message :'用户不存在',
        result: ''
    },
    userLoginError:{
        code :'10005',
        message :'用户登录失败',
        result: ''
    },
    invalidPassword:{
        code :'10006',
        message :'密码不匹配',
        result: ''
    },
    tokenExpiredError:{
        code : '10101',
        message:'token已过期',
        result:''
    },
    invalidToken:{
        code :'10102',
        message:'无效的token',
        result:''
    },
    tokenUnderfined:{
        code :'10104',
        message:'请登录',
        result:''
    },
    hasNOtAdminPermission:{
        code:'10103',
        message:'没有管理员权限',
        return:''
    },
    fileUploadError:{
        code :'10201',
        message:'商品图片上传失败',
        result:''
    },
    unSupportFileType:{
        code:'10202',
        message:'不支持的文件格式',
        result:''
    },
    goodFormatError:{
        code:'10203',
        message:'商品参数格式错误',
        result:'',
    },
    publishGoodsError:{
        code:'100204',
        message:'发布商品失败',
        result:''
    },
    invalidGoodsID:{
        code:'10205',
        message:'无效的商品id',
        result:''
    },
    cartFormatError:{
        code:'10301',
        message:'购物车数据格式错误',
        result:''
    },
    addrFormatError:{
        code:'10401',
        message:'数据格式错误',
        result:''
    },
    commonFormatError:{
        code:'10501',
        message:'数据格式错误',
        result:''
    },
    
    folderCreateError:{
        code :'10801',
        message:'文件夹创建失败',
        result:''
    },
    orderFolderError:{
        code :'10802',
        message:'order指令为空',
        result:''
    },
    getFolderError:{
        code :'10803',
        message:'获取文件错误或者目标文件不在',
        result:''
    },



}