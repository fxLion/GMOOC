<template>
  <div>
    <div>
      <el-row style="display: flex;justify-content: center; background-color: #ffffff;">
       <el-col :span="12"><img src="../../assets/UspLogo.png" alt="" style="height: 100px;"></el-col>
       <el-col :span="12">
         <div style="display:flex; align-items: center; justify-content: center; height: 100px;">
           <el-select v-model="searchType" placeholder="请选择" style="width: 120px">
             <el-option
               v-for="item in options"
               :key="item.value"
               :label="item.label"
               :value="item.value">
             </el-option>
           </el-select>
           <el-input v-model="search" placeholder="请输入搜索关键字" style="width: 250px;"
             clearable @clear="handleReset" @keyup.enter.native="handleSearch" prefix-icon="el-icon-search"></el-input>
         </div>
       </el-col>
      </el-row>
    </div>
    <div>
      <el-menu
        :default-active="activeIndex"
        style="height: 60px;padding-left: 20px;"
        mode="horizontal"
        @select="handleSelect"
        background-color="#409eff"
        text-color="#000000"
        active-text-color="#ffffff">
        <el-menu-item index="/">首页</el-menu-item>
        <!--<el-menu-item index="/business/sharePlatform">分享平台</el-menu-item>-->
        <el-menu-item index="/business/coDeveloped">共同开发</el-menu-item>
        <el-menu-item index="/business/help">问题解决</el-menu-item>
        <template v-if="token !== ''">
          <el-menu-item index="/business/userCenter">个人中心</el-menu-item>
        </template>
        <template v-else>
          <el-menu-item index="" @click.native="handleOpenLoginDialog">登录/注册</el-menu-item>
        </template>
      </el-menu>
    </div>
    <login-dialog
      :pvisible="loginDialogVisible"
      @loginDialogCloseEvent="handleLoginDialogClose"
      @loginDialogConfirmEvent="handleLoginDialogConfirm"
    ></login-dialog>
  </div>
</template>

<script>
import loginDialog from '../system/login/loginDialog'
import util from './../../util/util'
export default {
  name: 'myheader',
  props: [],
  components: {loginDialog},
  mounted () {
    if (this.$route.path.split('/').length <= 2) {
      if (this.$route.path === '/business') {
        this.activeIndex = '/'
      } else {
        this.activeIndex = this.$route.path
      }
    } else {
      // console.log('/' + val.path.split('/')[1] + '/' + val.path.split('/')[2])
      this.activeIndex = '/' + this.$route.path.split('/')[1] + '/' + this.$route.path.split('/')[2]
    }
  },
  watch: {
    // $route: function (val, oldVal) {
    //   if (this.$route.path.split('/').length <= 2) {
    //     this.activeIndex = this.$route.path
    //   } else {
    //     console.log('/' + val.path.split('/')[1] + '/' + val.path.split('/')[2])
    //     this.activeIndex = '/' + this.$route.path.split('/')[1] + '/' + this.$route.path.split('/')[2]
    //   }
    // }
  },
  computed: {},
  data () {
    return {
      activeIndex: '/',
      searchType: '',
      search: '',
      token: util.getCookie('token'),
      options: [
        {
          value: 'test1',
          label: 'test1'
        },
        {
          value: 'test2',
          label: 'test2'
        }
      ],
      loginDialogVisible: false
    }
  },
  methods: {
    handleSelect: function (key, keyPath) {
      this.$router.push(key)
    },
    handleSearch: function () {
      console.log(this.search)
    },
    handleReset: function () {
      this.search = ''
    },
    handleOpenLoginDialog: function () {
      this.loginDialogVisible = true
    },
    handleLoginDialogClose: function () {
      this.loginDialogVisible = false
    },
    handleLoginDialogConfirm: function () {
      this.loginDialogVisible = false
    }
  }
}
</script>

<style scoped>
  >>>.el-menu-item{
    font-size: 16px;
    margin-right: 20px;
  }
</style>
