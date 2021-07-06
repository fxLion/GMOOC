<template>
  <div>
    <div style="padding: 30px;">
      <el-row>
       <el-col :span="20">
         <el-form ref="form" :model="form" label-width="80px" label-suffix="：">
           <el-form-item label="方向">
             <el-radio-group v-model="form.direction" class="radioGroup" @change="selectedChange">
               <el-radio-button :label="0">全部</el-radio-button>
               <el-radio-button :label="1">服务端</el-radio-button>
               <el-radio-button :label="2">前端</el-radio-button>
               <el-radio-button :label="3">游戏开发</el-radio-button>
               <el-radio-button :label="4">区块链</el-radio-button>
               <el-radio-button :label="5">游戏模块</el-radio-button>
               <el-radio-button :label="6">移动端</el-radio-button>
             </el-radio-group>
           </el-form-item>
           <el-form-item label="分类">
             <el-radio-group v-model="form.type" class="radioGroup" @change="selectedChange">
               <el-radio-button  v-for="(item, index) in typeData" :key="index" :label="item.id">{{item.typeName}}</el-radio-button>
             </el-radio-group>
           </el-form-item>
           <el-form-item label="主题">
             <el-radio-group v-model="form.theme" class="radioGroup" @change="selectedChange">
               <el-radio-button v-for="(item, index) in themeData" :label="item.id" :key="index">{{item.themeName}}</el-radio-button>
             </el-radio-group>
           </el-form-item>
         </el-form>
         <div style="padding: 0 40px;">
           <el-tabs v-model="currentTab" @tab-click="handleClickTab">
             <el-tab-pane label="最新" name="new">
               <div style="display: flex; height: 400px; justify-content: space-around; flex-wrap: wrap; align-content: space-around;">
                 <template v-for="(item, index) in testData">
                   <el-card shadow="hover" style="width: 20%;height: 150px; padding: 10px;" :key="index">
                     <img :src="item.picUrl" alt="加载失败" style="height: 120px;width: 100%; display: block" >
                     <span>{{item.text}}</span>
                   </el-card>
                 </template>
               </div>
               <el-pagination
                 @size-change="handleSizeChange"
                 @current-change="handleCurrentChange"
                 :current-page.sync="currentPage"
                 :page-size="100"
                 layout="total, prev, pager, next, jumper"
                 :total="1000">
               </el-pagination>
             </el-tab-pane>
             <el-tab-pane label="最热门" name="hot">最热</el-tab-pane>
           </el-tabs>
         </div>
       </el-col>
       <el-col :span="4" style="background-color: aliceblue; height: 600px">
         <el-button type="primary" style="width: 100%; height: 60px;">分享我的项目</el-button>
         <div style="padding: 30px;display: flex;height: 500px;flex-direction: column; justify-content: space-around;">
           <el-card shadow="hover" style="height: 100px; padding: 10px;">
             鼠标悬浮时显示
           </el-card>
           <el-card shadow="hover" style="height: 100px; padding: 10px;">
             鼠标悬浮时显示
           </el-card>
           <el-card shadow="hover" style="height: 100px; padding: 10px;">
             鼠标悬浮时显示
           </el-card>
           <el-card shadow="hover" style="height: 100px; padding: 10px;">
           鼠标悬浮时显示
         </el-card>
         </div>
       </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'sharePlatform',
  props: [],
  components: {},
  mounted () {
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
      currentTab: 'new',
      currentPage: 1,
      testData: [
        {
          picUrl: './static/images/logo.png',
          text: '这是测试文字',
          id: '1'
        },
        {
          picUrl: './static/images/logo.png',
          text: '这是测试文字',
          id: '2'
        },
        {
          picUrl: './static/images/logo.png',
          text: '这是测试文字',
          id: '3'
        },
        {
          picUrl: './static/images/logo.png',
          text: '这是测试文字',
          id: '4'
        },
        {
          picUrl: './static/images/logo.png',
          text: '这是测试文字',
          id: '5'
        },
        {
          picUrl: './static/images/logo.png',
          text: '这是测试文字',
          id: '6'
        },
        {
          picUrl: './static/images/logo.png',
          text: '这是测试文字',
          id: '7'
        },
        {
          picUrl: './static/images/logo.png',
          text: '这是测试文字',
          id: '8'
        }
      ],
      typeData: [
        {
          id: 0,
          typeName: '全部'
        },
        {
          id: 1,
          typeName: 'Java'
        },
        {
          id: 2,
          typeName: 'Python'
        },
        {
          id: 3,
          typeName: 'Go'
        }
      ],
      themeData: [
        {
          id: 0,
          themeName: '全部'
        },
        {
          id: 1,
          themeName: '医疗'
        },
        {
          id: 2,
          themeName: 'CMS/CRD'
        },
        {
          id: 3,
          themeName: '科研项目'
        },
        {
          id: 4,
          themeName: '电子商务'
        }
      ]
    }
  },
  methods: {
    getData () {
    },
    handleClickTab (tab, event) {
      let name = tab.name
      if (name !== this.currentTab) {
        this.currentTab = name
      }
      console.log(this.currentTab)
    },
    handleSizeChange () {},
    handleCurrentChange () {},
    selectedChange (a) {
      console.log(a)
    }
  }
}
</script>

<style scoped>
  .radioGroup{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 40px;
  }
  >>>.el-card__body{
    padding: 0;
  }
</style>
