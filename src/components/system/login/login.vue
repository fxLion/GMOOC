<template>
  <div>
    <div style="padding: 30px;">
      <el-tabs tab-position="left" :style="tabStyle" v-model="activeName" @tab-click="handleChangeTab">
        <el-tab-pane label="用户登录" name="login">
          <div style="width: 400px; margin: 0 auto;">
            <el-form ref="loginForm" :rules="loginRules" :model="loginForm" status-icon label-suffix="：" label-width="100px;">
              <el-form-item label="用户名" prop="userName">
                <el-input v-model="loginForm.userName" placeholder="用户名/邮箱"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input v-model="loginForm.password" type="password" placeholder="请输入密码"></el-input>
              </el-form-item>
              <el-form-item style="padding-top: 20px;">
                <el-button type="primary" @click="handleLogin" style="width: 100%;">登录</el-button>
              </el-form-item>
              <el-form-item>
                <el-button type="text" @click="handleToSignUp" style="float: right;">注册账号</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>
        <el-tab-pane label="用户注册" name="signUp">
          <div style="width: 400px; margin: 0 auto;">
            <el-form ref="signUpForm" :rules="signUpRules" :model="signUpForm" status-icon label-suffix="：">
              <el-form-item label="用户名" prop="userName">
                <el-input v-model="signUpForm.userName" placeholder="用户名/邮箱"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input v-model="signUpForm.password" type="password" placeholder="请输入密码"></el-input>
              </el-form-item>
              <el-form-item label="确认密码" prop="password">
                <el-input v-model="signUpForm.password" type="password" placeholder="请输入密码"></el-input>
              </el-form-item>
              <el-form-item label="邮箱" prop="email">
                <el-input v-model="signUpForm.email" type="email" placeholder="请填写邮箱名称"></el-input>
              </el-form-item>
              <el-form-item label="手机号码" prop="phone">
                <el-input v-model="signUpForm.phone" type="phone" placeholder="请填写手机号码"></el-input>
              </el-form-item>
              <el-form-item label="所在学校" prop="school">
                <el-input v-model="signUpForm.school" type="text" placeholder="请填写学校名称"></el-input>
              </el-form-item>
              <el-form-item style="padding-top: 20px;">
                <el-button type="primary" @click="handleLogin" style="width: 100%;">注册</el-button>
              </el-form-item>
              <el-form-item>
                <el-button type="text" @click="handleToLogin" style="float: right;">马上登录</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  props: [],
  components: {},
  created () {
    let self = this
    let h = document.documentElement.clientHeight
    self.tabStyle.minHeight = (h - 150 - 160 - 60) + 'px'
    window.addEventListener('resize', function () {
      let h1 = document.documentElement.clientHeight
      self.tabStyle.minHeight = (h1 - 150 - 160 - 60) + 'px'
    })
  },
  watch: {
    activeName (newVal, oldVal) {
      this.$refs[oldVal + 'Form'].resetFields()
    }
  },
  computed: {},
  data () {
    return {
      tabStyle: {
        minHeight: 0
      },
      loginForm: {
        userName: '',
        password: ''
      },
      signUpForm: {
        userName: '',
        password: '',
        checkPassword: '',
        school: '',
        email: '',
        phone: ''
      },
      activeName: 'login',
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
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'}
        ],
        email: [
          {required: true, message: '请输入邮箱', trigger: 'blur'}
        ],
        phone: [
          {required: true, message: '请输入手机号码', trigger: 'blur'}
        ],
        school: [
          {min: 1, max: 10, message: '长度在1-10个字符', trigger: 'blur'}
        ]
      },
      tabHeight: 0
    }
  },
  methods: {
    handleLogin () {},
    handleSignUp () {},
    handleToSignUp () {
      this.activeName = 'signUp'
    },
    handleToLogin () {
      this.activeName = 'login'
    },
    handleChangeTab (tab, event) {
      this.activeName = tab.name
    }
  }
}
</script>

<style scoped>
</style>
