<template lang="">
    <div class="taleft fs12 ">
        <div v-if="!loading.flag">
            <div class="cblue" style="display:flex;justify-content: space-between;">
                <van-uploader :after-read="afterReadRest" :multiple="true">
                    <!-- <van-button icon="plus" type="primary">上传文件</van-button> -->
                    <van-button   type="primary" icon="plus" class="br5" @click="addImage()" style="height:2rem">添加单面图片</van-button>
                </van-uploader>
                <!-- <van-button type="default" class="br5" @click="addImage()" style="height:2rem">添加单面图片</van-button> -->
                <van-button type="danger" class="br5" @click="uploadImg()" style="height:2rem">上传</van-button>
            </div><br>
            <div class="cblue" @click="changeDialog('1')">如何上传单面图片?</div><br>
            <div class="cblue" @click="changeDialog('2')">如何编辑预览图？</div><br>
            <div class="cblue" @click="changeDialog('3')">
                关于裁切误差:<br>
                虚线框为大概裁切位置，因裁切误差存在，亲要注意<br>
                以下情况:<br>
                1.裁切会存在不对称，尤其是带框图<br>
                2.图片要铺满整个框，不能刚好放在虚线框内，否则切出来会出现白边<br>
                3.特别重要图片文字内容要离虚线位置大概3mm左右，参考虚线与外框的距离为2mm<br>
            </div>
            <!-- 弹窗视频 -->
            <van-dialog v-model="dialog.flag" :title="dialog.type == 1 ? '如何上传双面图片?' : dialog.type == 2 ? '如何编辑预览图？' : '关于裁剪误差'" width="90%">
                <div style="font-size:12px" class="padding10 taleft mb15 mt15" v-if="dialog.type==3">
                    关于裁切误差:<br>
                    虚线框为大概裁切位置，因裁切误差存在，亲要注意<br>
                    以下情况:<br>
                    1.裁切会存在不对称，尤其是带框图<br>
                    2.图片要铺满整个框，不能刚好放在虚线框内，否则切出来会出现白边<br>
                    3.特别重要图片文字内容要离虚线位置大概3mm左右，参考虚线与外框的距离为2mm<br>
                </div>
                <video v-if="dialog.flag" :src="dialog.src" style="width:100%;" controls="controls" autoplay></video>
            </van-dialog>
            <!-- 图片显示区域 -->
            <!-- <div style="color:rgb(51,51,51)" v-for="(item ,i) in groudList" >
                <div style="width:100% ;display:flex;justify-content:space-between" class="mt15">
                    <div style="width:46%"  @click="clickGroud(i ,0)" >
                        <van-uploader style="display:block" :after-read="afterRead" v-model="item.frontList" :preview-full-image="false">
                            <div style="width:10rem ; height:11rem ; " class="bcgray" >
                                <van-icon name="plus" style="top:40%;left:40% ;" size="2rem" />
                            </div>
                        </van-uploader>
                        <br>
                        <div class="tacenter">正面</div>
                    </div>
                    <div style="width:46% ;"  @click="clickGroud(i ,1)" >
                        <van-uploader style="display:block" :after-read="afterRead" v-model="item.reverseList" :preview-full-image="false">
                            <div style="width:10rem ; height:11rem ; " class="bcgray" >
                                <van-icon name="plus" style="top:40%;left:40% ;" size="2rem" />
                            </div>
                        </van-uploader>
                        <br>
                        <div class="tacenter">背面</div>
                    </div>
                    
                </div>
                <div class="tacenter">
                    数量: <input v-model="item.number" style="width:3.5rem" class="tacenter" /> 张
                </div>
                <hr> 
            </div> -->
            <!-- 重写展示区域 -->
            <div style="width:100% ;display:flex;justify-content:space-between;flex-wrap: wrap" class="mt15">
                <div style="width:46%"  @click="clickGroud(i)"  v-for="(item , i) in groudList" class="mt15">
                            <van-uploader style="display:block" :before-delete="deleteImg" :after-read="afterRead"  :preview-full-image="false" v-model="item.frontList" :max-count="1">
                                <div style="width:10rem ; height:11rem ; " class="bcgray" >
                                    <van-icon name="plus" style="top:40%;left:40% ;" size="2rem" />
                                    <!-- <img :src="item.frontList[0].content"> -->
                                </div>
                            </van-uploader>
                            <br>
                            <div class="tacenter">
                        数量: <input v-model="item.number" style="width:3.5rem" class="tacenter" /> 张
                    </div>
                </div>
            </div>
            <!-- loading -->
            <van-overlay :show="overlayshowFlag" >
                <div class="wrapper" @click.stop>
                    <div class="block" >
                        <van-loading size="24px" vertical>处理中...</van-loading>
                    </div>
                </div>
            </van-overlay>
            <!-- <p class="tacenter cblue" @click="addGroup"> 增加一组</p> -->
            <!-- 批量处理剪切板 -->
                    <vueCropper
                        v-if="delCropperFlag"
                        :fixedBox="true"
                        style="height:300px;margin-top:100rem"
                        :autoCrop="true"
                        :autoCropWidth="queryData.width"
                        :autoCropHeight= "queryData.height"
                        ref="iscropper"
                        :img="isoption.img"
                        :outputType="isoption.outputType"
                        :enlarge="coefficient"
                    ></vueCropper>
            <!-- 裁剪板 show-cancel-button-->
            <van-dialog v-model="show"   width="95%" style="height:auto;overflow-y:auto;padding:5px" :lockScroll="false" @cancel="cancel" @confirm="confirm"> 
                <div style="height:auto;overflow:auto;" class="mt15">
                <div style="width:100%;height:300px;">
                    <vueCropper
                        :fixedBox="true"
                        @realTime="realTime"
                        style="height:300px"
                        :autoCrop="true"
                        :autoCropWidth="queryData.width"
                        :autoCropHeight= "queryData.height"
                        ref="cropper"
                        :img="option.img"
                        :outputSize="option.size"
                        :outputType="option.outputType"
                        :enlarge="coefficient"
                    ></vueCropper>
                </div>
                <div class="tacenter mb30">
                    <van-button type="primary" @click="handlerOption('clockwise')" >顺时针</van-button>
                    <van-button type="primary" @click="handlerOption('anticlockwise')">逆时针</van-button>
                    <van-button type="primary" @click="handlerOption('add')">+</van-button>
                    <van-button type="primary" @click="handlerOption('crease')">-</van-button>
                    <van-button type="primary" @click="handlerOption('restoration')">复位</van-button>
                </div>
                <!-- 截图预览 -->
                <p class="tacenter">截图预览:</p>
                <div style="height:250px;">
                        <div style="width:90%;height:200px;padding:10px;position: relative;display:flex;justify-content:center">
                            <div :style="{border:'1px dashed grey', width:queryData.width - 4+'px', height:queryData.height -4 +'px',position: 'absolute',top:'11px'}"></div>
                            <img :src="previewStyle.url" alt="" :style="previewStyle">
                        </div>
                    </div>
                </div>
            
                <!-- <img src="https://img01.yzcdn.cn/vant/apple-3.jpg" /> -->
            </van-dialog>
        </div>

        <!-- 图片上传页 -->
        <div v-if="loading.flag">
            <div style="width:100% ;height:8rem;" class="tacenter">
                <img :src="loading.status == 0 ? '/success.png' :loading.status == 1 ? '/fail.png' : '/fresh.gif'" alt="" style="width:5rem">
                <div class="mt15 mb30">
                    {{ loading.status == 0  ? '图片上传成功' : loading.status == 1 ? '图片上传失败' : '正在上传' }}
                </div>
            </div>
            <van-button type="info" @click="feedback('continueUp')" class="mt15 br5" block v-show="loading.status == 0">继续上传其他尺寸图片</van-button>
            <van-button type="danger" @click="feedback('out')" class="mt15 br5" block v-show="loading.status == 0">退出订单号验证</van-button>
            <van-button type="danger" @click="feedback('resUp')" class="mt15 br5 mb30" block v-show="loading.status == 1">重新上传</van-button>
            <br><br>
            注: <br/>
            1.图片上传过程中请不要关闭浏览器，否则会导致图片上传失败。<br>
            2.点击“继续上传其他尺寸图片或“退出订单号验证按钮不会影响图片上传。<br><br>
            <div class="cblue">

                <div>关于色差问题</div> <br>
                   
                <div>关于图片上传与售后问题</div><br>
                    
                <div>
                    关于图片裁切误差:
                    虚线框为大概裁切位置，因裁切误差存在，亲要注意一下情况: <br>
                    1.裁切会存在不对称，尤其是带框图 <br>2.图片要铺满整个框，不能刚好放在虚线框内，否则
                    切出来会出现白边 <br>
                    3.特别重要图片文字内容要离虚线位置大概3mm左右，参考虚线与外框的距离为2mm
                </div>

            </div>
            

        </div>


    </div>
