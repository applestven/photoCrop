const crypto = require('crypto');
// function CommonSign(apiParams, app_secret) {
//     /** 通用 md5 签名函数 */
//     const shasum = crypto.createHash('md5');
//     if (apiParams == null || !(apiParams instanceof Object)) {
//         return "";
//     }

//     /** 获取 apiParms中的key 去除 sign key,并排序 */
//     let sortedKeys = Object.keys(apiParams).filter((item) => item !== "sign").sort();
//     /** 排序后字符串 */
//     let sortedParamStr = "";
//     // 拼接字符串参数
//     sortedKeys.forEach(function (key, index, ary) {
//         let keyValue = apiParams[key];
//         if (keyValue instanceof Object) keyValue = JSON.stringify(keyValue);
//         if (key != "sign" && keyValue != null && keyValue != "") {
//             sortedParamStr += `${key}${keyValue}`;
//         }
//     });
//     /** 拼接加密字符串 */
//     let paraStr = app_secret + sortedParamStr;

//     // https://openweb.jushuitan.com/doc?docId=140&name=API%E6%B5%8B%E8%AF%95%E5%B7%A5%E5%85%B7
//     console.info(`待加密字符串,可与官网测试工具对比：`, paraStr);

//     shasum.update(paraStr);
//     let sign = apiParams.sign = shasum.digest('hex');
//     return sign;
// }
const CommonSign = async (ctx,next)=>{
    console.log("通");
   
        try{
            console.log("dao");
            let app_secret = "946cc2ce4ba6468d8f0ae9d29dea1a9c" 
            let apiParams =ctx.request.body 
            const shasum = crypto.createHash('md5');
            if (apiParams == null || !(apiParams instanceof Object)) {
                console.log("参数为空")
                return "";
                
            }
            console.log("dao");
            /** 获取 apiParms中的key 去除 sign key,并排序 */
            let sortedKeys = Object.keys(apiParams).filter((item) => item !== "sign").sort();
            /** 排序后字符串 */
            let sortedParamStr = "";
            // 拼接字符串参数
            sortedKeys.forEach(function (key, index, ary) {
                let keyValue = apiParams[key];
                if (keyValue instanceof Object) keyValue = JSON.stringify(keyValue);
                if (key != "sign" && keyValue != null && keyValue != "") {
                    sortedParamStr += `${key}${keyValue}`;
                }
            });
            /** 拼接加密字符串 */
            let paraStr = app_secret + sortedParamStr;

            // https://openweb.jushuitan.com/doc?docId=140&name=API%E6%B5%8B%E8%AF%95%E5%B7%A5%E5%85%B7
            console.info(`待加密字符串,可与官网测试工具对比：`, paraStr);

            shasum.update(paraStr);
            let sign = apiParams.sign = shasum.digest('hex');
            ctx.request.body['sign'] = sign
            
        }catch (err){
            console.log(err)
        }
        console.log("dao");
        await next()
    
}
module.exports ={
    CommonSign
}