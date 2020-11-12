<template>
  <div id="app">
    <!-- <div class="left">

    </div> -->
    <!-- <div class="right"> -->
          <router-view ></router-view>

    <!-- </div> -->
  </div>
</template>

<script>
// import Login from './components/Login.vue'

export default {
  name: 'app',
  components: {
    // Login
  }
}
</script>

<style lang="scss" scoped>
body{
  width: 100%;
  height: 100%;
  margin: 0 auto;
}
body .el-table th.gutter{
display: table-cell!important;
}
#app{
  min-width: 1000px;
  width: 100%;
  height:100%
}
.app-Header{
  width:100%;
  height: 48px;
  background-color:#394263;
}
.app-Header .app-headerBox{
  width:90%;
  height: 100%;
  white-space: nowrap;
  overflow: hidden;
  margin:0 auto;
}
.h-logoBox .h-logo{
    // background: url(./assets/logo.svg) no-repeat center;
    background-size: 100% 100%;
    width: 78px;
    height:100%;
}
.h-logoBox{
    /* margin:0 40px; */
    width:25%;
    height: 48px;
    line-height: 48px;
    white-space: nowrap;
    float: left;
}

.h-logoBox .h-logoName{
    font-size: 14px;
    color:#fff;
    font-weight: 600;
    margin-top: 3px;
    margin-left: 8px;
}
.userInfo-box{
    float:right;
}
.userInfo-box li{
    height: 48px;
    line-height: 48px;
    float:left;
    color: rgb(255, 255, 255);
    border-bottom-color: transparent;
    background-color: rgb(57, 66, 99);
    font-size: 14px;
    cursor: pointer;
    box-sizing: border-box;
    -webkit-transition: border-color .3s,background-color .3s,color .3s;
    transition: border-color .3s,background-color .3s,color .3s;
    white-space: nowrap;
    padding:0 10px;
}
.userInfo-box li:hover{
    background-color: rgb(46,53,69) !important;
    color: rgb(255, 255, 255); 
    border-bottom-color: transparent; 
    background-color: rgb(57, 66, 99);
}
.userInfo-box li i{
    margin-right: 5px;
    text-align: center;
    font-size: 18px;
    vertical-align: middle;
    color: #909399;
}

.userInfoPoP span{
  display: inline-block;
  min-width:80px;
  text-align: right;
}
</style>
<style>
.backColorPop{
  background-color:#394263 !important;
  color:#fff;
}
.backColorPop .popper__arrow::after{
    border-bottom-color: #394263 !important;
}

</style>