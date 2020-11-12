<template>
<div class="home" >
    <el-aside class="menu" style="    width: auto;" id="cbl">
    <!-- class="menu" style="width: 219px;" -->
      <sliderMenu></sliderMenu>
  </el-aside>
  <el-container   style="height:100%" class="main">
 <router-view></router-view>
  </el-container>
   <!-- <div class="menu">
        <sliderMenu></sliderMenu>
      </div>
    
      <div class="main">
       <router-view></router-view> 
      </div> -->
</div>
  
</template>
<script>
import sliderMenu from './Leftmanage/leftMuneManage.vue'
export default {
   name: '',
  components: {
    sliderMenu
  },
  data(){
    return{
           isCollapse: false
    }
  },
  methods:{
       radioChange(val){
      if(val){  
        setTimeout(()=>{
          let navDom = document.querySelector('.navMenu')
          let arrowArr = navDom.getElementsByClassName('el-submenu__icon-arrow');
          for(var i = 0; i < arrowArr.length; i++){
            navDom.getElementsByClassName('el-submenu__icon-arrow')[i].style.display = 'none'
          }
        },140)
      }
    }
  }
    
}
</script>
<style>
.home{
  width: 100%;
  height: 100%;
  margin: 0 auto;

}
.menu{
   /* // width:13%; */
    height: 100%;
    position: relative;
    float: left;
    background-color: aliceblue;
    border: 1px solid #e4e3e3;
}
.main{
      /* min-width: 86%; */
    height: 100%;
    position: relative;
    /* float: left; */

}
</style>


