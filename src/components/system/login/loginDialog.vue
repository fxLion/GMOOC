<template>
  <div>
    <el-dialog :visible.sync="visible" width="600px" :before-close="handleClose"
               :close-on-click-modal="false">
        <el-tabs v-model="activeName" @tab-click="handleChangeTab">
          <el-tab-pane label="登录" name="login">
            <div style="width: 85%;margin: 0 auto;">
              <el-form ref="loginForm" :rules="loginRules" :model="loginForm" status-icon label-suffix="：">
                <el-form-item label="用户名" prop="userName">
                  <el-input v-model="loginForm.userName" placeholder="用户名/邮箱"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                  <el-input v-model="loginForm.password" type="password" placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item style="padding-top: 20px;">
                  <el-button type="primary" @click="handleLogin" style="width: 100%;">登录</el-button>
                </el-form-item>
              </el-form>
            </div>
          </el-tab-pane>
          <el-tab-pane label="注册账号" name="signUp">
            <el-form ref="signUpForm" :rules="signUpRules" :model="signUpForm" status-icon label-suffix="：" label-width="100px">
              <el-form-item label="用户名" prop="userName">
                <el-input v-model="signUpForm.userName" placeholder="请输入用户名/邮箱"></el-input>
              </el-form-item>
              <el-form-item label="真实姓名" prop="nickName">
                <el-input v-model="signUpForm.nickName" placeholder="请输入真实姓名"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input v-model="signUpForm.password" type="password" placeholder="请输入密码"></el-input>
              </el-form-item>
              <el-form-item label="确认密码" prop="checkPassword">
                <el-input v-model="signUpForm.checkPassword" type="password" placeholder="请再次输入密码"></el-input>
              </el-form-item>
              <el-row>
               <el-col :span="12">
                 <el-form-item label="邮箱" prop="email">
                   <el-input v-model="signUpForm.email" placeholder="请填写邮箱"></el-input>
                 </el-form-item>
               </el-col>
               <el-col :span="12">
                 <el-form-item label="性别" prop="sex">
                   <el-select v-model="signUpForm.sex" placeholder="请选择性别">
                     <el-option
                       v-for="item in optionsList"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
                     </el-option>
                   </el-select>
                 </el-form-item>
               </el-col>
              </el-row>
              <el-form-item label="所在学校" prop="school">
                <el-input v-model="signUpForm.school" type="text" placeholder="请填写学校名称"></el-input>
              </el-form-item>
              <el-form-item label="个人简介" prop="introduction">
                <el-input v-model="signUpForm.introduction" :autosize="{ minRows: 2, maxRows: 4}" type="textarea" placeholder="这个人很懒，什么也没填。"></el-input>
              </el-form-item>
              <div style="width: 60%; margin: 0 auto;">
                <el-form-item style="padding-top: 20px;" label-width="0">
                  <el-button type="primary" @click="handleSignUp" style="width: 100%;">注册</el-button>
                </el-form-item>
              </div>
            </el-form>
          </el-tab-pane>
        </el-tabs>
    </el-dialog>
  </div>
</template>

<script>
import util from './../../../util/util'
import constants from './../../../util/constants'
export default {
  name: 'loginDialog',
  props: ['pvisible'],
  components: {},
  mounted () {
  },
  watch: {
    'pvisible': function (newVal) {
      this.visible = newVal
      if (newVal) {
        this.$nextTick(function () {
          this.$refs.loginForm.resetFields()
          this.$refs.signUpForm.resetFields()
        })
      }
    },
    activeName (newVal, oldVal) {
      this.$refs[oldVal + 'Form'].resetFields()
    }
  },
  computed: {},
  data () {
    let validateCheckPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入确认密码'))
      } else if (value !== this.signUpForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        userName: '',
        password: ''
      },
      signUpForm: {
        userName: '',
        nickName: '',
        password: '',
        checkPassword: '',
        school: '',
        email: '',
        sex: '',
        introduction: ''
      },
      activeName: 'login',
      optionsList: [
        {
          value: '男',
          label: '男'
        },
        {
          value: '女',
          label: '女'
        }
      ],
      loginRules: {
        userName: [
          {required: true, message: '请输入用户名', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'}
        ]
      },
      signUpRules: {
        userName: [
          {required: true, message: '请输入用户名', trigger: 'blur'}
        ],
        nickName: [
          {required: true, message: '请输入用户名', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'}
        ],
        checkPassword: [
          {required: true, message: '请输入确认密码', trigger: 'blur'},
          { validator: validateCheckPass, trigger: 'blur' }
        ],
        email: [
          {required: true, message: '请输入邮箱', trigger: 'blur'},
          { validator: util.validateEmail, trigger: 'blur' }
        ],
        sex: [
          {required: true, message: '请选择性别', trigger: 'change'}
        ],
        school: [
          {min: 1, max: 10, message: '长度在1-10个字符', trigger: 'blur'}
        ],
        introduction: []
      },
      visible: this.pvisible
    }
  },
  methods: {
    handleLogin () {
      let self = this
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          util.myAjax({
            url: '/login',
            data: {
              userName: self.loginForm.userName,
              passWord: self.loginForm.password
            },
            success: function (result) {
              if (result.statusCode === constants.SUCCESS_CODE) {
                self.$store.commit({
                  type: 'setValue',
                  category: 'user_info',
                  user_info: {
                    realName: result.data,
                    userId: null
                  }
                })
                util.setCookie('token', result.token)
                self.$router.push({path: '/'})
                self.$message.success('登录成功！')
                self.$emit('loginDialogConfirmEvent')
              } else {
                self.$message.error(result.data)
              }
            }
          })
        }
      })
    },
    handleSignUp () {
      let self = this
      this.$refs.signUpForm.validate((valid) => {
        if (valid) {
          util.myAjax({
            url: '/register',
            data: {
              university: self.signUpForm.school,
              userName: self.signUpForm.userName,
              passWord: self.signUpForm.password,
              nickName: self.signUpForm.nickName,
              email: self.signUpForm.email,
              gender: self.signUpForm.sex
            },
            success: function (result) {
              if (result.statusCode === constants.SUCCESS_CODE) {
                self.$message.success('注册成功！')
                self.activeName = 'login'
                // self.$emit('loginDialogConfirmEvent')
              } else {
                self.$message.error(result.message)
              }
            }
          })
        }
      })
    },
    handleToSignUp () {
      this.activeName = 'signUp'
    },
    handleToLogin () {
      this.activeName = 'login'
    },
    handleChangeTab (tab, event) {
      this.activeName = tab.name
    },
    handleClose () {
      this.$emit('loginDialogCloseEvent')
    }
  }
}
</script>

<style scoped>
  >>>.el-dialog__header{
    padding: 0;
  }
  >>>.el-dialog__body{
    padding: 30px 20px 10px;
    color: #606266;
    font-size: 14px;
  }
</style>
