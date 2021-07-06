<template>
  <div>
    <div class="content">
      <div class="title">
        <span>问题帮助</span>
      </div>
      <div v-loading="loading">
        <template v-for="(item, index) in list">
          <div class="problem" :key="index">
            <div class="question">
              Q：{{item.question}}
            </div>
            <div class="answer">
              A：{{item.answer}}
            </div>
          </div>
        </template>
      </div>
      <div style="text-align: center;margin: 10px;">
        <el-button type="primary" @click="handleSendProblem">问题反馈</el-button>
      </div>
      <problem-dialog
        :pvisible="problemDialogVisible"
        @problemDialogCloseEvent="handleProblemImageDialogClose"
        @problemDialogConfirmEvent="handleProblemImageDialogConfirm"
      ></problem-dialog>
    </div>
  </div>
</template>

<script>
import problemDialog from './problemDialog'
import util from '../../../util/util'
import constants from '../../../util/constants'
export default {
  name: 'help',
  props: [],
  components: {problemDialog},
  created () {
    this.getData()
  },
  watch: {},
  computed: {},
  data () {
    return {
      list: [],
      problemDialogVisible: false,
      loading: false
    }
  },
  methods: {
    getData () {
      let self = this
      self.loading = true
      util.myAjax({
        url: '/feedback/getQuestions',
        data: {
          pn: 0,
          size: 0
        },
        success: function (result) {
          if (result.statusCode === constants.SUCCESS_CODE) {
            let data = result.data
            self.list = data
            self.loading = false
          } else {
            self.$message.error(result.message)
          }
        }
      })
    },
    handleSendProblem () {
      this.problemDialogVisible = true
    },
    handleProblemImageDialogClose () {
      this.problemDialogVisible = false
    },
    handleProblemImageDialogConfirm () {
      this.problemDialogVisible = false
    }
  }
}
</script>

<style scoped>
  .content{
    background-color: #ffffff;
    margin: 0 80px;
    min-height: 627px;
  }
  .title{
    text-align: center;
    border-bottom: 1px solid rgba(0, 0, 0, 0.3);
    margin: 0 10px;
  }
  .title span{
    display: inline-block;
    height: 60px;
    line-height: 60px;
    font-size: 20px;
    font-weight: bold;
  }
  .problem{
    border-bottom: 1px solid darkgray;
    margin: 20px 10px;
   }
  .question {
    margin-bottom: 10px;
    font-size: 16px;
    line-height: 22px;
    font-weight: bold;
  }
  .answer{
    margin-bottom: 10px;
    font-size: 16px;
    line-height: 22px;
  }
</style>
