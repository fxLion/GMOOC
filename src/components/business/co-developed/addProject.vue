<template>
  <div>
    <div style="padding: 20px;min-height:590px; width: 70%;margin: 0 auto;background-color: #ffffff; ">
      <div>
        <span class="title">新建项目</span>
      </div>
      <div style="">
        <el-steps :active="active" align-center>
          <el-step title="填写项目信息" icon="el-icon-edit"></el-step>
          <el-step title="上传附件" icon="el-icon-upload"></el-step>
        </el-steps>
      </div>
      <div style="width: 80%;margin: 10px auto;">
        <template v-if="active === 1">
          <el-form ref="form" :model="form" :rules="rules" label-width="100px" label-suffix=":">
            <el-form-item label="项目名称">
              <el-input v-model="form.jointName" placeholder="请输入项目名称"></el-input>
            </el-form-item>
            <el-form-item label="项目组名称">
              <el-input v-model="form.jointGroupName" placeholder="请输入项目组名称"></el-input>
            </el-form-item>
            <template v-for="(domain, index) in dynamicValidateForm.domains"  label-width="0">
              <el-row :key="index">
                <el-col :span="8">
                  <el-form-item label="招募方向">
                    <el-select v-model="domain.directionId" placeholder="请选择类型" clearable>
                      <el-option
                        v-for="item in directionList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="招聘类别">
                    <el-select v-model="domain.sortIds" placeholder="请选择类型" multiple>
                      <el-option
                        v-for="item in sortList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <template v-if="index === dynamicValidateForm.domains.length - 1">
                    <el-button @click="addDomain">新增</el-button>
                  </template>
                  <el-button @click.prevent="removeDomain(domain)">删除</el-button>
                  <!--<el-form-item label="招聘人员主题">-->
                    <!--<el-select v-model="domain.theme" placeholder="请选择类型" multiple>-->
                      <!--<el-option-->
                        <!--v-for="item in themeList"-->
                        <!--:key="item.value"-->
                        <!--:label="item.label"-->
                        <!--:value="item.value">-->
                      <!--</el-option>-->
                    <!--</el-select>-->
                  <!--</el-form-item>-->
                </el-col>
              </el-row>
            </template>
            <el-form-item label="招募主题">
              <el-select v-model="form.theme" placeholder="请选择类型" clearable>
                <el-option
                  v-for="item in themeList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="项目介绍">
              <el-input v-model="form.jointContent" placeholder="请输入项目描述" type="textarea" :autosize="{ minRows: 5}"></el-input>
            </el-form-item>
            <el-form-item label="项目详细">
              <el-input v-model="form.jointDetail" placeholder="请输入内容描述" type="textarea" :autosize="{ minRows: 5}"></el-input>
            </el-form-item>
          </el-form>
          <div style="text-align: center;">
            <el-button style="margin-top: 12px;" @click="next(1)">下一步</el-button>
          </div>
        </template>
        <template v-else>
          <el-form ref="form" :model="form" label-width="100px" label-suffix="：">
            <el-form-item label="上传附件">
              <!--<el-upload-->
                <!--class="upload-demo"-->
                <!--drag-->
                <!--action="https://jsonplaceholder.typicode.com/posts/"-->
                <!--multiple>-->
                <!--<i class="el-icon-upload"></i>-->
                <!--<div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>-->
                <!--<div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>-->
              <!--</el-upload>-->
              <el-upload ref="upload"
                         :on-success="handleOnSuccess"
                         :on-remove="handleOnRemove"
                         :data="uploadParams"
                         drag
                         :auto-upload="false"
                         :file-list="fileList"
                         :on-exceed="handleOnExceed"
                         :action="uploadUrl">
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
              </el-upload>
            </el-form-item>
            <el-form-item label="GitHub地址">
              <el-input v-model="form.repoUrl" placeholder="请填入gitHub地址"></el-input>
            </el-form-item>
          </el-form>
          <div style="text-align: center;">
            <el-button style="margin-top: 12px;" @click="next(0)">上一步</el-button>
            <el-button style="margin-top: 12px;" @click="next(1)">下一步</el-button>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import constants from '../../../util/constants'
import util from '../../../util/util'
export default {
  name: 'addProject',
  props: [],
  components: {},
  mounted () {
  },
  watch: {},
  computed: {
    userName () {
      return this.$store.getters.getValue('user_info').realName
    }
  },
  data () {
    return {
      active: 1,
      form: {
        jointName: '',
        jointContent: '',
        jointDetail: '',
        direction: [],
        theme: [],
        sort: [],
        repoUrl: '',
        jointSpeed: 1,
        jointGroupName: '',
        directionSortMap: {}
      },
      dynamicValidateForm: {
        domains: [{
          directionId: [],
          sortIds: []
        }]
      },
      themeList: [
        {
          label: 1,
          value: 1
        },
        {
          label: 2,
          value: 2
        }
      ],
      directionList: [
        {
          label: 1,
          value: 1
        },
        {
          label: 2,
          value: 2
        }
      ],
      sortList: [
        {
          label: 1,
          value: 1
        },
        {
          label: 2,
          value: 2
        }
      ],
      uploadUrl: constants.JS_CONTEXT + '/file/upload',
      uploadParams: {
        token: util.getCookie('token')
      },
      fileList: [],
      rules: {
        direction: [
          {required: true, message: '请选择', trigger: 'change'}
        ],
        sort: [
          {required: true, message: '请选择', trigger: 'change'}
        ]
      }
    }
  },
  methods: {
    next (num) {
      let self = this
      if (num === 0) {
        self.active -= 1
      } else {
        if (self.active === 2) {
          self.$confirm('此操作将提交项目信息, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            self.$refs.form.validate((valid) => {
              if (valid) {
                util.myAjax({
                  url: 'joint/startJoint',
                  data: {
                    jointName: self.form.jointName,
                    jointContent: self.form.jointContent,
                    jointDetail: self.form.jointDetail,
                    themeId: self.form.theme,
                    repoUrl: self.form.repoUrl,
                    jointSpeed: self.form.jointSpeed,
                    jointGroupName: self.form.jointGroupName,
                    directionSortMap: self.dynamicValidateForm.domains,
                    userName: self.userName
                  },
                  success: function (result) {
                    if (result.statusCode === constants.SUCCESS_CODE) {
                      self.$store.commit({
                        type: 'setValue',
                        category: 'project_id',
                        project_id: result.data
                      })
                      self.$message.success('提交成功')
                      self.$router.push({path: '/business/coDeveloped/projectDetail'})
                    } else {
                      self.$message.error(result.message)
                    }
                  }
                })
              }
            })
          }).catch(() => {})
        } else {
          self.active += 1
        }
      }
    },
    removeDomain (item) {
      let index = this.dynamicValidateForm.domains.indexOf(item)
      if (index !== -1) {
        this.dynamicValidateForm.domains.splice(index, 1)
      }
    },
    addDomain () {
      this.dynamicValidateForm.domains.push({
        directionId: [],
        sortIds: []
      })
    },
    handleOnSuccess () {},
    handleOnRemove () {},
    handleOnExceed () {}
  }
}
</script>

<style scoped>
.title{
  height: 60px;
  line-height: 60px;
}
</style>
