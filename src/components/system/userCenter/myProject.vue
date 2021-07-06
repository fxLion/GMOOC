<template>
  <div>
    <template v-if="showList">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="我参与的项目" name="first">
          <div style="display: flex;justify-content:flex-start;flex-wrap: wrap;">
            <div v-for="(item, index) in projectList" :key="index" style="display: inline-block;width: 30%;border: 1px solid #e4e7ed; padding: 10px;margin: 10px;" >
              <span class="projectTitle" @click="handleProjectDetail(item.groupId, item.jointId, item.jointName)">项目组名称：{{item.groupName}}</span>
              <p>项目名称：{{item.jointName}}</p>
              <p>当前人数：{{item.groupPersonNum}}</p>
              <p>项目组创建时间：{{item.createTime}}</p>
              <p>项目组当前的工作备注: {{item.groupDetailNow}}</p>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="我管理的项目" name="second">
          <div style="display: flex;justify-content:flex-start;flex-wrap: wrap;">
            <div v-for="(item, index) in projectList" :key="index" style="display: inline-block;width: 30%;border: 1px solid #e4e7ed; padding: 10px;margin: 10px;" >
              <span class="projectTitle" @click="handleProjectLeader(item.groupId, item.jointId, item.jointName)">项目组名称：{{item.groupName}}</span>
              <p>项目名称：{{item.jointName}}</p>
              <p>当前人数：{{item.groupPersonNum}}</p>
              <p>项目组创建时间：{{item.createTime}}</p>
              <p>项目组当前的工作备注: {{item.groupDetailNow}}</p>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </template>
    <template v-else-if="showDetail">
      <div v-loading="loading">
        <div style="display: flex; justify-content: flex-end;padding: 10px 20px 0 0;" >
          <el-button type="danger" size="small" @click="handleShowList">返回</el-button>
        </div>
        <div style="padding-left: 10px;">
          <p class="projectTitle" @click="handleToProject">项目名称：{{projectName}}</p>
        </div>
        <el-row>
          <el-col :span="12">
            <div style="width: 98%; margin: 10px auto;">
              <el-card>
                <div slot="header">
                  <span>当前项目组成员：</span>
                  <!--<el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>-->
                </div>
                <div style="height: 300px;overflow-y: auto;">
                  <div v-for="(item, index) in memberList" :key="index" style="height: 49px;line-height: 49px;">
                    {{item.sort}}-{{item.nickName}}
                  </div>
                </div>
              </el-card>
            </div>
          </el-col>
          <el-col :span="12">
            <div style="width: 98%; margin: 10px auto;">
              <el-card class="box-card">
                <div slot="header">
                  <span>我分配到的任务：</span>
                </div>
                <el-collapse style="overflow-y: auto;height: 300px;">
                  <template v-if="taskList.length > 0">
                    <template v-for="(item, index) in taskList">
                      <el-collapse-item :title="'任务名称：'+item.taskName" :key="index">
                        <div>任务内容：{{item.taskContent}}</div>
                        <div>任务状态：{{item.taskLevel}}</div>
                      </el-collapse-item>
                    </template>
                  </template>
                  <template>
                    <div style="line-height: 40px;height: 40px; text-align: center;font-size: 20px;">暂无任务</div>
                  </template>
                </el-collapse>
              </el-card>
            </div>
          </el-col>
        </el-row>
        <div style="padding: 10px;">
          <el-card class="box-card">
            <div slot="header">
              <span>项目进展情况：</span>
            </div>
            <el-collapse style="overflow-y: auto;height: 300px;">
              <template v-if="taskList.length > 0">
                <template v-for="(item, index) in taskList">
                  <el-collapse-item :title="'任务名：'+item.taskName" :key="index">
                    <div style="height: 40px; line-height: 40px;">任务内容：{{item.taskContent}}</div>
                    <div style="height: 40px; line-height: 40px;">
                      完成状态：{{item.finished === false ? '未完成': '已完成'}}
                      <template v-if="!item.finished">
                        <el-button type="text" @click="handleFinishedProject(item.taskId)">设置已完成任务</el-button>
                      </template>
                    </div>
                  </el-collapse-item>
                </template>
              </template>
              <template v-else>
                <div style="text-align: center; font-size: 20px;">暂无任务</div>
              </template>
            </el-collapse>
          </el-card>
        </div>
        <div style="padding: 10px;">
          <el-card class="box-card">
            <div slot="header">
              <span>项目留言板：</span>
              <el-button style="float: right; padding: 3px 0;color: #ffffff;" type="text" @click="handleAddMessage">添加留言</el-button>
            </div>
            <div>
              <div v-for="(item, index) in messageList" :key="index" style="height: 49px;line-height: 49px;">
                {{item.userNick}}：{{item.messgae}}<span style="float: right;">{{format(item.gmtCreate, 'yyyy-MM-dd HH:ss')}}</span>
              </div>
            </div>
          </el-card>
        </div>
      </div>
    </template>
    <template v-else>
      <div v-loading="loading">
        <div style="display: flex; justify-content: flex-end;padding: 10px 20px 0 0;">
          <el-button type="primary" size="small" @click="handleShowList">保存</el-button>
          <el-button type="danger" size="small" @click="handleShowList">返回</el-button>
        </div>
        <div style="padding-left: 10px;">
          <p class="projectTitle" @click="handleToProject">项目名称：{{projectName}}</p>
          <span>编号：123</span>
        </div>
        <el-row>
          <el-col :span="12">
            <div style="width: 98%; margin: 10px auto;">
              <el-card>
                <div slot="header">
                  <span>当前项目组成员：</span>
                  <el-button style="float: right;color: #ffffff; padding: 3px 0" type="text" @click="handleAddMember">审批人员</el-button>
                </div>
                <div style="height: 300px;overflow-y: auto;">
                  <div v-for="(item, index) in memberList" :key="index" style="height: 49px;line-height: 49px;">
                    {{item.sort}}-{{item.nickName}}<el-button type="text" @click="handleRemoveMember(item.userId)">移出分组</el-button>
                  </div>
                </div>
              </el-card>
            </div>
          </el-col>
          <el-col :span="12">
            <div style="width: 98%; margin: 10px auto;">
              <el-card class="box-card">
                <div slot="header">
                  <span>任务列表：</span>
                  <el-button style="float: right; padding: 3px 0; color: #ffffff;" type="text" @click="handleCreateMission">新增任务</el-button>
                  <!--<el-button style="float: right; padding: 3px 10px; color: #ffffff;" type="text" @click="handleSendMission">分配任务</el-button>-->
                </div>
                <el-collapse style="overflow-y: auto;height: 300px;">
                  <template v-if="taskList.length > 0">
                    <template v-for="(item, index) in taskList">
                      <el-collapse-item :title="'任务名：'+item.taskName" :key="index">
                        <div style="height: 40px; line-height: 40px;">任务内容：{{item.taskContent}}</div>
                        <div style="height: 40px; line-height: 40px;">
                          <el-row>
                            <el-col :span="8">
                              <span>任务创建者：{{item.taskCreater}}</span></el-col>
                            <el-col :span="8">
                              <span>任务状态：{{item.taskLevel === 1 ?  '普通' : '紧急'}}</span></el-col>
                            <el-col :span="8">
                              <template v-if="item.receiver.length === 0">
                                <span>分配状态：未分配</span>
                                <span><el-button type="text" @click="handleSendMission(item.taskId, item.taskName, item.receiver)">分配任务</el-button></span>
                              </template>
                              <template v-else>
                                <span>已分配:{{getReceiver(item.receiver)}}</span>
                                <span><el-button type="text" @click="handleSendMission(item.taskId, item.taskName, item.receiver)">修改分配</el-button></span>
                              </template></el-col>
                          </el-row>
                        </div>
                        <div>
                          <el-button type="text" @click="handleChangeMission(item.taskName, item.taskContent, item.taskLevel, item.taskId)">修改任务</el-button>
                          <el-button type="text" style="color: red;" @click="handleDeleteTask(item.taskId)" >删除任务</el-button>
                        </div>
                      </el-collapse-item>
                    </template>
                  </template>
                  <template v-else>
                    <div style="text-align: center; font-size: 20px;">暂无任务</div>
                  </template>
                </el-collapse>
              </el-card>
            </div>
          </el-col>
        </el-row>
        <div style="padding: 10px;">
          <el-card class="box-card">
            <div slot="header">
              <span>项目进展情况：</span>
            </div>
            <el-collapse style="overflow-y: auto;height: 300px;">
              <template v-for="(item, index) in taskList">
                <el-collapse-item :title="'任务名：'+item.taskName" :key="index">
                  <div style="height: 40px; line-height: 40px;">任务内容：{{item.taskContent}}</div>
                  <div style="height: 40px; line-height: 40px;">
                    完成状态：{{item.finished === false ? '未完成': '已完成'}}
                    <template v-if="!item.finished">
                      <el-button type="text" @click="handleFinishedProject(item.taskId)">设置已完成任务</el-button>
                    </template>
                  </div>
                </el-collapse-item>
              </template>
            </el-collapse>
          </el-card>
        </div>
        <div style="padding: 10px;">
          <el-card class="box-card">
            <div slot="header">
              <span>项目留言板：</span>
              <el-button style="float: right; padding: 3px 0;color: #ffffff;" type="text" @click="handleAddMessage">添加留言</el-button>
            </div>
            <!--傻逼后台把message打成messgae-->
            <div style="min-height: 40px;">
              <div v-for="(item, index) in messageList" :key="index" style="height: 49px;line-height: 49px;">
                {{item.userNick}}：{{item.messgae}}<span style="float: right;">{{format(item.gmtCreate, 'yyyy-MM-dd HH:ss')}}</span>
              </div>
            </div>
          </el-card>
        </div>
      </div>
    </template>
    <create-mission-dialog
      :pvisible="createMissionVisible"
      @createMissionDialogCloseEvent="handleCreateMissionDialogClose"
      @createMissionDialogConfirmEvent="handleCreateMissionDialogConfirm"
    ></create-mission-dialog>
    <add-member-dialog
      :pvisible="addMemberVisible"
      @addMemberDialogCloseEvent="handleAddmemberDialogClose"
      @addMemberDialogConfirmEvent="handleAddmemberDialogConfirm"
    ></add-member-dialog>
    <send-mission-dialog
      :pvisible="sendMissionVisible"
      :pTaskId="sendMissionTaskId"
      :pTaskName="sendMissionTaskName"
      :pTaskReceiver="sendMissionTaskReceiver"
      @sendMissionDialogCloseEvent="handleSendMissionDialogClose"
      @sendMissionDialogConfirmEvent="handleSendMissionDialogConfirm"
    ></send-mission-dialog>
    <change-mission-dialog
      :pvisible="changeMissionVisible"
      :pTaskId="missionInfo.id"
      :pTaskName="missionInfo.name"
      :pTaskContent="missionInfo.content"
      :pTaskLevel="missionInfo.level"
      @changeMissionDialogCloseEvent="handleChangeMissionDialogClose"
      @changeMissionDialogConfirmEvent="handleChangeMissionDialogConfirm"
    ></change-mission-dialog>
  </div>
