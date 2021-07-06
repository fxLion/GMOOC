<template>
  <div>
    <el-dialog
      title="编辑个人信息" :visible.sync="visible" width="600px" :close-on-click-modal="false"
      :before-close="handleClose">
      <el-form ref="form" :model="form" :rules="rules" label-width="100px" label-suffix="：" status-icon>
        <el-form-item label="用户名">
          <el-input v-model="userName" disabled placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="平台昵称" prop="nickName">
          <el-input v-model="form.nickName" placeholder=""></el-input>
        </el-form-item>
        <el-row>
         <el-col :span="12">
           <el-form-item label="分类" prop="sortId">
             <el-select v-model="form.sortId" placeholder="placeholder">
               <el-option
                 v-for="item in sortList"
                 :key="item.value"
                 :label="item.label"
                 :value="item.value">
               </el-option>
             </el-select>
           </el-form-item>
         </el-col>
         <el-col :span="12">
           <el-form-item label="性别" prop="gender">
             <el-select v-model="form.gender" placeholder="placeholder">
               <el-option
                 v-for="item in sexList"
                 :key="item.value"
                 :label="item.label"
                 :value="item.value">
               </el-option>
             </el-select>
           </el-form-item>
         </el-col>
        </el-row>
        <el-form-item label="学校" prop="university">
          <el-input v-model="form.university" placeholder=""></el-input>
        </el-form-item>
        <!--<el-form-item label="个人简介">-->
          <!--<el-input type="textarea" :autosize="{ minRows: 3, maxRows: 5}" v-model="form.introduction" placeholder="这个人很懒，什么也没留下。"></el-input>-->
        <!--</el-form-item>-->
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="handleClose" >取 消</el-button>
        <el-button type="primary" @click="handleConfirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import util from '../../../util/util'
import constants from '../../../util/constants'
export default {
  name: 'changeInfoDialog',
  props: ['pvisible'],
  components: {},
  mounted () {
  },
  watch: {
    pvisible (newVal) {
      this.visible = newVal
      this.getData()
      this.$nextTick(function () {
        this.$refs.form.resetFields()
      })
    }
  },
  computed: {
    userName: function () {
      return this.$store.getters.getValue('user_info').realName
    }
  },
  data () {
    return {
      visible: this.pvisible,
      userInfo: {},
      form: {},
      sortList: [],
      sexList: [
        {
          value: 'Male',
          label: '男'
        },
        {
          value: 'Female',
          label: '女'
        }
      ],
      rules: {
        university: [
          {required: true, message: '学校名称', trigger: 'blur'}
        ],
        nickName: [
          {required: true, message: '请输入姓名', trigger: 'blur'}
        ],
        email: [
          {required: true, message: '请输入邮箱', trigger: 'blur'}
        ],
        gender: [
          {required: true, message: '请选择', trigger: 'change'}
        ],
        sortId: [
          {required: true, message: '请选择', trigger: 'change'}
        ]
      }
    }
  },
  methods: {
    getData () {
      let self = this
      util.myAjax({
        url: '/getInfo',
        data: {
          userName: self.userName
        },
        success: function (result) {
          if (result.statusCode === constants.SUCCESS_CODE) {
            let data = result.data
            self.form = data
            self.sortList = []
            data.directionSortMapVos.forEach((v, i, array) => {
              if (i !== 0) {
                v.sortList.forEach((vv, ii, array) => {
                  let item = {
                    label: vv.name,
                    value: vv.id
                  }
                  self.sortList.push(item)
                })
              }
            })
          } else {
            self.$message.error(result.message)
          }
        }
      })
    },
    handleClose () {
      this.$emit('changeInfoDialogCloseEvent')
    },
    handleConfirm () {
      let self = this
      this.$refs.form.validate((valid) => {
        if (valid) {
          util.myAjax({
            url: '/update/userBasic',
            data: {
              userId: self.userInfo.userId,
              userName: self.userName,
              nickName: self.form.nickName,
              birthday: '2019-05-12',
              sortId: self.form.sortId,
              userImageUrl: '/default.jpg',
              gender: self.form.gender,
              university: self.form.university
            },
            success: function (result) {
              if (result.statusCode === constants.SUCCESS_CODE) {
                self.$message.success('修改成功！')
                self.$emit('changeInfoDialogConfirmEvent')
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
