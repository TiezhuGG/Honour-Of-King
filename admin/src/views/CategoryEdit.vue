<template>
  <div>
    <h1>{{id ? '编辑' : '新建'}}分类</h1>
    <el-form label-width="120px">
      <el-form-item label="上级分类">
        <el-select v-model="model.parent">
          <el-option
            v-for="(parent,i) in parents"
            :key="i"
            :label="parent.name"
            :value="parent._id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click.prevent="save">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    id: { type: String }
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
        res = await this.$axios.put(`categories/${this.id}`, this.model);
      } else {
        res = await this.$axios.post("categories", this.model);
      }
      this.$router.push("/categories/list");
      this.$message({
        type: "success",
        message: "保存成功"
      });
    },
    async fetch() {
      const res = await this.$axios.get(`categories/${this.id}`);
      this.model = res.data;
    },
    async fetchParents() {
      const res = await this.$axios.get(`categories`);
      this.parents = res.data;
    }
  },
  created() {
    this.id && this.fetch();
    this.fetchParents();
  }
};
</script>

<style>
</style>
