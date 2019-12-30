<template>
  <div class="page-article" v-if="model">
    <div class="d-flex py-3 px-2">
      <div @click="back" class="iconfont icon-Back"></div>
        <strong class="flex-1 text-blue pl-2">
            {{model.title}}
        </strong>
        <div class="text-gray fs-xs">
            2019/7/11
        </div>
    </div>
    <div v-html="model.body" class="body px-3 fs-lg text-center"></div>
  </div>
</template>

<script>
export default {
  neme: "page-article",
  props: {
    id: { required: true }
  },
  data() {
    return {
        model: null
    }
  },
  methods: {
    async fetch() {
      const res = await this.$axios.get(`articles/${this.id}`);
      this.model = res.data;
    },
    back() {
        this.$router.go(-1)
    }
  },
  created() {
    this.fetch();
  }
};
</script>

<style lang="scss">
.page-article {
    .body {
        img {
            max-width: 100%;
            height: auto;
            margin: 0 auto;
        }
    }
}
</style>
