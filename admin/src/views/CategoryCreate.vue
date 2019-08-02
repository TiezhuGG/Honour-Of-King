<template>
  <div class="category-create">
    <h1>{{ id ? '编辑' : '新建'}}分类</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="上级分类">
        <el-select v-model="model.parent">
          <el-option 
          v-for="item in parents" 
          :key="item._id" 
          :label="item.name" 
          :value="item._id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "category-create",
  props: {
    id: {}
  },
  data() {
    return {
      model: {},
      parents: []
    };
  },
  methods: {
    async save() {
      let res;
      if (this.id) {
        // 更新
        res = await this.$axios.put(`rest/categories/${this.id}`, this.model);
        this.$router.push({name: 'categories-list'});
        this.$message({
          type: "success",
          message: "更新成功"
        });
      } else {
        // 新建
        res = await this.$axios.post("rest/categories", this.model);
        this.$router.push({name: 'categories-list'});
        this.$message({
          type: "success",
          message: "新建成功"
        });
      }
    },
    async fetch() {
      const res = await this.$axios.get(`rest/categories/${this.id}`);
      this.model = res.data;
    },
    async fetchParents() {
      const res = await this.$axios.get(`rest/categories`);
      this.parents = res.data;
    }
  },
  created() {
    this.fetchParents();
    // 满足this.id才执行this.fetch()
    this.id && this.fetch();
  }
};
</script>

<style scoped>
</style>
