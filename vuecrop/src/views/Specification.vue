<template lang="">
    <div>
        <p class="fs12 cred taleft mb30" style="margin-bottom:2rem">订单验证有效</p>
        <!-- 规格验证页 -->
        <van-radio-group class="fs12 mb30" v-model="radio" direction="horizontal" label-position="left">
            <div class="fs12 bcgray label" style=""><i class="cred">*</i> 品类</div>
            <van-radio name="卡片">卡片</van-radio>
            <van-radio name="圆形贴纸">圆形贴纸</van-radio>
            <van-radio name="方形贴纸">方形贴纸</van-radio>
        </van-radio-group>
        <van-radio-group class="fs12 mb15" v-model="radio2" direction="horizontal" label-position="left">
            <div class="fs12 bcgray label" style=""><i class="cred">*</i> 印面</div>
            <van-radio name="双面" :disabled="radio2Flag">双面</van-radio>
            <van-radio name="单面">单面</van-radio>
        </van-radio-group>
        <!-- 尺寸 -->
        <div class="fs12 mb15 taleft">
            <div class="fs12 bcgray label"  style=" ; display:inline ;text-align:left"><i class="cred">*</i>尺寸(mm)</div>
            <input v-model="inputVal.width" class="border1 inputStyle"/> 
                <i style="margin:0 1rem" v-if="heightFlag">*</i>
            <input v-model="inputVal.height" class="border1 inputStyle" v-if="heightFlag" /> 
        </div>
        <!-- 工艺 -->
        <div class="fs12 mb15 taleft">
            <div class="fs12 bcgray label"  style=" ; display:inline ;text-align:left"><i class="cred">*</i>工艺(mm)</div>
            <!-- <input v-model="inputVal.width" class="border1 inputStyle" /> 
                <i style="margin:0 1rem">*</i>
            <input v-model="inputVal.height" class="border1 inputStyle"/>  -->
            <select class="border1 inputStyle" style="width:9rem;height:1.5rem" v-model="selectVal">
                <option :value ="item" v-for="(item,i) in selectList" :key="i">{{item}}</option>
            </select>
            <input v-model="customIpu" v-if="customFlag" class="border1 inputStyle"style="margin-left:1rem ;" />
        </div>
        <!-- 上传图片 -->
        <van-button type="danger" block class="br5" @click="upImage()">上传图片</van-button>

        <!-- 弹窗视频 -->
        <div @click="()=>{ dialogFlag = true}" style="color:rgb(21,155,213) ; height:1rem" class="mt30 fs12 taleft">
            如何填写规格数据？
        </div>

        <van-dialog v-model="dialogFlag" title="如何填写规格数据？" width="90%">
            <!-- <div style="font-size:12px" class="padding10 taleft mb15 mt30">
                如何填写规格数据
            </div> -->
            <video v-if="dialogFlag" src="../../public/4k.mp4" style="width:100%;" controls="controls" autoplay></video>
        </van-dialog>

        <!-- 注意事项 -->
        <div v-html="noticeHTML" class="fs12 taleft " style=" line-height:1.3rem"></div>
    </div>
</template>
<script>
import { Toast } from 'vant'
import { getNotice } from "../api/service"
export default {
    name:"Specification",
    data() {
        return {
            heightFlag:true, 
            radio: "卡片",// 品类
            radio2: "",  // 印面
            inputVal: {
                width: "",
                height: ""
            }, // 尺寸
            selectVal: "235g白卡纸",
            customIpu:"", // 自定义工艺 
            customFlag:false , // 自定义输入框显示
            radio2Flag:false, // 印面双面是否可选  
            selectList:[
            '235g白卡纸',
            '哑膜',
            '亮膜',
            '250g珠光',
            '350g珠光',
            '240g英国那桑蛋壳纹',
            '240g德国经典麻纱超白',
            '350g德国经典麻纱超白',
            '250q瑞典环保白卡',
            '350g瑞典环保白卡',
            '350g白唯美',
            '自定义',
            ],
            noticeHTML:"", // 注意事项
            dialogFlag:false, // 弹窗视频
        }
    },
    methods:{
        upImage(){
            if(this.radio !="" && this.radio2 != "" && this.inputVal.width !=""){
               
                console.log("zo1");
                if(this.radio2 == '双面'){
                    this.$router.push({
                        path:'/cropper',
                        query:{ category:this.radio , amount:this.radio2 ,width:this.inputVal.width,height:this.inputVal.height,craft:this.selectVal+this.customIpu }})
                }else{
                    this.$router.push({
                        path:'/mutilCropper',
                        query:{ category:this.radio , amount:this.radio2 ,width:this.inputVal.width,height:this.inputVal.width,craft:this.selectVal+this.customIpu }})
                }
            }else{
                if(this.inputVal.width == ''){Toast("尺寸的值不能为空")}
                if(this.radio =="卡片" && this.inputVal.height == '' ){Toast("尺寸的值不能为空")}
                if(this.radio =="卡片" && this.inputVal.width <40 ||  this.inputVal.height <40 ){Toast("尺寸填写过小")}
                if(this.radio !="卡片" && this.inputVal.width <30 ||  this.inputVal.height <30 ){Toast("尺寸填写过小")}
                if(this.radio !="卡片" && this.inputVal.width >500 ||  this.inputVal.height >500 ){Toast("尺寸填写过大")}
                if(this.selectVal == '自定义' && this.customIpu == ''){Toast("请填写自定义工艺名称")}
            }
        },
        async getNotice(){
            let res = await getNotice({ order:1 })
            if(res.code  == 0){
                // console.
                this.noticeHTML = res.res 
            } 
        }
    },
    watch:{
        'radio2':{
            handler(newVal){
                if(newVal !== "单面"){
                    this.heightFlag = true ; 
                }else{
                    this.heightFlag =false
                }
            }
        },
        'selectVal':{
            handler(newVal){
                if(newVal == "自定义"){
                    // do some thing 
                    this.customFlag = true ; 
                }else{
                    this.customFlag = false ; 
                    this.customIpu = ""
                }
            }
        },
        'radio':{
            handler(newVal){
                if(newVal == "卡片"){
                    this.radio2Flag = false
                }else{
                    this.radio2Flag = true
                    this.radio2 = '单面'
                }
            }
        }
    },
    created(){
       this.getNotice()
    }
}
</script>
<style scoped>
.inputStyle {
    line-height: 1.2rem;
    width: 5rem
}

.label {
    padding: 0.2rem;
    margin-right: 12px;
    width: 3.5rem
}</style>