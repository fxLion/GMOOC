<template>
  <div>
    <div style="padding: 30px;background-color: #ffffff;">
      <el-row>
        <el-col :span="20">
          <el-form ref="form" :model="form" label-width="80px" label-suffix="：" v-loading="loading">
            <el-form-item label="方向">
              <el-radio-group v-model="form.direction" class="radioGroup">
                <template v-for="(item, index) in directionList">
                  <el-radio-button :label="item.id" :key="index">{{item.directionName}}</el-radio-button>
                </template>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="分类">
              <el-radio-group v-model="form.type" class="radioGroup" @change="selectedChange">
                <template v-if="form.direction === 0">
                  <template v-for="(item, index) in sortDirectionList">
                    <el-radio-button :label="item.id" :key="index">
                      {{item.sortName}}
                    </el-radio-button>
                  </template>
                </template>
                <template v-else>
                  <template v-for="(item, index) in sortDirectionList">
                    <el-radio-button v-if="item.directionId === form.direction" :label="item.id" :key="index">
                      {{item.sortName}}
                    </el-radio-button>
                  </template>
                </template>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="主题">
              <el-radio-group v-model="form.theme" class="radioGroup" @change="selectedChange">
                <el-radio-button v-for="(item, index) in themeList" :label="item.id" :key="index">
                  {{item.name}}
                </el-radio-button>
              </el-radio-group>
            </el-form-item>
          </el-form>
          <div style="padding: 0 40px;" >
            <el-tabs v-model="currentTab" @tab-click="handleClickTab">
              <el-tab-pane label="最新" name="new">
                <div style="display: flex; height: 400px; justify-content: flex-start; flex-wrap: wrap;">
                  <template v-if="projectList.length !== 0">
                    <template v-for="(item, index) in projectList">
                      <el-card shadow="hover" style="width: 20%;height: 160px; padding: 10px;margin: 0 20px;" :key="index"
                               @click.native="handleProjectDetail(item.id)">
                        <img src="../../../assets/logo.png" alt="加载失败" style="height: 120px;width: 100%; display: block">
                        <span>{{item.name}}</span>
                      </el-card>
                    </template>
                  </template>
                  <template v-else>
                    <div  style="text-align: center;width: 100%;">暂无数据</div>
                  </template>
                </div>
              </el-tab-pane>
              <el-tab-pane label="最热门" name="hot">
                <div style="display: flex; height: 400px; justify-content: flex-start; flex-wrap: wrap;" >
                  <template v-if="projectList.length !== 0">
                    <template v-for="(item, index) in projectList">
                      <el-card shadow="hover" style="width: 20%;height: 160px; padding: 10px;margin: 0 20px;" :key="index"
                               @click.native="handleProjectDetail(item.id)">
                        <img :src="picUrl" alt="加载失败" style="height: 120px;width: 100%; display: block">
                        <span>{{item.name}}</span>
                      </el-card>
                    </template>
                  </template>
                  <template v-else>
                    <div  style="text-align: center;width: 100%;">暂无数据</div>
                  </template>
                </div>
              </el-tab-pane>
            </el-tabs>
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="currentPage"
              :page-size="8"
              layout="total, prev, pager, next, jumper"
              :total="total">
            </el-pagination>
          </div>
        </el-col>
        <el-col :span="4" style=" height: 600px">
          <el-button type="primary" style="width: 100%; height: 60px;" @click="handleAddProject">发起我的项目招聘</el-button>
          <div style="padding: 20px;">
            <div style="background-color: #409EFF;color: #fff;padding: 10px;margin-bottom: 10px;">
              <span>疯狂招募的项目:</span>
            </div>
            <div style="height:540px;display: flex; flex-direction: column; justify-content: space-between;">
              <el-card shadow="hover" style="height: 120px; padding: 10px; border: 1px solid #e4e7ed"
                       @click.native="handleProjectDetail(1)">
                <img src="../../../assets/projectLogo/projectLogo.jpg" alt="" style="height: 100px;width: 100%;display: inline-block;">
              </el-card>
              <el-card shadow="hover" style="height: 120px; padding: 10px;">
                <img src="../../../assets/projectLogo/projectLogo.jpg" alt="" style="height: 100px;width: 100%;display: inline-block;">
              </el-card>
              <el-card shadow="hover" style="height: 120px; padding: 10px;">
                <img src="../../../assets/projectLogo/projectLogo.jpg" alt="" style="height: 100px;width: 100%;display: inline-block;">
              </el-card>
              <el-card shadow="hover" style="height: 120px; padding: 10px;">
                <img src="../../../assets/projectLogo/projectLogo.jpg" alt="" style="height: 100px;width: 100%;display: inline-block;">
              </el-card>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import util from './../../../util/util'
