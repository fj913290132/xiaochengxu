<template>
  <view>
    <!-- 搜索组件-->
    <view class="search-box">
      <my-search @click="gotoSearch"></my-search>
    </view>
    <!-- 轮播图的区域-->
    <swiper :indicator-dots="true" indicator-color="white" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
      <swiper-item v-for="(item,index) in swiperList" :key="index">
        <navigator class="swiper-item" :url="`/subpkg/goods_detail/goods_detail?goods_id=${item.goods_id}`">
          <image :src="item.image_src" ></image>
        </navigator>
      </swiper-item>
    </swiper>
    <!-- 分类导航区域-->
    <view class="nav-list">
      <view class="nav-item" v-for="(item,index) in navList" :key="index" @click="navClickHandler(item)">
        <image :src="item.image_src" ></image>
      </view>
    </view>
    <!-- 楼层区域-->
    <!-- 楼层容器-->
    <view class="floor-list">
      <!-- 每一个楼层的item项-->
      <view class="floor-item" v-for="(item,index) in floorList" :key="index">
        <image :src="item.floor_title.image_src" class="floor-title"></image>
        <!-- 楼层图片区域-->
        <view class="floor-img-box">
          <!-- 左侧-->
          <navigator class="left-img-box" :url="item.product_list[0].url">
            <image :src="item.product_list[0].image_src" :style="{width:item.product_list[0].image_width + 'rpx'}" mode="widthFix"></image>
          </navigator>
          <!-- 右侧-->
          <view class="right-img-box">
            <navigator class="right-img-item" v-for="(item2,index2) in item.product_list" :key="index2" v-if="index2 !== 0" :url="item2.url">
              <image  :src="item2.image_src" :style="{width:item2.image_width + 'rpx'}" mode="widthFix"></image>
              </navigator>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        //轮播图数据列表
        swiperList:[],
        navList:[],  //分类导航数据列表
        floorList:[] //楼层数据列表
      };
    },
    onLoad() {
      this.getSwiperList()
      this.getNavList()
      this.getFioorList()
    },
    methods:{
      async getSwiperList(){
      const {data:res} = await uni.$http.get('/api/public/v1/home/swiperdata')
        //console.log(res);
        if(res.meta.status !== 200){
          /* return uni.showToast({
            title:'数据请求失败',
            duration:1500,
            icon:none
          }) */
          return uni.$showMsg()
        }
        this.swiperList=res.message
      },
      async getNavList(){
        const {data:res} = await uni.$http.get('/api/public/v1/home/catitems')
        if(res.meta.status !==200) return uni.$showMsg()
        this.navList = res.message
      },
      navClickHandler(obj){
        if(obj.name==='分类'){
          uni.switchTab({
            url:'/pages/cate/cate'
          })
        }
      },
      //获取楼层数据
      async getFioorList(){
        const {data:res} = await uni.$http.get('/api/public/v1/home/floordata')
        if(res.meta.status !==200) return uni.$showMsg()
        //处理数据
        res.message.forEach(floor=>{
          floor.product_list.forEach(prod=>{
            prod.url='/subpkg/goods_list/goods_list?'+prod.navigator_url.split('?')[1]
          })
        })
        this.floorList=res.message
      },
      gotoSearch(){
        uni.navigateTo({
          url:'/subpkg/search/search'
        })
      }
    }
  }
</script>

<style lang="scss">
swiper{
  height: 330rpx;
  .swiper-item,image{
    width: 100%;
    height: 100%;
  }
}
.nav-list{
  display: flex;
  justify-content: space-around;
  margin: 15rpx 0;
  image{
      width: 128rpx;
      height: 140rpx;
  }
}
.floor-title{
  width: 100%;
  height: 140rpx;
}
.right-img-box{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.floor-img-box{
  display: flex;
  padding-left: 10rpx;
}
.search-box{
  position: sticky;
  top: 0;
  z-index: 999;
}
</style>
