<template>
  <div>
    <el-dialog
      title="问题反馈"
      :visible.sync="visible"
      width="700px"
      :close-on-click-modal="false"
      :before-close="handleClose">
      <div>
        <el-form ref="form" :rules="rules" :model="form" label-width="100px" label-suffix=":" status-icon>
          <el-form-item label="问题类型" prop="type">
            <el-select v-model="form.type" placeholder="请选择问题类型">
              <el-option
                v-for="item in typeList"
                :key="item.id"
                :label="item.type"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="联系邮箱" prop="email">
            <el-input v-model="form.email" placeholder="请输入联系邮箱"></el-input>
          </el-form-item>
          <el-form-item label="问题细节" prop="problemDetail">
            <el-input v-model="form.problemDetail" type="textarea" :autosize="{ minRows: 3, maxRows: 5}" placeholder="请输入问题详细"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="handleConfirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import util from './../../../util/util'
import constants from './../../../util/constants'
export default {
  name: 'problemDialog',
  props: ['pvisible'],
  components: {},
  mounted () {
  },
  watch: {
    pvisible (newVal) {
      this.visible = newVal
      if (newVal) {
        this.$nextTick(function () {
          this.$refs.form.resetFields()
        })
        this.getProblemType()
      }
    }
  },
  computed: {},
  data () {
    return {
      visible: this.visible,
      form: {
        type: '',
        problemDetail: '',
        email: ''
      },
      typeList: [],
      rules: {
        type: [
          {required: true, message: '请选择问题类型', trigger: 'change'}
        ],
        problemDetail: [
          {required: true, message: '请输入姓名', trigger: 'blur'}
        ],
        email: [
          {required: true, message: '请输入邮箱', trigger: 'blur'},
          { validator: util.validateEmail, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    getProblemType () {
      let self = this
      util.myAjax({
        url: '/feedback/getType',
        method: 'get',
        data: {},
        success: function (result) {
          if (result.statusCode === constants.SUCCESS_CODE) {
            let data = result.data
            self.typeList = data
          } else {
            self.$message.error(result.message)
          }
        }
      })
    },
    handleClose () {
      this.$emit('problemDialogCloseEvent')
    },
    handleConfirm () {
      let self = this
      this.$refs.form.validate((valid) => {
        if (valid) {
          util.myAjax({
            url: '/feedback/submit',
            data: {
              typeId: self.form.type,
              email: self.form.email,
              content: self.form.problemDetail
            },
            success: function (result) {
              if (result.statusCode === constants.SUCCESS_CODE) {
                self.$message.success('提交成功！')
              } else {
                self.$message.error(result.message)
              }
            }
          })
          self.$emit('problemDialogConfirmEvent')
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
