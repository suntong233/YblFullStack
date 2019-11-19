<template>
  <div>
    <avue-crud 
      :data="data.data" 
      v-if="option.column"
      :option="option"
      :page="page"
      @row-save="create"
      @row-update="update"
      @row-del="remove"
      @on-load="changePage"
      @sort-change="changeSort"
    ></avue-crud>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({})
export default class ResourceCrud extends Vue {
  @Prop(String) resource!:string
  data: any = {};
  option: any = {};
  page: any = {
    total: 0
  };
  query: any = {
    sort: { _id: -1 }
  }

  async changePage({pageSize,currentPage}: any){
    this.query.limit = pageSize
    this.query.page = currentPage
    this.fetch()
  }

  async changeSort({prop, order}: any){
    if(!order){
      this.query.sort = null
    } else{
      this.query.sort = {
        [prop]: order === 'ascending' ? 1 : -1
      }
    }
    this.fetch()
  }

  async fetch() {
    let res = await this.$axios.get(`${this.resource}`, {
      params: {
        query: this.query
      }
    });
    this.page.total = res.data.total
    this.data = res.data;
    // window.console.log(this.data);
  }

  async create(row:any, done:any, loading:any){
    await this.$axios.post(`${this.resource}`, row)
    this.$message.success('创建成功')
    this.fetch()
    done()
  }

  async update(row:any, index:any, done:any, loading:any){
    const data = JSON.parse(JSON.stringify(row))
    delete data.$index
    await this.$axios.put(`${this.resource}/${row._id}`, data)
    this.$message.success('更新成功')
    this.fetch()
    done()
  }

  async remove(row: any){
    try {
      await this.$confirm('确认要删除吗？')
    } catch(e) {
      return
    }
    let res = await this.$axios.delete(`${this.resource}/${row._id}`)
    if(res){
      this.$message.success('删除成功')
      this.fetch()
    }
  }

  async fetchOption(){
    const res = await this.$axios.get(`${this.resource}/option`)
    this.option = res.data
  }

  created() {
    this.fetch();
    this.fetchOption();
  }
}
</script>

<style scoped>
</style>