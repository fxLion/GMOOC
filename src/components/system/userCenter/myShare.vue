<template>
  <div>
    <h3 class="title">我的分享</h3>
    <template v-for="(item, index) in projectList" >
      <div class="project" :key="index">
        <span class="projectTitle" @click="handleToProject(item.jointId)">{{item.jointName}}</span>
      </div>
    </template>
  </div>
</template>

<script>
import util from '../../../util/util'
import constants from '../../../util/constants'
export default {
  name: 'myShare',
  props: [],
  components: {},
  created () {
    this.getData()
  },
  watch: {},
  computed: {
    userName () {
      return this.$store.getters.getValue('user_info').realName
    }
  },
  data () {
    return {
      projectList: []
    }
  },
  methods: {
    getData () {
      let self = this
      util.myAjax({
        url: '/group/jointList',
        data: {
          params: {
            userName: this.userName
          }
        },
        success: function (result) {
          if (result.statusCode === constants.SUCCESS_CODE) {
            let data = result.data
            self.projectList = data
          } else {
            self.$message.error(result.message)
          }
        }
      })
    },
    handleToProject (id) {
      this.$store.commit({
        type: 'setValue',
        category: 'project_id',
        project_id: id
      })
      this.$router.push({path: '/business/coDeveloped/projectDetail'})
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
</style>