</template>
<script>
import { getImgInfo } from "../utils/viewImgdpi"
import { getBase64URL, base64ImgtoFile } from "../utils/base64URL"
import { VueCropper } from 'vue-cropper'
import { debounceS } from "../utils/debounce.js"
import { getOneMmsPx } from "../utils/transitionPx"
import { upload } from "../api/service"
import changedpi from '../utils/base64Dpi'
export default {
    name: "Cropper",
    data() {
        return {
            delCropperFlag:false,
            overlayshowFlag:false, // loaading
            dialog: { // 视频弹窗 
                flag: false,
                src: '../../public/4k.mp4',
                type: '',
            },
            show: false,
            groudList: [ // 图片组
                // {
                //     frontList: [], // 正面
                //     reverseList: [], // 反面 弃
                //     groundIndex: 0, // 组id 弃
                //     originList: [], // 源照片 
                //     number: 1 // 
                // }
            ],
            loacation: [], // 点击哪组图片 
            option: {
                outputType: 'jpeg',
                img: '',
            },
            isoption: {
                outputType: 'jpeg',
                img: '',
            },
            previewStyle: { // 预览图片的宽高 
                width: '',
                height: '',
                url: ''
                // width:'auto', height:'auto', maxWidth:'100%', maxHeight:'100%'
            },
            queryData: {},
            coefficient: 1, // 裁剪框系数
            loading: {
                flag: false,// 加载页面显示
                status: 2 // 上传状态 0 成功  1 失败  2 上传中
            },
            groupLength:0 , // 用来判断是否截图成功

        }
    },
    components: {
        VueCropper,
    },
    methods: {
        deleteImg(data){
            console.log("删除",data);
            // 删除照片 
            setTimeout(() => {
                this.groudList.some((item,i)=>{
                    if(item.frontList.length !=1){
                        console.log("@找到啦");
                        this.groudList.splice(i,1)
                        return true
                    }
                    console.log("@继续找");
                })
            }, 300);
            return true
            
        },
        feedback(type) { //上传后 按键反馈
            switch (type) {
                case 'continueUp':
                    this.$router.push("/Specification")
                    break;
                case 'out':
                    this.$router.push("/")
                    break;
                case 'resUp':
                    this.uploadImg()
                    break;

                default:
                    break;
            }
        },
        async uploadImg() { // 上传图片
            console.log("上传图片");
            let fileList = []
            // this.groudList.forEach(item => {
            //     if (item.frontList.length && item.reverseList.length) {
            //         fileList.push(item.frontList[0].file, item.reverseList[0].file)
            //     }
            // })
            this.groudList.forEach(item => {
                if(item.frontList.length){
                    fileList.push(item.frontList[0].file)
                }
            })
            if (fileList.length > 1) {
                this.loading.flag = true
                this.loading.status = 2

            } else {
                Toast("请先上传图片")
            }
            let formdata = new FormData()
            fileList.forEach(item => {
                formdata.append('file', item)
            })
            formdata.append('pathOne', '内部单号+姓+手机后四位')
            formdata.append('pathTwo', this.$route.query.width + '*' + this.$route.query.height + ':' + this.$route.query.craft)
            let res = await upload(formdata)
            // console.log('@res',res)
            if (res.code == 0) {
                this.loading.status = 0
            } else {
                this.loading.status = 1
            }
        },
        changeDialog(type) { // 视频弹窗 
            this.dialog.type = type
            switch (type) {
                case '1': // 如何上传双图片 ？ 
                    this.dialog.flag = true
                    // this.dialog.src = ''
                    break;

                case '2':  // 如何编辑预览图 ？ 
                    this.dialog.flag = true
                    break;

                case '3': // 关于裁剪误差
                    this.dialog.flag = true
                    break;

                default:
                    break;
            }
        },
        confirm() {// 截图确定 
            // if (!this.loacation[1]) { // 判断正背面 
            //     this.groudList[this.loacation[0]].frontList[0]['content'] = this.previewStyle.url
            //     this.groudList[this.loacation[0]].frontList[0]['file'] = base64ImgtoFile(this.previewStyle.url)

            // } else {
            //     this.groudList[this.loacation[0]].reverseList[0]['content'] = this.previewStyle.url
            //     this.groudList[this.loacation[0]].reverseList[0]['file'] = base64ImgtoFile(this.previewStyle.url)
            // }
            console.log('@this.loacation[0]',this.loacation[0])
            this.groudList[this.loacation[0]].frontList[0] = {
                file:base64ImgtoFile(changedpi.changeDpiDataUrl(this.previewStyle.url,300)) ,
                content:changedpi.changeDpiDataUrl(this.previewStyle.url,300)
            }
            this.previewStyle.url = ''
        },
        cancel() { // 截图取消 
            if (!this.loacation[1]) { // 判断正背面
                this.groudList[this.loacation[0]].frontList = []
            } else {
                this.groudList[this.loacation[0]].reverseLis = []
            }

        },
        realTime(data) {
            // this.previews = data
            // console.log("@realtimedata", data)
            debounceS(() => {
                this.$refs.cropper.getCropData((data) => {
                    // do something
                    // console.log(data)
                    // getCropBlob  获取截图的blob数据  ;getCropData  获取截图的base64 数据   
                    // this.$refs.cropper.getCropData((data) => {
                    // do something
                    this.previewStyle.url = data
                    // })

                })
            }, 500, this)

        },
        async afterRead(data) { // 文件上传之后的处理  弃
            console.log('@afterRead');
            //获取图片的分辨率（+4mm出血）  与传过来的规格做比较 较小删除图片   
            // 规格合适 设置截图框大小 
            let wh = await getImgInfo(data.content)
            console.log('@wh读取到图片的宽高', wh)
            // this.$refs.cropper.cropW = wh.width
            // this.$refs.cropper.cropH = wh.height
            this.option.img = data.content
            this.show = true
            if (!this.loacation[1]) { // 判断正背面 
                this.groudList[this.loacation[0]].frontList[0]['imageFit'] = 'contain'
                this.groudList[this.loacation[0]].originList[0] = data.content
            } else {
                this.groudList[this.loacation[0]].reverseList[0]['imageFit'] = 'contain'
                this.groudList[this.loacation[0]].originList[1] = data.content
            }

        },
        afterReadRest(data) {
            console.log('@resdata', Object.prototype.toString.call(data))
            let imgOb = JSON.parse(JSON.stringify(data))
            this.delCropperFlag = true
            if (Object.prototype.toString.call(imgOb) == '[object Object]') { // 单张图片上传 
                this.isoption.img = data.content

                // if (this.$refs.iscropper.cropW && this.$refs.iscropper.cropH) {
                //     this.$refs.iscropper.getCropData((cropData) => {
                //         console.log("处理的data", cropData);
                //         this.groudList.push({
                //             frontList: [{ content: cropData, file: base64ImgtoFile(cropData)}],
                //             originList: [{ ...data }],
                //             number: 1 
                //         })
                //     })
                // }
                this.getCropperImg(data) 
                setTimeout(() => { //延时关闭剪切板
                    this.delCropperFlag = false 
                    console.log("@关闭剪切板")
                }, 1500);
                
            } else if(Object.prototype.toString.call(imgOb) == '[object Array]'){ // 多张
                
                this.overlayshowFlag = true
                console.log("@imgob",imgOb);
                let index = imgOb.length -1 
                console.log("@index",index);
                let inter = setInterval(() => {
                    // 在这里判断 裁剪图片是否完成 ， 没有完成则继续  、、 数量上判断、、、
                    if(this.groupLength == this.groudList.length || this.groudList.length ==0){ // 裁剪成功   开始下一张裁剪
                        this.isoption.img = imgOb[index].content
                        this.getCropperImg(imgOb[index])
                        index -=1
                    }else{// 裁剪失败 继续上一张 
                        console.log('@裁剪失败 继续上一张');
                    }
                    // this.groupLength = this.groudList.length  
                    if(index < 0){
                        console.log('结束');
                        clearInterval(inter)
                        this.overlayshowFlag = false
                        setTimeout(() => {
                            this.delCropperFlag = false
                            console.log("@关闭剪切板")
                        }, 500);
                    }
                }, 500);
            }
        },
        getCropperImg(data){ // 辅助处理照片
            this.groupLength  = this.groudList.length + 1
        //    let inter= setInterval(() => {
            // changedpi.changeDpiDataUrl(cropData,300)
                    setTimeout(() => {
                        console.log("裁剪",this.$refs.iscropper);
                        this.$refs.iscropper.getCropData((cropData) => {
                            console.log("裁剪成功");
                            this.groudList.push({
                                frontList: [{ content: changedpi.changeDpiDataUrl(cropData,300), file: base64ImgtoFile(changedpi.changeDpiDataUrl(cropData,300))}],
                                originList: [{ ...data }],
                                number: 1 
                            })
                        })
                    }, 150); // 图片加载(大图加载未完成 ， 可能失图)
                    // clearInterval(inter)
                
            //     else{
            //         console.log("继续递归")
            //         this.getCropperImg()
            //     }
            // }, 150);
        },
        addGroup() { // 增加一组  弃
            this.groudList.push({
                frontList: [], // 正面
                reverseList: [], // 反面
                groundIndex: this.groudList.length, // 组id 
                originList: [], // 源照片  0 为正  1 为背
                number: 1
            })
        },
        clickGroud(groundIndex) { // 点击组赋值 
            console.log("groundIndex",groundIndex)
            this.loacation = [];
            this.loacation.push(groundIndex)
            // if (!face && this.groudList[groundIndex].frontList.length == 1) {
            //     this.show = true
            //     this.option.img = this.groudList[groundIndex].originList[0]
            // } else if (face && this.groudList[groundIndex].reverseList.length == 1) {
            //     this.show = true
            //     this.option.img = this.groudList[groundIndex].originList[1]
            // }
            // this.$refs.cropper.getCropData((data) => {
            //     this.$refs.cropper.getCropData((data) => {
            //         // do something
            //         console.log()
            //         this.previewStyle.url = data
            //     })
            // })

            this.show = true
            this.option.img = this.groudList[groundIndex].originList[0].content

        },
        handlerOption(name) { // 操作 
            switch (name) {
                case 'clockwise':
                    this.$refs.cropper.rotateRight()
                    break;
                case 'anticlockwise':
                    this.$refs.cropper.rotateLeft()
                    break;
                case 'add':
                    this.$refs.cropper.changeScale(0.1)
                    break;
                case 'crease':
                    this.$refs.cropper.changeScale(-0.1)
                    break;
                case 'restoration':
                    this.$refs.cropper.reload()
                    this.$refs.cropper.rotateClear()
                    break;

                default:
                    break;
            }
        },
    },
    async created() {
        // console.log('@getOneMmsPx',getOneMmsPx())
        let resPX = await getOneMmsPx()
        // console.log('@query',this.$route.query)
        this.queryData = JSON.parse(JSON.stringify(this.$route.query))
        if (this.queryData.width > 270 || this.queryData.height > 270) {
            this.coefficient = 2 * resPX
            this.queryData.width = ((Number(this.queryData.width) + 4) / 2).toFixed(2)
            this.queryData.height = ((Number(this.queryData.height) + 4) / 2).toFixed(2)
        } else {
            this.coefficient = 1 * resPX
            this.queryData.width = Number(this.queryData.width) + 4
            this.queryData.height = Number(this.queryData.height) + 4
        }

        this.previewStyle.width = this.queryData.width + 'px'
        this.previewStyle.height = this.queryData.height + 'px'
    }
}
</script>
<style scoped>
>>>.van-uploader__input-wrapper {
    /* width: 100%;
    height: 100%; */
}

>>>.van-uploader__preview {
    /* position: fixed; */
    /* z-index: 1001; */
    /* width: 46%;
    height: 150px;
    position: fixed;
    z-index:1001; */
    /* top:50%; */
    /* transform: translateY(-50%); */

}

>>>.van-uploader__preview-image {
    width: 10rem;
    height: 11rem;
    /* width:100% ;
    height: auto; */

}

>>>.van-uploader__preview {
    /* width:41%;
    margin-top: 12%; */
}
.wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  .block {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    /* margin: auto; */
  }
</style>