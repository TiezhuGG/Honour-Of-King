<template>
  <div class="home">
    <swiper :options="swiperOption">
      <swiper-slide>
        <img class="w-100" src="../assets/images/slider4.jpeg" alt />
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../assets/images/slider3.jpeg" alt />
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../assets/images/slider2.jpeg" alt />
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../assets/images/slider1.jpeg" alt />
      </swiper-slide>
      <div class="swiper-pagination text-right px-3 pb-2" slot="pagination"></div>
    </swiper>
    <!-- end of swiper -->
    <div class="nav-icons bg-white mt-3 pt-3 text-center text-dark-1">
      <div class="d-flex flex-wrap">
        <div class="nav-item mb-3">
          <i class="sprite sprite-1"></i>
          <div>爆料站</div>
        </div>
        <div class="nav-item mb-3">
          <i class="sprite sprite-2"></i>
          <div>故事站</div>
        </div>
        <div class="nav-item mb-3">
          <i class="sprite sprite-3"></i>
          <div>周边商城</div>
        </div>
        <div class="nav-item mb-3">
          <i class="sprite sprite-4"></i>
          <div>体验服</div>
        </div>
        <div class="nav-item mb-3">
          <i class="sprite sprite-5"></i>
          <div>新人专区</div>
        </div>
        <div class="nav-item mb-3">
          <i class="sprite sprite-6"></i>
          <div>荣耀·传承</div>
        </div>
        <div class="nav-item mb-3">
          <i class="sprite sprite-7"></i>
          <div>同人社区</div>
        </div>
        <div class="nav-item mb-3">
          <i class="sprite sprite-8"></i>
          <div>王者营地</div>
        </div>
        <div class="nav-item mb-3">
          <i class="sprite sprite-9"></i>
          <div>公众号</div>
        </div>
        <div class="nav-item mb-3">
          <i class="sprite sprite-10"></i>
          <div>版本介绍</div>
        </div>
      </div>
      <div class="bg-light py-2 fs-sm">
        <i class="sprite sprite-arrow mr-1"></i>
        <span>收回</span>
      </div>
    </div>
    <!-- end of nav icons -->

    <m-list-card title="新闻资讯" icon="menu" :categories="newsCats">
      <template v-slot:items="{category}">
        <router-link
        tag="div"
        :to="`articles/${news._id}`"
        class="py-2 fs-lg d-flex" 
        v-for="(news, index) in category.newsList" 
        :key="index">
          <span class="text-blue">[{{news.categoryName}}]</span>
          <span class="px-2">|</span>
          <span class="text-dark pr-2 flex-1">{{news.title}}</span>
          <span class="text-gray fs-sm">{{news.createdAt | date}}</span>
        </router-link>
      </template>
    </m-list-card>

    <m-list-card title="英雄列表" icon="toukui" :categories="heroCats">
      <template v-slot:items="{category}">
        <div class="d-flex flex-wrap" style="margin: 0 -0.5rem;">
          <router-link 
          tag="div"
          :to="`/heroes/${hero._id}`"
          class="p-2 text-center"
          style="width:20%;" 
          v-for="(hero, index) in category.heroList" 
          :key="index">
            <img :src="hero.avatar" class="w-100">
            <div>{{hero.name}}</div>
          </router-link>
        </div>
      </template>
    </m-list-card>
    

    <!-- <m-card title="精彩视频" icon="video">
      <div class="card-body pt-3">
        <div class="nav jc-between">
          <div class="nav-item active">
            <div class="nav-link">热门</div>
          </div>
          <div class="nav-item">
            <div class="nav-link">新闻</div>
          </div>
          <div class="nav-item">
            <div class="nav-link">公告</div>
          </div>
          <div class="nav-item">
            <div class="nav-link">活动</div>
          </div>
          <div class="nav-item">
            <div class="nav-link">赛事</div>
          </div>
        </div>
        <swiper>
          <swiper-slide v-for="n in 5" :key="n">
            <div class="mt-3 fs-xl" v-for="n in 5" :key="n">
              <span class="pr-2">[新闻]</span>
              <span class="pr-2">|</span>
              <span>助力世冠奖金池 领千万大回馈活动今日开启</span>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </m-card>
    <m-card title="图文攻略" icon="gonglve">
      <div class="card-body pt-3">
        <div class="nav jc-between">
          <div class="nav-item active">
            <div class="nav-link">热门</div>
          </div>
          <div class="nav-item">
            <div class="nav-link">新闻</div>
          </div>
          <div class="nav-item">
            <div class="nav-link">公告</div>
          </div>
          <div class="nav-item">
            <div class="nav-link">活动</div>
          </div>
          <div class="nav-item">
            <div class="nav-link">赛事</div>
          </div>
        </div>
        <swiper>
          <swiper-slide v-for="n in 5" :key="n">
            <div class="mt-3 fs-xl" v-for="n in 5" :key="n">
              <span class="pr-2">[新闻]</span>
              <span class="pr-2">|</span>
              <span>助力世冠奖金池 领千万大回馈活动今日开启</span>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </m-card> -->
  </div>
</template>

<script>
import dayjs from "dayjs";

export default {
  name: "home",
  data() {
    return {
      swiperOption: {
        pagination: {
          el: ".swiper-pagination"
        }
      },
      newsCats: [],
      heroCats: []
    };
  },
  methods: {
    async fetchNewsCats() {
      const res = await this.$axios.get("news/list");
      this.newsCats = res.data;
    },
    async fetchHeroCats() {
      const res = await this.$axios.get('heroes/list')
      this.heroCats = res.data;
    }
  },
  created() {
    this.fetchNewsCats();
    this.fetchHeroCats();
  },
  filters: {
    date(val) {
      return dayjs(val).format("MM/DD");
    }
  }
};
</script>

<style>
.swiper-pagination .swiper-pagination-bullet {
  opacity: 1;
  border-radius: 2px;
  background: #fff;
}

.swiper-pagination .swiper-pagination-bullet-active {
  background: #4b67af;
}
.nav-icons {
  border-top: 1px solid #d4d9de;
  border-bottom: 1px solid #d4d9de;
}

.nav-icons .nav-item {
  width: 25%;
  border-right: 1px solid #d4d9de;
  padding: 10.96px 0;
}

.nav-icons .nav-item:nth-child(4n) {
  border-right: none;
}
</style>
