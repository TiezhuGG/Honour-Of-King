<template>
  <div class="admin-users-create">
    <h1>{{ id ? '编辑' : '新建'}}管理员</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="用户名">
        <el-input v-model="model.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="model.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "admin-users-create",
  props: {
    id: {}
  },
  data() {
    return {
      model: {},
    };
  },
  methods: {
    async save() {
      let res;
      if (this.id) {
        // 更新
        res = await this.$axios.put(`rest/admin_users/${this.id}`, this.model);
        this.$router.push({name: 'admin-users-list'});
        this.$message({
          type: "success",
          message: "更新成功"
        });
      } else {
        // 新建
        res = await this.$axios.post("rest/admin_users", this.model);
        this.$router.push({name: 'admin-users-list'});
        this.$message({
          type: "success",
          message: "新建成功"
        });
      }
    },
    async fetch() {
      const res = await this.$axios.get(`rest/admin_users/${this.id}`);
      this.model = res.data;
    },
  },
  created() {
    // 满足this.id才执行this.fetch()
    this.id && this.fetch();
  }
};
</script>

<style scoped>
</style>