</template>

<script>
import util from '../../../util/util'
import constants from '../../../util/constants'
import createMissionDialog from './createMissionDialog'
import sendMissionDialog from './sendMissionDialog'
import changeMissionDialog from './changeMissionDialog'
import addMemberDialog from './addMemberDialog'
export default {
  name: 'myProject',
  props: [],
  components: {createMissionDialog, sendMissionDialog, changeMissionDialog, addMemberDialog},
  mounted () {
    this.activeName = 'first'
    this.getData()
  },
  watch: {},
  computed: {
    userName () {
      return this.$store.getters.getValue('user_info').realName
    },
    groupId () {
      return this.$store.getters.getValue('group_id')
    }
  },
  data () {
    return {
      activeName: 'first',
      showList: true,
      showDetail: false,
      showLeader: false,
      createMissionVisible: false,
      sendMissionVisible: false,
      changeMissionVisible: false,
      addMemberVisible: false,
      sendMissionTaskId: '',
      sendMissionTaskName: '',
      sendMissionTaskReceiver: [],
      missionInfo: {
        id: '',
        name: '',
        content: '',
        level: null
      },
      // changeMissionTaskId: '',
      // changeMissionTaskName: '',
      // changeMissionTaskContent: '',
      // changeMissionTaskLevel: '',
      projectName: '',
      projectList: [],
      taskList: [],
      missionList: [
        {
          missionName: '任务一',
          missionInfo: '这是任务介绍'
        },
        {
          missionName: '任务二',
          missionInfo: '这是任务介绍'
        },
        {
          missionName: '任务三',
          missionInfo: '这是任务介绍'
        },
        {
          missionName: '任务四',
          missionInfo: '这是任务介绍'
        },
        {
          missionName: '任务五',
          missionInfo: '这是任务介绍'
        },
        {
          missionName: '任务六',
          missionInfo: '这是任务介绍'
        }
      ],
      projectData: [
        {
          projectName: '项目名称。。',
          projectId: '123',
          server: 'xxx.xxx.xxx.xxx',
          gitLab: 'xxx.xxx.xxx.xxx'
        },
        {
          projectName: '项目名称。。',
          projectId: '124',
          server: 'xxx.xxx.xxx.xxx',
          gitLab: 'xxx.xxx.xxx.xxx'
        },
        {
          projectName: '项目名称。。',
          projectId: '125',
          server: 'xxx.xxx.xxx.xxx',
          gitLab: 'xxx.xxx.xxx.xxx'
        },
        {
          projectName: '项目名称。。',
          projectId: '126',
          server: 'xxx.xxx.xxx.xxx',
          gitLab: 'xxx.xxx.xxx.xxx'
        },
        {
          projectName: '项目名称。。',
          projectId: '127',
          server: 'xxx.xxx.xxx.xxx',
          gitLab: 'xxx.xxx.xxx.xxx'
        },
        {
          projectName: '项目名称。。',
          projectId: '127',
          server: 'xxx.xxx.xxx.xxx',
          gitLab: 'xxx.xxx.xxx.xxx'
        },
        {
          projectName: '项目名称。。',
          projectId: '127',
          server: 'xxx.xxx.xxx.xxx',
          gitLab: 'xxx.xxx.xxx.xxx'
        },
        {
          projectName: '项目名称。。',
          projectId: '127',
          server: 'xxx.xxx.xxx.xxx',
          gitLab: 'xxx.xxx.xxx.xxx'
        },
        {
          projectName: '项目名称。。',
          projectId: '127',
          server: 'xxx.xxx.xxx.xxx',
          gitLab: 'xxx.xxx.xxx.xxx'
        },
        {
          projectName: '项目名称。。',
          projectId: '127',
          server: 'xxx.xxx.xxx.xxx',
          gitLab: 'xxx.xxx.xxx.xxx'
        },
        {
          projectName: '项目名称。。',
          projectId: '127',
          server: 'xxx.xxx.xxx.xxx',
          gitLab: 'xxx.xxx.xxx.xxx'
        },
        {
          projectName: '项目名称。。',
          projectId: '127',
          server: 'xxx.xxx.xxx.xxx',
          gitLab: 'xxx.xxx.xxx.xxx'
        },
        {
          projectName: '项目名称。。',
          projectId: '127',
          server: 'xxx.xxx.xxx.xxx',
          gitLab: 'xxx.xxx.xxx.xxx'
        },
        {
          projectName: '项目名称。。',
          projectId: '127',
          server: 'xxx.xxx.xxx.xxx',
          gitLab: 'xxx.xxx.xxx.xxx'
        },
        {
          projectName: '项目名称。。',
          projectId: '127',
          server: 'xxx.xxx.xxx.xxx',
          gitLab: 'xxx.xxx.xxx.xxx'
        },
        {
          projectName: '项目名称。。',
          projectId: '127',
          server: 'xxx.xxx.xxx.xxx',
          gitLab: 'xxx.xxx.xxx.xxx'
        },
        {
          projectName: '项目名称。。',
          projectId: '127',
          server: 'xxx.xxx.xxx.xxx',
          gitLab: 'xxx.xxx.xxx.xxx'
        }
      ],
      memberList: [],
      messageList: [],
      loading: false
    }
  },
  methods: {
    getData () {
      let self = this
      this.loading = true
      if (this.activeName === 'first') {
        util.myAjax({
          url: '/group/jointList',
          data: {
            params: {
              userName: this.userName
            }
          },
          success: function (result) {
            if (result.statusCode === constants.SUCCESS_CODE) {
              let data = result.data
              self.projectList = data
              self.loading = false
            } else {
              self.$message.error(result.message)
            }
          }
        })
      } else {
        util.myAjax({
          url: '/group/manageList',
          data: {
            params: {
              userName: this.userName
            }
          },
          success: function (result) {
            if (result.statusCode === constants.SUCCESS_CODE) {
              let data = result.data
              self.projectList = data
              self.loading = false
            } else {
              self.$message.error(result.message)
            }
          }
        })
      }
    },
    getMember () {
      let self = this
      util.myAjax({
        url: '/group/member',
        data: {
          params: {
            groupId: this.groupId
          }
        },
        success: function (result) {
          if (result.statusCode === constants.SUCCESS_CODE) {
            let data = result.data
            self.memberList = data
          } else {
            self.$message.error(result.message)
          }
        }
      })
    },
    getMessageBoard () {
      let self = this
      util.myAjax({
        url: '/group/getMessageBoard',
        data: {
          params: {
            groupId: this.groupId
          }
        },
        success: function (result) {
          if (result.statusCode === constants.SUCCESS_CODE) {
            let data = result.data
            self.messageList = data
          } else {
            self.$message.error(result.message)
          }
        }
      })
    },
    getTaskList (type) {
      let self = this
      if (type === 0) {
        util.myAjax({
          url: '/group/creatorTaskList',
          data: {
            params: {
              groupId: self.groupId,
              userName: self.userName
            }
          },
          success: function (result) {
            if (result.statusCode === constants.SUCCESS_CODE) {
              let data = result.data
              self.taskList = data
            } else {
              self.$message.error(result.message)
            }
          }
        })
      } else {
        util.myAjax({
          url: '/group/ownTask',
          data: {
            params: {
              groupId: self.groupId,
              userName: self.userName
            }
          },
          success: function (result) {
            if (result.statusCode === constants.SUCCESS_CODE) {
              let data = result.data
              self.taskList = data
            } else {
              self.$message.error(result.message)
            }
          }
        })
      }
    },
    getReceiver (array) {
      let string = ''
      for (let i = 0; i < array.length; i++) {
        if (i !== array.length - 1) {
          string += array[i] + ','
        } else {
          string += array[i]
        }
      }
      return string
    },
    handleClick (tab, event) {
      this.activeName = tab.name
      this.getData()
    },
    handleProjectDetail (groupId, jointId, jointName) {
      this.$store.commit({
        type: 'setValue',
        category: 'group_id',
        group_id: groupId
      })
      this.$store.commit({
        type: 'setValue',
        category: 'project_id',
        project_id: jointId
      })
      this.projectName = jointName
      this.getMember()
      this.getMessageBoard()
      this.getTaskList(1)
      this.showList = false
      this.showDetail = true
      // this.$router.push({path: ''})
    },
    handleProjectLeader (groupId, jointId, jointName) {
      this.$store.commit({
        type: 'setValue',
        category: 'group_id',
        group_id: groupId
      })
      this.$store.commit({
        type: 'setValue',
        category: 'project_id',
        project_id: jointId
      })
      this.projectName = jointName
      this.getMember()
      this.getMessageBoard()
      this.getTaskList(0)
      this.showList = false
      this.showLeader = true
      // this.$router.push({path: ''})
    },
    handleShowList () {
      this.showList = true
      this.showDetail = false
      this.showLeader = false
    },
    handleSave () {
      let self = this
      this.$confirm('此操作将保存信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        self.handleShowList()
      }).catch(() => {})
    },
    handleToProject () {
      this.$router.push({path: '/business/coDeveloped/projectDetail'})
    },
    handleAddMessage () {
      let self = this
      this.$prompt('请输入留言', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^.{1,100}$/,
        inputErrorMessage: '请输入1-100个字！'
      }).then(({ value }) => {
        util.myAjax({
          url: '/group/writeMessageBoard',
          data: {
            params: {
              userName: self.userName,
              groupId: self.groupId,
              message: value
            }
          },
          success: function (result) {
            if (result.statusCode === constants.SUCCESS_CODE) {
              self.$message.success('留言成功')
              self.getMessageBoard()
            } else {
              self.$message.error(result.message)
            }
          }
        })
      }).catch(() => {})
    },
    handleCreateMission () {
      this.createMissionVisible = true
    },
    handleCreateMissionDialogClose () {
      this.createMissionVisible = false
    },
    handleCreateMissionDialogConfirm () {
      this.getTaskList(0)
      this.createMissionVisible = false
    },
    handleChangeMission (name, content, level, id) {
      this.missionInfo.id = id
      this.missionInfo.name = name
      this.missionInfo.content = content
      this.missionInfo.level = level
      this.changeMissionVisible = true
    },
    handleChangeMissionDialogClose () {
      this.changeMissionVisible = false
    },
    handleChangeMissionDialogConfirm () {
      this.getTaskList(0)
      this.changeMissionVisible = false
    },
    handleSendMission (taskId, taskName, receiver) {
      this.sendMissionTaskId = taskId
      this.sendMissionTaskName = taskName
      this.sendMissionTaskReceiver = receiver
      this.sendMissionVisible = true
    },
    handleSendMissionDialogClose () {
      this.sendMissionVisible = false
    },
    handleSendMissionDialogConfirm () {
      this.getTaskList(0)
      this.sendMissionVisible = false
    },
    handleFinishedProject (id) {
      let self = this
      util.myAjax({
        url: '/group/finishTask',
        data: {
          params: {
            taskId: id
          }
        },
        success: function (result) {
          if (result.statusCode === constants.SUCCESS_CODE) {
            self.$message.success('已完成该项目！')
            self.getTaskList(0)
          } else {
            self.$message.error(result.message)
          }
        }
      })
    },
    handleDeleteTask (id) {
      let self = this
      this.$confirm('是否删除本任务？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        util.myAjax({
          url: '/group/deleteTask',
          data: {
            params: {
              taskId: id
            }
          },
          success: function (result) {
            if (result.statusCode === constants.SUCCESS_CODE) {
              self.$message.success('成功删除任务！')
              self.getTaskList(0)
            } else {
              self.$message.error(result.message)
            }
          }
        })
      }).catch(() => {})
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
    },
    handleRemoveMember (id) {
      let self = this
      util.myAjax({
        url: '/group/removeMemberPass',
        data: {
          params: {
            userId: id,
            groupId: self.groupId
          }
        },
        success: function (result) {
          if (result.statusCode === constants.SUCCESS_CODE) {
            self.$message.success('成功删除人员！')
            self.getMember()
          } else {
            self.$message.error(result.message)
          }
        }
      })
    },
    handleAddMember () {
      this.addMemberVisible = true
    },
    handleAddmemberDialogClose () {
      this.addMemberVisible = false
    },
    handleAddmemberDialogConfirm () {
      this.getMember()
      this.addMemberVisible = false
    }
  }
}
</script>

<style scoped>
  >>>.el-tabs__item{
   height: 40px;
   line-height: 40px;
  }
  >>>.el-tabs__content{
    padding-left: 0;
  }
  .projectTitle{
    font-size: 16px;
    font-weight: bold;
  }
  .projectTitle:hover{
    color: #409eff;
    cursor: pointer;
  }
  ul li {
    list-style: none;
  }
  >>>.el-card__header{
    background-color: #12b7f5;
    color: #ffffff;
    font-size: 16px;
    padding: 10px 10px;
    border-radius: 5px 5px 0 0;;
  }
  >>>.el-card__body{
    padding: 0 10px;
  }
  >>>.el-collapse-item__content{
    padding-bottom: 0;
  }
</style>
