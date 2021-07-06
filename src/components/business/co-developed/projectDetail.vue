<template>
  <div>
    <div class="content">
      <el-row>
        <el-col :span="6">
          <el-row>
            <el-col :span="24">
              <div
                style="display: flex;justify-content: space-between; align-items: center;padding: 10px;background-color: #ffffff;">
                <div style="display: flex;align-items: center;">
                  <img src="../../../../static/images/logo.png" alt=""
                       style="width: 40px;height: 40px;border-radius: 50%;background-color: antiquewhite;">
                  <span>{{userInfo.nickName}}</span>
                </div>
                <el-button v-if="userInfo.userName !== userName" type="primary" size="small" @click="handleJoinProject">加入项目</el-button>
              </div>
            </el-col>
          </el-row>
          <!--<div style="margin-top: 3px;padding: 10px;background-color: #ffffff;">-->
            <!--<div class="userInfo">-->
              <!--<el-row>-->
                <!--<el-col :span="8">开发方向</el-col>-->
                <!--<el-col :span="8">用户等级</el-col>-->
                <!--<el-col :span="8">参与项目个数</el-col>-->
              <!--</el-row>-->
            <!--</div>-->
            <!--<div style="margin-top: 10px;text-align: center;font-weight: bold;">-->
              <!--<el-row>-->
                <!--<el-col :span="8">{{userInfo.direction}}</el-col>-->
                <!--<el-col :span="8">{{userInfo.level}}</el-col>-->
                <!--<el-col :span="8">{{userInfo.project_nums}}</el-col>-->
              <!--</el-row>-->
            <!--</div>-->
          <!--</div>-->
          <div style="margin-top: 3px;padding: 10px;background-color: #ffffff;">
            <div class="userInfo">
              <el-row>
                <el-col :span="8">开发方向</el-col>
                <el-col :span="8">用户所在大学</el-col>
                <el-col :span="8">已发布项目个数</el-col>
              </el-row>
            </div>
            <div style="margin-top: 10px;text-align: center;">
              <el-row>
                <el-col :span="8"><div style="height: 18px;line-height: 18px;">{{userInfo.direction}}</div></el-col>
                <el-col :span="8"><div style="height: 18px;line-height: 18px;">{{userInfo.university}}</div></el-col>
                <el-col :span="8"><div style="height: 18px;line-height: 18px;">{{userInfo.projectNums}}</div></el-col>
              </el-row>
            </div>
          </div>
        </el-col>
        <el-col :span="18">
          <div style="margin-left:10px;padding: 10px;background-color: #ffffff;">
            <div class="title">
              <h2>{{projectInfo.projectName}}</h2>
              <span>项目创建时间：{{format(projectInfo.projectGmtCreate, 'yyyy-MM-dd HH:ss')}}</span>
              <span>项目最后编辑时间：{{format(projectInfo.projectGmtModified, 'yyyy-MM-dd HH:ss')}}</span>
              <span>阅读数：{{clickNum}}</span>
              <template v-if="userInfo.userName === 'userName'"><el-button type="text" style="color: #f56c6c;padding: 0 10px;" @click="edit">编辑</el-button></template>
            </div>
            <div style="min-height: 400px;">
              {{projectContent}}
            </div>
            <div style="border-top: 1px solid #e0e0e0;">
              <el-row style="height:60px;display: flex; align-items: center;">
                <el-col :span="1" class="commentList">
                  <img src="../../../../static/images/logo.png" alt="">
                </el-col>
                <el-col :span="21" style="margin: 0 10px;">
                  <el-input v-model="form.comment" placeholder="请输入评论"></el-input>
                </el-col>
                <el-col :span="2">
                  <el-button type="primary">提&emsp;交</el-button>
                </el-col>
              </el-row>
            </div>
            <div v-for="(item, index) in commentList" :key="index">
              <template>
                <div class="commentList">
                  <img :src="item.picUrl" alt="">
                  <span>{{item.userName}}：</span>
                  <span style="display:inline-block;width: 100%;height: 100%">
                    {{item.comment}}<span v-if="show" class="respond">回复</span>
                  </span>
                </div>
              </template>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import util from './../../../util/util'
