import request from "@/utils/request" ; 

// 获取公告 （注意事项文件 、  图片等）
export function getNotice(data) {
    return request({
    headers: { 'Content-Type': 'application/json' },  
      url: '/folder/getNotice',
      method: 'post',
      data
    });
}
// 上传照片 
export function upload(data) {
    return request({
      // headers: { 'Content-Type': 'multipart/form-data' },  
      url: '/folder/upload',
      method: 'post',
      data
    });
}
// 订单验证

export function getInitToken(data) { // 获取access——token 
  return request({
    // headers: { 'Content-Type': 'multipart/form-data' },  
    url: 'https://openapi.jushuitan.com/openWeb/auth/getInitToken',
    method: 'post',
    data
  });
}
export function getsign(data) { // 获取sign
  return request({
    // headers: { 'Content-Type': 'multipart/form-data' },  
    url: '/jushui/getAsstoken',
    method: 'post',
    data
  });
}
// export function getOrder(data) {  // 获取订单
//   return request({
//     // headers: { 'Content-Type': 'multipart/form-data' },  
//     url: 'https://openapi.jushuitan.com/open/orders/single/query',
//     method: 'post',
//     data
//   });
// }
export function getOrder(data) {  // 获取订单
  return request({
    // headers: { 'Content-Type': 'multipart/form-data' },  
    url: '/jushui/order',
    method: 'post',
    data
  });
}