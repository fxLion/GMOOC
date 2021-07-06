<template>
  <div>
    <el-dialog
      title="分配任务"
      :visible.sync="visible"
      width="600px"
      :before-close="handleClose">
      <el-form ref="form" :model="form" label-width="100px" label-suffix="：" >
        <el-form-item :label="taskName">
          <el-select v-model="form.selected" multiple style="width: 100%;">
            <el-option
              v-for="(item,index) in memberList"
              :key="index"
              :label="item.nickName"
              :value="item.userId">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="handleConfirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import util from '../../../util/util'
import constants from '../../../util/constants'
export default {
  name: 'sendMissionDialog',
  props: ['pvisible', 'pTaskId', 'pTaskName', 'pTaskReceiver'],
  components: {},
  created () {},
  watch: {
    pvisible (newVal) {
      this.visible = newVal
      if (newVal) {
        this.taskId = this.pTaskId
        this.taskName = this.pTaskName
        this.selected = this.pTaskReceiver
        this.getMemberList()
      }
      this.$nextTick(function () {
        this.$refs.form.resetFields()
      })
    }
  },
  computed: {
    groupId () {
      return this.$store.getters.getValue('group_id')
    }
  },
  data () {
    return {
      visible: this.pvisible,
      taskId: this.pTaskId,
      taskName: this.pTaskName,
      selected: [],
      form: {
        selected: []
      },
      memberList: []
    }
  },
  methods: {
    getMemberList () {
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
            if (self.selected !== []) {
              self.selected.forEach((v, i, array) => {
                data.forEach((vv, ii, arrays) => {
                  if (v === vv.nickName) {
                    self.form.selected.push(vv.userId)
                    return false
                  }
                })
              })
            }
          } else {
            self.$message.error(result.message)
          }
        }
      })
    },
    handleClose () {
      this.form.selected = []
      this.$emit('sendMissionDialogCloseEvent')
    },
    handleConfirm () {
      let self = this
      util.myAjax({
        url: '/group/allotTask',
        data: {
          params: {
            userId: self.form.selected,
            taskId: self.taskId,
            groupId: self.groupId
          }
        },
        success: function (result) {
          if (result.statusCode === constants.SUCCESS_CODE) {
            let data = result.data
            self.memberList = data
            self.form.selected = []
            self.$emit('sendMissionDialogConfirmEvent')
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
  >>>.el-dialog__body {
    padding-bottom: 0;
  }
</style>
