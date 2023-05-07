<!-- 视频播放组件 -->

<template lang="">
    <div style="width:90%">
        <van-dialog v-model="dialogFlag" title="标题" >
            <img src="https://img01.yzcdn.cn/vant/apple-3.jpg" />
        </van-dialog>
    </div>
</template>
<script>
export default {
    data() {
        return {
            show: false,
        };
    },
    props:['dialogFlag']

}
</script>
<style lang="">
    
</style>