<template>
  <div>
    <el-dialog
      title="上传头像"
      :visible.sync="visible"
      :before-close="handleClose"
      :close-on-click-modal="false"
      width="600px"
    >
      <el-upload
        class="picDialog"
        drag
        ref="upload"
        action="https://jsonplaceholder.typicode.com/posts/"
        show-file-list
        :auto-upload="false"
        multiple>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text picDialog">将图片拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="handleConfirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'changeImageDialog',
  props: ['pvisible'],
  components: {},
  mounted () {
  },
  watch: {
    pvisible (newVal) {
      this.visible = newVal
    }
  },
  computed: {},
  data () {
    return {
      visible: this.pvisible,
      imageUrl: ''
    }
  },
  methods: {
    handleClose () {
      this.$emit('changeImageDialogCloseEvent')
    },
    handleConfirm () {
      this.$emit('changeImageDialogConfirmEvent')
    },
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }
  }
}
</script>

<style scoped>
  .picDialog{
    text-align: center;
  }
</style>
