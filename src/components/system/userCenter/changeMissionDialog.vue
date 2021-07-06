<template>
  <div>
    <el-dialog
      title="修改任务"
      :visible.sync="visible"
      width="700px"
      :close-on-click-modal="false"
      :before-close="handleClose">
      <el-form ref="form" :model="form" :rules="rules" label-width="100px" label-suffix="：" status-icon>
        <el-form-item label="任务名称" prop="missionName">
          <el-input v-model="form.missionName" placeholder="请输入任务名"></el-input>
        </el-form-item>
        <el-form-item label="任务详细" prop="missionInfo">
          <el-input v-model="form.missionInfo" :autosize="{ minRows: 3, maxRows: 7}" type="textarea" placeholder="请输入任务详细"></el-input>
        </el-form-item>
        <el-form-item label="任务状态" prop="missionLevel">
          <el-select v-model="form.missionLevel" placeholder="请选择类型">
            <el-option label="普通" :value="1"></el-option>
            <el-option label="紧急" :value="2"></el-option>
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
  name: 'changeMissionDialog',
  props: ['pvisible', 'pTaskId', 'pTaskName', 'pTaskLevel', 'pTaskContent'],
  components: {},
  mounted () {
  },
  watch: {
    pvisible (newVal) {
      this.visible = newVal
      if (newVal) {
        this.taskId = this.pTaskId
        this.form = {}
        this.form.missionInfo = this.pTaskContent
        this.form.missionLevel = this.pTaskLevel
        this.form.missionName = this.pTaskName
      }
      this.$nextTick(function () {
        this.$refs.form.resetFields()
      })
    }
  },
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
      visible: this.pvisible,
      taskId: this.pTaskId,
      form: {
        missionName: '',
        missionInfo: '',
        missionLevel: ''
      },
      rules: {
        missionName: [
          {required: true, message: '请输入任务名！', trigger: 'blur'}
        ],
        missionInfo: [
          {required: true, message: '请输入任务详细信息！', trigger: 'blur'}
        ],
        missionLevel: [
          {required: true, message: '请选择任务状态！', trigger: 'change'}
        ]
      }
    }
  },
  methods: {
    getData () {},
    handleClose () {
      this.$emit('changeMissionDialogCloseEvent')
    },
    handleConfirm () {
      let self = this
      this.$refs.form.validate((valid) => {
        if (valid) {
          util.myAjax({
            url: '/group/updateTask',
            data: {
              params: {
                name: self.form.missionName,
                content: self.form.missionInfo,
                level: self.form.missionLevel,
                taskId: self.taskId
              }
            },
            success: function (result) {
              if (result.statusCode === constants.SUCCESS_CODE) {
                self.$message.success('修改任务成功！')
                self.$emit('changeMissionDialogConfirmEvent')
              } else {
                self.$message.error(result.message)
              }
            }
          })
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
