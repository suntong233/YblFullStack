<template>
  <div>
      <h3> {{ isCreate? '创建' : '编辑' }}课程</h3>
      <ele-form
        :form-data="data"
        :form-desc="fields"
        :request-fn="submit"
      >
      </ele-form>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({})
export default class CourseList extends Vue {
  @Prop(String) id!:string
  data = {};
  fields = {
    name: {label: '名称', type: 'input'},
    cover: {label: '课程封面图', type: 'input'}
  };

  get isCreate(){
    return !this.id
  }

  async submit(data:any){
    const url = this.isCreate ? `courses` : `courses/${this.id}`
    const method = this.isCreate ? 'post' : 'put'
    let res = await this.$axios[method](url, data)
    if(res){
      this.$message.success('保存成功')
      this.data = {}
      this.$router.go(-1)
    }
  }

  async fetch(){
    let res = await this.$axios.get(`courses/${this.id}`)
    this.data = res.data
  }

  created () {
    // 如果不是创建页面 是编辑页面 获取id对应数据
    // if(!this.isCreate){
    //   this.fetch()
    // }  简写成
    !this.isCreate && this.fetch()
  }
}



</script>

<style scoped>

</style>

