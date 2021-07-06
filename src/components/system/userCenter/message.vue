<template>
  <div>
    <h3 class="title">消息通知</h3>
    <template v-for="(item, index) in messageList" >
      <div class="project" :key="index" >
        <el-badge is-dot :hidden="item.noRead"></el-badge>
        <span @click="handleRead(item.noRead)">{{item.message}}</span>
        <div style="float: right;margin-right: 20px;">
          <span style="margin-right: 40px;">{{item.time}}</span>
          <i class="el-icon-delete delete" @click="handleDelete"></i>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'message',
  props: [],
  components: {},
  mounted () {
  },
  watch: {},
  computed: {},
  data () {
    return {
      messageList: [
        {
          message: '消息一',
          messageId: 1,
          noRead: false,
          time: '2019-04-23'
        },
        {
          message: '消息二',
          messageId: 2,
          noRead: false,
          time: '2019-04-23'
        },
        {
          message: '消息三',
          messageId: 3,
          noRead: false,
          time: '2019-04-23'
        },
        {
          message: '消息四',
          messageId: 4,
          noRead: false,
          time: '2019-04-23'
        }
      ]
    }
  },
  methods: {
    getMessage () {},
    handleRead (bool) {
      console.log(2)
      this.messageList[0].noRead = !bool
    },
    handleDelete () {
      console.log(34)
    }
  }
}
</script>

<style scoped>
  .title{
    text-align: center;
    height: 69px;
    line-height: 69px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.3) ;
  }
  .project{
    height: 60px;
    line-height: 60px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2) ;
  }
  .projectTitle{
    font-size: 16px;
    font-weight: bold;
  }
  .projectTitle:hover{
    color: #409eff;
    cursor: pointer;
  }
  .delete:hover{
    color: #409eff;
  }
</style>
