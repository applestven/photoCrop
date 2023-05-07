// 我们把转换值的过程交给浏览器完成，我们不需要去知道设备的尺寸和比例 

// 	// 获取每毫米的像素值
// export 	function getOneMmsPx (){
// 		// 创建一个1mm宽的元素插入到页面，然后坐等出结果
// 		let div = document.createElement("div");
// 		div.id = "mm";
// 		div.style.width = "1mm";
// 		document.querySelector("body").appendChild(div);
// 		// 原生方法获取浏览器对元素的计算值
// 		let mm1 = document.getElementById("mm").getBoundingClientRect();
// 		console.log(mm1);
// 		return mm1.width;
// 	} 

export function getOneMmsPx (){
	return new Promise((resolve,reject) =>{
		// 创建一个1mm宽的元素插入到页面，然后坐等出结果
		let div = document.createElement("div");
		div.id = "mm";
		div.style.width = "1mm";
		document.querySelector("body").appendChild(div);
		// 原生方法获取浏览器对元素的计算值
		let mm1 = document.getElementById("mm").getBoundingClientRect();
		// console.log(mm1);
		// return mm1.width;
		let timer = setInterval (()=>{
			if(mm1.width >0){
				resolve(mm1.width)
			}
		})
	})
}