<template>
  <div class="ad-create">
    <h1>{{ id ? '编辑' : '新建'}}广告位</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="广告">
        <el-button size="small" @click="model.items.push({})">
          <i class="el-icon-plus"></i> 添加广告
        </el-button>
        <el-row type="flex" style="flex-wrap: wrap">
          <el-col :md="24" v-for="(item, i) in model.items" :key="i">
            <el-form-item label="跳转链接">
              <el-input v-model="item.url"></el-input>
            </el-form-item>
            <el-form-item label="图片" style="margin-top:1rem;">
              <el-upload
                class="avatar-uploader"
                :action="$axios.defaults.baseURL + '/upload'"
                :show-file-list="false"
                :on-success="res => $set(item, 'image', res.url)"
              >
                <img v-if="item.image" :src="item.image" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item>
              <el-button size="small" type="danger" @click="model.items.splice(i, 1)">删除</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "ad-create",
  props: {
    id: {}
  },
  data() {
    return {
      model: {
        items: []
      }
    };
  },
  methods: {
    async save() {
      let res;
      if (this.id) {
        // 更新
        res = await this.$axios.put(`rest/ads/${this.id}`, this.model);
        this.$router.push({ name: "ads-list" });
        this.$message({
          type: "success",
          message: "更新成功"
        });
      } else {
        // 新建
        res = await this.$axios.post("rest/ads", this.model);
        this.$router.push({ name: "ads-list" });
        this.$message({
          type: "success",
          message: "新建成功"
        });
      }
    },
    async fetch() {
      const res = await this.$axios.get(`rest/ads/${this.id}`);
      this.model = Object.assign(this.model, res.data);
    }
  },
  created() {
    // 满足this.id才执行this.fetch()
    this.id && this.fetch();
  }
};
</script>

<style scoped>
.avatar-uploader-icon {
    min-width: 25rem;
    height: 15rem;
    line-height: 15rem;
}
.avatar {
    min-width: 25rem;
    height: 15rem;
}
</style>
