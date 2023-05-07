<template>
  <div id="app">
    <div id="nav">
      <!-- <router-link to="/">Home</router-link> | -->
      <!-- <router-link to="/about">About</router-link> -->
      <!-- <Index/> -->
      <router-view/>
    </div>
    
  </div>
</template>
<script>
import  Index  from  "./views/Index.vue"
export default{
  components:{
    Index
  }
}

</script>
<style>
#app {
  margin-top: 30px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 20px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
.br5{
  border-radius: 5px;
}
.border1{
  border:1px solid rgb(232,232,232)
}
.mb15{
  margin-bottom: 15px;
}
.mb30{
  margin-bottom: 30px;
}
.mt15{
  margin-top: 15px;
}
.mt30{
  margin-top: 30px;
}
.padding10{
  padding: 10px;
}
.taleft{
  text-align: left;
}
.tacenter{
  text-align: center;
}
.taright{
  text-align: right;
}
.fs12{
  font-size: 12px;
}
.cred{
  color: red;
}
.cblue{
  color: rgb(22,155,213);
}
.bcgray{
  background-color:rgb(242,242,242)
}
</style>
