<template>
  <div>
    <el-dialog
      title="修改密碼" :visible.sync="visible" width="30%" :close-on-click-modal="false" :before-close="handleClose">
      <el-form ref="form" :model="form" :rules="rules" label-width="100px" label-suffix="：" status-icon>
        <el-form-item label="旧密码" prop="oldPassword">
          <el-input type="password" v-model="form.oldPassword" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input type="password" v-model="form.newPassword" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPassword">
          <el-input type="password" v-model="form.checkPassword" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱" prop="userEmail">
          <div style="display: flex;justify-content: flex-start">
            <el-input v-model="form.userEmail" autocomplete="off"></el-input>
            <el-button type="primary" @click="handleGetVerifyCode">获取验证码</el-button>
          </div>
        </el-form-item>
        <el-form-item label="验证码" prop="verifyCode">
          <el-input v-model="form.verifyCode" autocomplete="off"></el-input>
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
  name: 'changePasswordDialog',
  props: ['pvisible'],
  components: {},
  mounted () {
  },
  watch: {
    pvisible (newVal) {
      this.visible = newVal
      this.$nextTick(function () {
        this.$refs.form.resetFields()
      })
    }
  },
  computed: {
    userName () {
      return this.$store.getters.getValue('user_info').realName
    }
  },
  data () {
    let validateCheckPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入确认密码'))
      } else if (value !== this.form.newPassword) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    let validateCheckOldPasswordAndNewPassword = (rule, value, callback) => {
      if (value === this.form.oldPassword) {
        callback(new Error('请输入与旧密码不相同的密码!'))
      } else {
        callback()
      }
    }
    return {
      visible: this.pvisible,
      form: {
        oldPassword: '',
        newPassword: '',
        checkPassword: '',
        userName: '',
        userEmail: '',
        codeType: '',
        verifyCode: ''
      },
      rules: {
        verifyCode: [
          {required: true, message: '请输入验证码', trigger: 'blur'}
        ],
        userEmail: [
          {required: true, message: '请输入邮箱', trigger: 'blur'},
          {validator: util.validateEmail, trigger: 'blur'}
        ],
        oldPassword: [
          {required: true, message: '请输入旧密码', trigger: 'blur'}
        ],
        newPassword: [
          {required: true, message: '请输入新密码', trigger: 'blur'},
          { validator: validateCheckOldPasswordAndNewPassword, trigger: 'blur' },
          { validator: util.validatePassword, trigger: 'blur' }
        ],
        checkPassword: [
          {required: true, message: '请输入确认密码', trigger: 'blur'},
          { validator: validateCheckPass, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleClose () {
      this.$emit('changePasswordDialogCloseEvent')
    },
    handleConfirm () {
      let self = this
      this.$refs.form.validate((valid) => {
        if (valid) {
          util.myAjax({
            url: '/update/pwd',
            data: {
              userName: self.userName,
              verifyCode: self.form.verifyCode,
              codeType: 1,
              passWord: self.form.password,
              userEmail: self.form.userEmail
            },
            success: function (result) {
              if (result.statusCode === constants.SUCCESS_CODE) {
                self.$message.success('修改成功！')
                self.$emit('changePasswordDialogConfirmEvent')
              } else {
                self.$message.error(result.message)
              }
            }
          })
        }
      })
    },
    handleGetVerifyCode () {
      let self = this
      if (this.form.userEmail !== '') {
        util.myAjax({
          url: '/common/emailVerify',
          data: {
            email: self.form.userEmail,
            emailType: 1
          },
          success: function (result) {
            if (result.statusCode === constants.SUCCESS_CODE) {
              self.$message.success('已发送至邮箱，请注意查看！')
            } else {
              self.$message.error(result.message)
            }
          }
        })
      } else {
        this.$message.error('请填写邮箱')
      }
    }
  }
}
</script>

<style scoped>

</style>