import constants from './../../../util/constants'
export default {
  name: 'projectDetail',
  props: [],
  components: {},
  created () {
    this.getData()
  },
  watch: {},
  computed: {
    projectId () {
      return this.$store.getters.getValue('project_id')
    },
    userName () {
      return this.$store.getters.getValue('user_info').realName
    }
  },
  data () {
    return {
      form: {
        comment: ''
      },
      userInfo: {},
      projectInfo: {
        projectName: '',
        projectContent: '',
        projectRepoUrl: '',
        projectSpeed: '',
        projectGmtCreate: '',
        projectGmtModified: '',
        projectDetail: ''
      },
      groupInfo: {
        groupPersonNum: '',
        groupName: '',
        groupAdmin: ''
      },
      title: '这是一个标题',
      time: '2019年1月1日 12:00:00',
      clickNum: '666',
      projectContent: '我希望项目能找到很好的前端和后台的人员。',
      commentList: [
        {
          'userName': '123',
          'picUrl': '../../../../static/images/logo.png',
          'comment': '我觉得这项目还行。'
        },
        {
          'userName': 'lvv',
          'picUrl': '../../../../static/images/logo.png',
          'comment': '厉害厉害了。'
        },
        {
          'userName': 'lvwangee',
          'picUrl': '../../../../static/images/logo.png',
          'comment': '看到这项目我觉得自己是蔡徐坤。。。'
        },
        {
          'userName': 'jone',
          'picUrl': '../../../../static/images/logo.png',
          'comment': '这打个卡先。'
        },
        {
          'userName': 'Mike',
          'picUrl': '../../../../static/images/logo.png',
          'comment': '牛逼牛逼'
        }
      ],
      show: true
    }
  },
  methods: {
    getData () {
      let self = this
      util.myAjax({
        url: '/joint/detail',
        data: {
          projectId: self.projectId
        },
        success: function (result) {
          if (result.statusCode === constants.SUCCESS_CODE) {
            let data = result.data
            self.userInfo = {
              nickName: data.userNickName,
              userName: data.userName,
              direction: data.userSortMain,
              university: data.userUniversity,
              projectNums: data.sendProjectNums
            }
            self.projectInfo = {
              projectName: data.projectName,
              projectContent: data.projectContent,
              projectRepoUrl: data.projectRepoUrl,
              projectSpeed: data.projectSpeed,
              projectGmtCreate: data.projectGmtCreate,
              projectGmtModified: data.projectGmtModified,
              projectDetail: data.projectDetail,
              sendProjectNums: data.sendProjectNums
            }
            self.groupInfo = {
              groupPersonNum: data.groupPersonNum,
              groupName: data.groupName,
              groupAdmin: data.groupAdmin
            }
          } else {
            self.$alert('这是一段内容', '标题名称', {
              confirmButtonText: '确定',
              callback: action => {
                self.$message.error(result.message)
                self.$router.push({path: '/business/coDeveloped'})
              }
            })
          }
        }
      })
    },
    edit () {
      this.$router.push({path: '/business/coDeveloped/editProject'})
    },
    handleJoinProject () {
      if (util.getCookie('rememberMe') === '' || util.getCookie('rememberMe') === 'undefined') {
        this.$message.error('需要登录才能申请加入项目！')
        return false
      }
      let self = this
      util.myAjax({
        url: '/joint/passJoint',
        data: {
          userName: self.userName,
          jointProjectId: self.projectId
        },
        success: function (result) {
          if (result.statusCode === constants.SUCCESS_CODE) {
            self.$message.success('已发送加入请求！')
          } else {
            self.$message.success(result.message)
          }
        }
      })
    },
    format (time, format) {
      let t = new Date(time)
      let tf = function (i) { return (i < 10 ? '0' : '') + i }
      return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function (a) {
        switch (a) {
          case 'yyyy':
            return tf(t.getFullYear())
            break
          case 'MM':
            return tf(t.getMonth() + 1)
            break
          case 'mm':
            return tf(t.getMinutes())
            break
          case 'dd':
            return tf(t.getDate())
            break
          case 'HH':
            return tf(t.getHours())
            break
          case 'ss':
            return tf(t.getSeconds())
            break
        }
      })
    }
  }
}
</script>

<style scoped>
  .content {
    margin: 20px 80px 0;
  }

  .userInfo {
    text-align: center;
    font-weight: bold;
  }

  .title {
    border-bottom: 1px dashed #e0e0e0;
    padding-bottom: 10px;
  }

  .title span {
    display: inline-block;
    font-size: 14px;
    color: #858585;
    padding-top: 10px;
  }

  .commentList {
    padding: 10px 0;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #e0e0e0;
  }

  .commentList img {
    display: inline-block;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background-color: antiquewhite;
    margin: 0 auto;
  }
  .respond {
    padding: 0 10px;
    color: #3399ea;
    font-size: 13px;
    cursor: pointer
  }
</style>
