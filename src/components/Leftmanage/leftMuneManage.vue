<template>
  <div>
    <!-- <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
  <el-checkbox-button :label="false" size="small">展开</el--checkbox-button>
  <el--checkbox-button :label="true"  size="small">收起</el--checkbox-button>
</el-radio-group> -->
    <div style="text-align:right;background-color: aliceblue;border-bottom: 1px solid #ccd3d7;">
      <span style="float:left;width:74%;line-height: 30px;color: #439fff;" id="xtName">交运竞赛报名系统</span>
      <el-checkbox-button class="cblsssj" style="display:inline-block;width:25%; height:30px;" v-model="isCollapse"
        @change="radioChange" size=""><i class="el-icon-s-fold" style="font-size:24px;"></i></el-checkbox-button>
    </div>

    <el-menu :default-openeds="defaultOpeneds" :default-active="onRoutes" @select="handleSelect" collapse-transition
      @open="handleOpen" @close="handleClose" :collapse="isCollapse">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-user-solid"></i>
          <span>交运竞赛管理</span>
        </template>
        <el-menu-item index="pothunterPage">
          <router-link to="pothunterPage" target=""><i class="iconfont ql_iconbaoming"></i>
            报名清单</router-link>
        </el-menu-item>
        <el-menu-item index="teamPage">
          <router-link to="teamPage" target=""><i class=" iconfont ql_iconyundong"></i>
            项目清单</router-link>
        </el-menu-item>
        <el-menu-item index="eventManagePage">
          <router-link to="eventmanagePage" target=""><i class=" iconfont ql_iconsaishiguanli"></i>赛事管理</router-link>
        </el-menu-item>
        <el-menu-item index="competitionGroupsManagePage">
          <router-link to="competitionGroupsManagePage" target=""><i
              class="iconfont ql_iconcebianlan-xitongguanli"></i>赛事组别管理</router-link>
        </el-menu-item>
        <el-menu-item index="CostManagePage">
          <router-link to="CostManagePage" target=""><i class=" iconfont ql_iconfeiyongguanli"></i>报名费用管理</router-link>
        </el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="iconfont   ql_iconchuhangguihua"></i>
          <span>出行服务管理</span>
        </template>
        <el-menu-item index="pothunterCXPage">
          <router-link to="pothunterCXPage" target=""><i class="iconfont ql_iconbaoming"></i>
            出行报名清单</router-link>
        </el-menu-item>
        <el-menu-item index="ProjectList">
          <router-link to="ProjectList" target=""><i class="iconfont ql_iconyundong"></i>
            出行服务清单</router-link>
        </el-menu-item>
        <el-menu-item index="eventManageCXPage">
          <router-link to="eventmanageCXPage" target=""><i class=" iconfont ql_iconsaishiguanli"></i>出行服务管理
          </router-link>
        </el-menu-item>
        <el-menu-item index="competitionGroupsManageCXPage">
          <router-link to="competitionGroupsManageCXPage" target=""><i
              class="iconfont ql_iconcebianlan-xitongguanli"></i>服务类型管理</router-link>
        </el-menu-item>
        <el-menu-item index="CostManageCXPage">
          <router-link to="CostManageCXPage" target=""><i class="iconfont ql_iconfeiyongguanli"></i>出行费用管理</router-link>
        </el-menu-item>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="iconfont ql_iconxitongguanli4"></i>
          <span>系统管理</span>
        </template>
        <el-menu-item index="HomePageManagemenPage">
          <router-link to="HomePageManagemenPage" target=""><i class=" iconfont ql_icontupianguanli3 "></i>首页图片管理
          </router-link>
        </el-menu-item>
        <!-- <el-menu-item index="dictionaryPage">
          <router-link to="dictionaryPage" target=""><i class=" iconfont ql_iconxitongzidian1"></i>系统字典管理</router-link>
        </el-menu-item> -->
        <el-menu-item index="GameAttributeManagementPage">
          <router-link to="GameAttributeManagementPage" target=""><i class="iconfont ql_iconshuxing"></i>报名信息管理
          </router-link>
        </el-menu-item>
        <el-menu-item index="4">
          <span slot="title">
            <router-link to="/" target=""><i class="el-icon-setting"></i>退出</router-link>
          </span>
        </el-menu-item>
      </el-submenu>
    </el-menu>

  </div>
