<template>
  <div>
    <div style="padding: 30px 80px;">
      <el-row>
       <el-col :span="24">
         <div>
           <el-carousel height="400px">
             <el-carousel-item>
               <img src="../../assets/picList/pic1.jpg" alt="" style="display: inline-block;height: 400px;width: 100%;">
             </el-carousel-item>
             <el-carousel-item>
               <img src="../../assets/picList/pic2.jpg" alt="" style="display: inline-block;height: 400px;width: 100%;">
             </el-carousel-item>
             <el-carousel-item>
               <img src="../../assets/picList/pic3.jpg" alt="" style="display: inline-block;height: 400px;width: 100%;">
             </el-carousel-item>
             <el-carousel-item>
               <img src="../../assets/picList/pic4.jpg" alt="" style="display: inline-block;height: 400px;width: 100%;">
             </el-carousel-item>
           </el-carousel>
         </div>
       </el-col>
      </el-row>
      <el-row style="height: 100px;margin-top: 20px;border: 1px solid darkgray; display: flex; align-items: center;background-color: #ffffff;">
       <el-col :span="6" style="display: flex; border-right: 1px dotted darkgray; align-items: center;justify-content: center">
         <div>
           <img src="../../assets/icon/feature1.png" alt="" style="height: 60px;">
           <p>专业权威</p>
         </div>
       </el-col>
       <el-col :span="6" style="display: flex; border-right: 1px solid darkgray; align-items: center;justify-content: center">
         <div>
           <img src="../../assets/icon/feature2.png" alt="" style="height: 60px;">
           <p>项目分享</p>
         </div>
       </el-col>
       <el-col :span="6" style="display: flex; border-right: 1px solid darkgray; align-items: center;justify-content: center">
         <div>
           <img src="../../assets/icon/feature3.png" alt="" style="height: 60px;">
           <p>合作开发</p>
         </div>
       </el-col>
       <el-col :span="6" style="display: flex; border-right: 1px solid darkgray; align-items: center;justify-content: center">
         <div>
           <img src="../../assets/icon/feature4.png" alt="" style="height: 60px;">
           <p>大牛驻扎</p>
         </div>
       </el-col>
      </el-row>
      <!--<div style="margin-top: 30px">-->
        <!--<div style="text-align: left">-->
          <!--<h2>分享平台</h2>-->
        <!--</div>-->
        <!--<el-row style="border: 1px solid #000; height: 300px;">-->
         <!--<el-col :span="8">10</el-col>-->
         <!--<el-col :span="16">20</el-col>-->
        <!--</el-row>-->
      <!--</div>-->
      <div style="margin-top: 30px;">
        <div style="text-align: center;letter-spacing:5px; margin-bottom: 10px;">
          <h2>正在热募</h2>
        </div>
        <div style="border: 1px solid darkgray;min-height: 650px;" v-loading="loading">
          <div>
            <div v-for="(item, index) in projectList" :key="index" class="contentBox">
              <el-row style="margin:0 10px;display: flex;justify-content: center;align-items: center; border-bottom: 1px solid gainsboro;height: 120px;">
                <el-col :span="2">
                  <img src="../../assets/projectLogo/projectLogo.jpg" alt="" style="height: 100px;width: 100%;display: inline-block;">
                </el-col>
               <el-col :span="4" style="display: flex; justify-content: center;">
                 <div>
                   <p>项目发起人：{{item.startUserName}}</p>
                   <p>项目发起时间：{{format(item.createTime, 'yyyy-MM-dd HH:ss')}}</p>
                   <p>项目状态：正在热募中</p>
                 </div>
               </el-col>
               <el-col :span="18">
                 <span class="projectTitle" @click="handleProjectDetail(item.id)">{{item.name}}</span>
                 <p>项目简介: 无</p>
               </el-col>
              </el-row>
            </div>
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="currentPage"
              :page-size="5"
              layout="total, prev, pager, next, jumper"
              :total="total">
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import util from '../../util/util'
import constants from '../../util/constants'
export default {
  name: 'mainContent',
  props: [],
  components: {},
  created () {
    this.getProjectList()
  },
  watch: {},
  computed: {},
  data () {
    return {
      currentPage: 1,
      total: 100,
      projectData: [
        {
          projectName: '项目名称。。',
          projectId: '123',
          server: 'xxx.xxx.xxx.xxx',
          gitLab: 'xxx.xxx.xxx.xxx'
        },
        {
          projectName: '项目名称。。',
          projectId: '124',
          server: 'xxx.xxx.xxx.xxx',
          gitLab: 'xxx.xxx.xxx.xxx'
        },
        {
          projectName: '项目名称。。',
          projectId: '125',
          server: 'xxx.xxx.xxx.xxx',
          gitLab: 'xxx.xxx.xxx.xxx'
        },
        {
          projectName: '项目名称。。',
          projectId: '126',
          server: 'xxx.xxx.xxx.xxx',
          gitLab: 'xxx.xxx.xxx.xxx'
        },
        {
          projectName: '项目名称。。',
          projectId: '127',
          server: 'xxx.xxx.xxx.xxx',
          gitLab: 'xxx.xxx.xxx.xxx'
        }
      ],
      projectList: [],
      loading: false
    }
  },
  methods: {
    getProjectList () {
      let self = this
      this.loading = true
      util.myAjax({
        url: '/joint/list',
        data: {
          directionId: 0,
          sortId: 0,
          themeId: 0,
          isOrderByTime: self.currentTab === 'new' ? 1 : 0,
          isOrderByNums: self.currentTab === 'new' ? 0 : 1,
          pn: self.currentPage,
          size: 5
        },
        success: function (result) {
          if (result.statusCode === constants.SUCCESS_CODE) {
            let data = result.data
            self.projectList = data.list
            self.total = data.total
            self.loading = false
          } else {
            self.$message.error(result.message)
          }
        }
      })
    },
    handleSizeChange () {},
    handleCurrentChange (val) {
      this.currentPage = val
      this.getProjectList()
    },
    handleProjectDetail (id) {
      let self = this
      self.$store.commit({
        type: 'setValue',
        category: 'project_id',
        project_id: id
      })
      this.$router.push({path: '/business/coDeveloped/projectDetail'})
    },
    format (time, format) {
      let t = new Date(time)
      let tf = function (i) { return (i < 10 ? '0' : '') + i }
      return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function (a) {
        switch (a) {
          case 'yyyy':
            return tf(t.getFullYear())
            break
          case 'MM':
            return tf(t.getMonth() + 1)
            break
          case 'mm':
            return tf(t.getMinutes())
            break
          case 'dd':
            return tf(t.getDate())
            break
          case 'HH':
            return tf(t.getHours())
            break
          case 'ss':
            return tf(t.getSeconds())
            break
        }
      })
    }
  }
}
</script>

<style scoped>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 400px;
    margin: 0;
  }
  .projectTitle{
    font-size: 20px;
    font-weight: bold;
  }
  .projectTitle:hover{
    color: #409eff;
    cursor: pointer;
  }
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  >>>.el-pagination{
    background-color: #ffffff;
    padding: 10px 10px;
  }
  p{
    font-size: 16px;
  }
  .contentBox{
    background-color: #ffffff;
  }
  .contentBox:hover{
    background-color: rgb(245, 246, 247);
  }
</style>
