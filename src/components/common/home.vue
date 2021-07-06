<template>
  <div>
    <el-container>
      <el-header style="padding: 0;height: 160px;"><myHeader></myHeader></el-header>
      <el-main style="padding: 0;"><router-view></router-view></el-main>
      <el-footer style="padding: 0;"><myFooter></myFooter></el-footer>
    </el-container>
  </div>
</template>

<script>
import myHeader from './myheader'
import myFooter from './footer'
export default {
  name: 'home',
  props: [],
  components: {myHeader, myFooter},
  mounted () {
    // let self = this
    // window.addEventListener('resize', function () {
    //   let h = document.documentElement.clientHeight
    //   self.mianStyle.height = h - 60 - 100 + 'px'
    // })
  },
  watch: {},
  computed: {},
  data () {
    // let height = document.documentElement.clientHeight
    return {
      // mianStyle: {
      //   'height': (height - 60 - 100) + 'px'
      // }
    }
  },
  methods: {}
}
</script>

<style scoped>

</style>