</template>

<script>
  import Cookies from 'js-cookie'
  export default {
    name: 'sliderMenu',
    data() {
      return {
        isCollapse: false,
        defaultOpeneds: ['1']

      }
    },
    mounted() {},
    computed: {
      onRoutes() {
        // this.defaultOpeneds=['1']
        // 当前激活菜单的 index
        let index = this.$route.path.replace('/', '')
        let title = this.$route.meta.title
        // 改变浏览器title
        document.title = title
        return index
      }
    },
    methods: {
      handleSelect(id, keyPat, {
        rhoute,
        $attrs
      }) {
        if (id == "/") {
          Cookies.remove('TokenKey')
        }
        if (keyPat[0] == '1') {
          this.defaultOpeneds = ['1']
        } else if (keyPat[0] == '2') {
          this.defaultOpeneds = ['2']
        } else if (keyPat[0] == '3') {
          this.defaultOpeneds = ['3']
        }
        // console.log(id);
        // console.log($attrs);

      },
      handleOpen(key, keyPath) {
        if (key == '1') {
          this.defaultOpeneds = ['1']
        } else if (key == '2') {
          this.defaultOpeneds = ['2']
        } else if (key == '3') {
          this.defaultOpeneds = ['3']
        }
        // alert("1")
        //  console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        // alert("2")
        // console.log(key, keyPath);
      },
      radioChange(val) {
        if (val) {
          setTimeout(() => {
            // let navDom = document.querySelector('.menu');
            let aside_width = document.querySelector('.menu').offsetWidth;
            document.querySelector('.cblsssj').style.width = '100%';
           document.querySelector('#xtName').style.display='none';
            document.querySelector('.cblsssj')
            document.querySelector('.cblsssj').querySelector('i').className = 'el-icon-s-unfold'
            // el-icon-s-unfold
            document.querySelector('.main').style.width = document.querySelector('body').offsetWidth - aside_width

            // let arrowArr = navDom.getElementsByClassName('el-submenu__icon-arrow');
            // for(var i = 0; i < arrowArr.length; i++){
            //   navDom.getElementsByClassName('el-submenu__icon-arrow')[i].style.display = 'none'
            // }
          }, 340)
        } else {
          document.querySelector('#xtName').style.display='block';
          document.querySelector('.cblsssj').querySelector('i').className = 'el-icon-s-fold'
          document.querySelector('.cblsssj').style.width = '25%';
        }

      }

    }
  }
</script>

<style lang="scss">
  // .cblsssj {
  .el-checkbox-button:last-child .el-checkbox-button__inner {
    width: 100%;
    height: 30px !important;
    // margin-top: -8px;
    background-color: aliceblue;
        color: black;
  }
.el-checkbox-button__inner [class*=el-icon-] {
    line-height: .19 !important;
}
.el-checkbox-button__inner {
    border: 0px solid #DCDFE6;
}
  // }
  /*改变router-link样式*/
  a {
    text-decoration: none;
    color: inherit;
  }

  .el-checkbox-button:last-child .el-checkbox-button__inner {
    width: 100%;
    height: 13px;
    padding-bottom: 15px;
  }

  .el-submenu .el-menu-item a {
    position: absolute;
    height: 100%;
    width: calc(100% - 50px);
    left: 0;
    padding-left: 50px;
  }

  .el-menu-item a {
    position: absolute;
    height: 100%;
    width: calc(100% - 60px);
    left: 0;
    padding-left: 60px;
  }

  .el-menu {
    border-right: solid 0px #e6e6e6;
    list-style: none;
    position: relative;
    margin: 0;
    padding-left: 0;
    background-color: aliceblue;
  }

  .el-menu ul li:hover {
    background-color: #e5e6e7;
    // color: #e6e6e6
  }
</style>