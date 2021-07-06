<template>
  <div>
    <el-dialog
      title="审批加入"
      :visible.sync="visible"
      width="30%"
      :before-close="handleClose">
      <el-form ref="form" :model="form" :rules="rules" status-icon label-width="120px">
        <el-form-item label="申请人员列表" prop="member">
          <el-select v-model="form.member" placeholder="请选择" style="width: 100%;">
            <el-option
              v-for="(item, index) in optionsList"
              :key="index"
              :label="item.userNick"
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
  name: 'addMemberDialog',
  props: ['pvisible'],
  components: {},
  mounted () {
  },
  watch: {
    pvisible (newVal) {
      this.visible = newVal
      if (newVal) {
        this.getData()
      }
      this.$nextTick(function () {
        this.$refs.form.resetFields()
      })
    }
  },
  computed: {
    groupId () {
      return this.$store.getters.getValue('group_id')
    },
    userName: function () {
      return this.$store.getters.getValue('user_info').realName
    }
  },
  data () {
    return {
      visible: this.pvisible,
      form: {
        member: ''
      },
      optionsList: [],
      rules: {
        member: [
          {required: true, message: '不能为空', trigger: 'change'}
        ]
      }
    }
  },
  methods: {
    getData () {
      let self = this
      util.myAjax({
        url: '/group/groupMemeberList',
        data: {
          params: {
            groupId: self.groupId
          }
        },
        success: function (result) {
          if (result.statusCode === constants.SUCCESS_CODE) {
            let data = result.data
            console.log(data)
            self.optionsList = data
          } else {
            self.$message.error(result.message)
          }
        }
      })
    },
    handleClose () {
      this.$emit('addMemberDialogCloseEvent')
    },
    handleConfirm () {
      let self = this
      console.log(this.form.member)
      this.$refs.form.validate((valid) => {
        if (valid) {
          util.myAjax({
            url: '/group/groupMemberPass',
            data: {
              params: {
                groupId: self.groupId,
                userName: self.userName,
                userId: self.form.member
              }
            },
            success: function (result) {
              if (result.statusCode === constants.SUCCESS_CODE) {
                self.$message.success('添加成功！')
                self.$emit('addMemberDialogConfirmEvent')
              } else {
                self.$message.error(result.data)
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
