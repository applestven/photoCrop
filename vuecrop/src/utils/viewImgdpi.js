export  function getImgInfo(url){
    return new Promise((resolve, reject) => {
        let image = new Image();
        image.src = url;
        let timer = setInterval(() => {
            if (image.width > 0 || image.height > 0) {
                // resolve(`${image.width}*${image.height}`); // 图片宽*高
                resolve({width:image.width,height:image.height })
                clearInterval(timer);
            }
        }, 50)
    })
}

// 获取图片分辨率
// getImgInfo(url).then(res => { console.log(res); })	//res: 上面代码resolve中的内容