import constants from './../../../util/constants'
export default {
  name: 'coDeveloped',
  props: [],
  components: {},
  mounted () {
    this.getDirectionSortMap()
    this.getProjectList()
  },
  watch: {},
  computed: {},
  data () {
    return {
      form: {
        direction: 0,
        type: 0,
        theme: 0
      },
      loading: false,
      currentTab: 'new',
      currentPage: 1,
      total: 0,
      testList: [
        {
          'directionId': 1,
          'directionName': '服务端',
          'sortList': [
            {
              'id': 1,
              'name': 'Java',
              'directionId': 1,
              'isLocked': true,
              'gmtCreate': '2019-02-06T00:45:09.000+0000',
              'gmtModified': '2019-02-06T00:45:10.000+0000'
            },
            {
              'id': 2,
              'name': 'Python',
              'directionId': 1,
              'isLocked': true,
              'gmtCreate': '2019-02-06T00:45:09.000+0000',
              'gmtModified': '2019-02-06T00:45:10.000+0000'
            },
            {
              'id': 3,
              'name': 'Php',
              'directionId': 1,
              'isLocked': true,
              'gmtCreate': '2019-02-06T00:45:09.000+0000',
              'gmtModified': '2019-02-06T00:45:10.000+0000'
            },
            {
              'id': 4,
              'name': 'C#',
              'directionId': 1,
              'isLocked': true,
              'gmtCreate': '2019-02-06T00:45:09.000+0000',
              'gmtModified': '2019-02-06T00:45:10.000+0000'
            },
            {
              'id': 5,
              'name': 'Go',
              'directionId': 1,
              'isLocked': true,
              'gmtCreate': '2019-02-06T00:45:09.000+0000',
              'gmtModified': '2019-02-06T00:45:10.000+0000'
            },
            {
              'id': 6,
              'name': 'C++',
              'directionId': 1,
              'isLocked': true,
              'gmtCreate': '2019-02-06T00:46:10.000+0000',
              'gmtModified': '2019-02-06T00:46:10.000+0000'
            }
          ]
        },
        {
          'directionId': 2,
          'directionName': '前端',
          'sortList': [
            {
              'id': 7,
              'name': 'Vue.js',
              'directionId': 2,
              'isLocked': true,
              'gmtCreate': '2019-02-06T00:46:10.000+0000',
              'gmtModified': '2019-02-06T00:46:10.000+0000'
            },
            {
              'id': 8,
              'name': 'React.JS',
              'directionId': 2,
              'isLocked': true,
              'gmtCreate': '2019-02-06T00:46:10.000+0000',
              'gmtModified': '2019-02-06T00:46:10.000+0000'
            },
            {
              'id': 9,
              'name': 'Bootstrap',
              'directionId': 2,
              'isLocked': true,
              'gmtCreate': '2019-02-06T00:46:10.000+0000',
              'gmtModified': '2019-02-06T00:46:10.000+0000'
            }
          ]
        },
        {
          'directionId': 3,
          'directionName': '游戏开发',
          'sortList': []
        },
        {
          'directionId': 4,
          'directionName': '测试模块',
          'sortList': []
        },
        {
          'directionId': 5,
          'directionName': '移动端',
          'sortList': []
        },
        {
          'directionId': 6,
          'directionName': '区块链',
          'sortList': []
        },
        {
          'directionId': 7,
          'directionName': '产品设计',
          'sortList': []
        }
      ],
      directionList: [],
      sortDirectionList: [],
      themeList: [],
      projectList: [],
      picUrl: '../../../assets/projectLogo/projectLogo.jpg'
    }
  },
  methods: {
    getDirectionSortMap () {
      this.loading = true
      let self = this
      util.myAjax({
        url: '/joint/getDirectionSortMap',
        method: 'get',
        data: {},
        success: function (result) {
          if (result.statusCode === constants.SUCCESS_CODE) {
            let data = result.data
            // self.directionList = data.directionList
            // self.sortDirectionList = data.sortDirectionList
            // self.themeList = data.themeList
            data.directionSortMapVoMap.forEach((v, i, array) => {
              let item = {
                directionName: v.directionName,
                id: v.directionId
              }
              self.directionList.push(item)
              v.sortList.forEach((vv, ii, iarray) => {
                let items = {
                  sortName: vv.name,
                  id: vv.id,
                  directionId: vv.directionId
                }
                self.sortDirectionList.push(items)
              })
            })
            self.themeList = data.themeList
            self.loading = false
          } else {
            self.$message.error(result.message)
          }
        }
      })
    },
    getProjectList () {
      let self = this
      util.myAjax({
        url: '/joint/list',
        data: {
          directionId: self.form.direction,
          sortId: self.form.type,
          themeId: self.form.theme,
          isOrderByTime: self.currentTab === 'new' ? 1 : 0,
          isOrderByNums: self.currentTab === 'new' ? 0 : 1,
          pn: self.currentPage,
          size: 8
        },
        success: function (result) {
          if (result.statusCode === constants.SUCCESS_CODE) {
            let data = result.data
            self.projectList = data.list
            self.total = data.total
          } else {
            self.$message.error(result.message)
          }
        }
      })
    },
    handleClickTab (tab, event) {
      let name = tab.name
      if (name !== this.currentTab) {
        this.currentTab = name
      }
      this.getProjectList()
    },
    handleSizeChange () {
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.getProjectList()
    },
    selectedChange () {
      let self = this
      util.myAjax({
        url: '/joint/list',
        data: {
          directionId: self.form.direction,
          sortId: self.form.type,
          themeId: self.form.theme,
          isOrderByTime: self.currentTab === 'new' ? 1 : 0,
          isOrderByNums: self.currentTab === 'new' ? 0 : 1,
          pn: self.currentPage,
          size: 8
        },
        success: function (result) {
          if (result.statusCode === constants.SUCCESS_CODE) {
            let data = result.data
            self.projectList = data.list
            self.total = data.total
          } else {
            self.$message.error(result.message)
          }
        }
      })
    },
    handleAddProject () {
      if (util.getCookie('token') === '' || util.getCookie('token') === undefined) {
        this.$message.error('需要登录才能发起我的项目！')
        return false
      }
      this.$router.push({path: '/business/coDeveloped/addProject'})
    },
    handleProjectDetail (id) {
      let self = this
      self.$store.commit({
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
  .radioGroup {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 40px;
  }

  >>> .el-card__body {
    padding: 0;
  }
</style>
