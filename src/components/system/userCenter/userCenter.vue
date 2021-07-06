<template>
  <div class="content">
    <el-tabs type="border-card" tab-position="left" style="min-height: 609px;" v-model="activeName">
      <el-tab-pane name="userInfo">
        <span slot="label"><i class="el-icon-user"></i> 个人中心</span>
        <template>
          <div class="userTitle">
            <h3>个人中心</h3>
          </div>
          <div class="userInfo">
            <div class="userPic">
              <img src="../../../assets/userImage/man1.png" alt="">
              <!--<el-button type="text" style="width: 100%;margin: 0 auto;" @click="handleChangeImage">编辑头像</el-button>-->
            </div>
            <div class="userInfoList" v-loading="loading">
              <ul>
                <li>用户名：{{userInfo.userName}}</li>
                <li>平台昵称：{{userInfo.nickName}}</li>
                <li>邮箱：{{userInfo.email}}</li>
                <li>电话：{{userInfo.telephone}}</li>
                <li>性別：{{userInfo.gender}}</li>
                <li>方向：{{userInfo.userMainDirection}}</li>
                <li>分类：{{userInfo.userMainSort}}</li>
                <li>学校：{{userInfo.university}}</li>
              </ul>
              <div style="margin-top: 20px;text-align: center;">
                <el-button type="primary" icon="el-icon-edit" @click="handleChangeInfo">修改信息</el-button>
                <el-button type="danger" icon="el-icon-lock" @click="handleChangePassword">修改密碼</el-button>
                <el-button type="danger" icon="el-icon-close" @click="handleLoginOut">退出登录</el-button>
              </div>
            </div>
          </div>
        </template>
      </el-tab-pane>
      <el-tab-pane name="myProject">
        <span slot="label"><i class="el-icon-edit-outline"></i> 我的项目</span>
        <my-project></my-project>
      </el-tab-pane>
      <el-tab-pane name="myShare">
        <span slot="label"><i class="el-icon-star-off"></i> 我的分享</span>
        <my-share></my-share>
      </el-tab-pane>
      <el-tab-pane name="news">
        <span slot="label"><i class="el-icon-bell"></i> <el-badge :value="12">消息通知</el-badge></span>
        <message></message>
      </el-tab-pane>
    </el-tabs>
    <change-image-dialog
      :pvisible="changeImageDialogVisible"
      @changeImageDialogCloseEvent="handleChangeImageDialogClose"
      @changeImageDialogConfirmEvent="handleChangeImageDialogConfirm"
    ></change-image-dialog>
    <change-info-dialog
      :pvisible="changeInfoDialogVisible"
      @changeInfoDialogCloseEvent="handleChangeInfoDialogClose"
      @changeInfoDialogConfirmEvent="handleChangeInfoDialogConfirm"
    >
    </change-info-dialog>
    <change-password-dialog
      :pvisible="changePasswordVisible"
      @changePasswordDialogCloseEvent="handleChangePasswordDialogClose"
      @changePasswordDialogConfirmEvent="handleChangePasswordDialogConfirm"
    >
    </change-password-dialog>
  </div>
</template>

<script>
import util from './../../../util/util'
import constants from './../../../util/constants'
import changeImageDialog from './changeImageDialog'
import changeInfoDialog from './changeInfoDialog'
import changePasswordDialog from './changePasswordDialog'
import myProject from './myProject'
import myShare from './myShare'
import message from './message'
export default {
  name: 'userCenter',
  props: [],
  components: {changeImageDialog, changeInfoDialog, changePasswordDialog, myProject, myShare, message},
  mounted () {
  },
  created () {
    this.getUserInfo()
  },
  watch: {},
  computed: {
    userName: function () {
      return this.$store.getters.getValue('user_info').realName
    }
  },
  data () {
    return {
      activeName: 'userInfo',
      loading: false,
      userInfo: {},
      changeImageDialogVisible: false,
      changeInfoDialogVisible: false,
      changePasswordVisible: false
    }
  },
  methods: {
    getUserInfo () {
      let self = this
      self.loading = true
      util.myAjax({
        url: '/getInfo',
        data: {
          userName: self.userName
        },
        success: function (result) {
          if (result.statusCode === constants.SUCCESS_CODE) {
            let data = result.data
            self.userInfo = data
            self.loading = false
          } else {
            self.$message.error(result.message)
          }
        }
      })
    },
    handleChangeImage () {
      this.changeImageDialogVisible = true
    },
    handleChangeImageDialogClose () {
      this.changeImageDialogVisible = false
    },
    handleChangeImageDialogConfirm () {
      this.getUserInfo()
      this.changeImageDialogVisible = false
    },
    handleChangeInfo () {
      this.changeInfoDialogVisible = true
    },
    handleChangeInfoDialogClose () {
      this.changeInfoDialogVisible = false
    },
    handleChangeInfoDialogConfirm () {
      this.changeInfoDialogVisible = false
    },
    handleChangePassword () {
      this.changePasswordVisible = true
    },
    handleChangePasswordDialogClose () {
      this.changePasswordVisible = false
    },
    handleChangePasswordDialogConfirm () {
      this.changePasswordVisible = false
    },
    handleLoginOut () {
      let self = this
      util.myAjax({
        url: '/logout',
        method: 'get',
        data: {
          userId: this.userName
        },
        success: function (result) {
          if (result.statusCode === constants.SUCCESS_CODE) {
            self.$message.success('退出成功!')
            util.clearLoginData()
            self.$router.push({path: `/`})
          } else {
            self.$message.error(result.message)
          }
        }
      })
    }
  }
}
</script>

<style scoped>
 .content{
   margin: 8px 80px;
 }
 .userTitle{
   text-align: center;
   height: 69px;
   line-height: 69px;
   border-bottom: 1px solid rgba(0, 0, 0, 0.3) ;
 }
   >>>.el-tabs__content{
     padding: 0;
   }
  >>>.el-tabs__item{
    height: 60px;
    line-height: 60px;
    font-weight: bold;
  }
  .userInfo{
    display: flex;
    justify-content: flex-start;
  }
  .userPic img{
    display: block;
    margin-top: 40px;
    height: 200px;
    width: 200px;
    border-radius: 50%;
  }
  .userInfoList{
    padding: 20px;
    width: 100%;
  }
  .userInfoList ul li{
    list-style: none;
    height: 30px;
    line-height: 30px;
  }
</style>
