<template lang="">
    <div>
        <h3 class="mt30">订单号验证</h3>
        <!-- <input v-model="orderNumber" placeholder="请复制订单号进行验证" /><br/> -->
        <van-field v-model="orderNumber" class="border1 mb15 br5"  placeholder="请复制订单号进行验证" />
        <van-button type="danger" block class="br5" @click="verify()">验证</van-button>
        <div class="cred taleft fs12 mt15" v-show="tipflag" >订单号无效，请输入正确的淘宝订单号</div>

        <div @click="()=>{ dialogFlag = true}" style="color:rgb(21,155,213) ; height:3rem" class="mt30 fs12 taleft">
            如何复制订单编号: 找到订单编号，复制带框内，点击[验证] 后进行传图。(如有需要联系客服)
        </div>
        <!-- 弹窗视频 -->
        <van-dialog v-model="dialogFlag" title="如何复制订单编号" width="90%">
            <div style="font-size:12px" class="padding10 taleft mb15 mt30">
                如何复制订单编号: 找到订单编号，复制带框内，点击[验证] 后进行传图。(如有需要联系客服)  
            </div>
            <video v-if="dialogFlag" src="../../public/4k.mp4" style="width:100%;" controls="controls" autoplay></video>
        </van-dialog>

        

    </div>
</template>
<script>
import VideoPlay  from "../components/videoPlay.vue" 
import { getInitToken ,getsign ,getOrder } from "../api/service"
import md5 from 'js-md5';
export default {
    data() {
        return {
            orderNumber:'',
            dialogFlag:false, 
            tipflag:false,
        }
    },
    methods:{
        verify(){
            if(this.orderNumber == ''){
                this.tipflag = true ; 
                return ;    
            }
            this.$router.push({path:"/Specification"})
        }
    },
    created(){
        let date = (new Date().getTime()/1000).toFixed(0)
        //获取access——token 30天一次过期
        // getsign({   // 获取加密签名 自写 
        //     app_key:'6fa64de97fa34fef90964bc089f89aff',
        //     timestamp:date,
        //     grant_type:'authorization_code',
        //     charset:'utf-8',
        //     code:'12345D',//随机码（随机创建六位字符串）自定义值}).then(res=>{
        // }).then(res=>{
        //     console.log("res",res);
        //     getInitToken(res).then(resData=>{ // 获取access——token 官方
        //         console.log('resDATA',resData)
        //     })
        // })

        // access_token
        // : 
        // "169460a41d154b8188d6593525c29c9d"
        // expires_in
        // : 
        // 2481448
        // refresh_token
        // : 
        // "c569961b60674db28b9e71d31539d08f"
        // scope
        // : 
        // "all"
        getsign({
            app_key:'6fa64de97fa34fef90964bc089f89aff',
            access_token:'169460a41d154b8188d6593525c29c9d',
            timestamp:date,
            charset:'utf-8',
            version:'2',
        
            biz:JSON.stringify({page_index:'1',page_size:"10","so_ids":['5040020704834833681']})
        }).then(res=>{
            // let fromdata = new FormData()
            // for(let key in res){
            //     fromdata.append(key,res[key])
            // }
            getOrder(res).then(resData=>{
                console.log('resDATA',resData)
            })
        })
    },
    components:{
        VideoPlay 
    }
}
</script>
<style scoped>
input{
    width: 100%;
}
input::-webkit-input-placeholder{ /*WebKit browsers*/

font-size: 12px;
/* padding: 3rem; */
text-align: center;

}

input::-moz-input-placeholder{ /*Mozilla Firefox*/

font-size: 12px;
text-align: center;
}

input::-ms-input-placeholder{ /*Internet Explorer*/ 
    text-align: center;
    font-size: 12px;
}
</style>