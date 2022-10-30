<template>
  <view>
    <view class="scroll-view-container">
      <!-- 左侧滑动区域-->
      <scroll-view scroll-y="true" :style="{height: wh+'px'}" class="left-scroll-view">
        <biock v-for="(item,index) in cateList" :key="index">
          <view :class="['left-scroll-view-item',index===active?'active':'']" @click="activeChanged(index)">{{item.cat_name}}
          </view>
        </biock>
      </scroll-view>
      <!-- 右侧滑动区域-->
      <scroll-view scroll-y="true" :style="{height: wh+'px'}" :scroll-top="scrollTop">
        <view class="cate-lv2" v-for="(item2,index2) in cateLevel2" :key="index2">
          <!-- 二级分类标题-->
          <view class="cate-lv2-title">/ {{item2.cat_name}} /</view>
          <!-- 二级分类下的三级分类列表-->
          <view class="cate-lv-list">
            <!-- 三级分类item项-->
            <view class="cate-lv3-item" v-for="(item3,index3) in item2.children" :key="index3" @click="gotoGoodsList(item3)" >
              <!-- 三级分类图片那  -->
              <image :src="item3.cat_icon" mode=""></image>
              <!-- 三级分类文本-->
              <text>{{item3.cat_name}}</text>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        wh:0, // 当前设备可用高度
        cateList:[], //
        active:0,
        cateLevel2:[],//二级分类
        scrollTop:0
      };
    },
    onLoad() {
      const sysInfo=uni.getSystemInfoSync()
      this.wh=sysInfo.windowHeight
      this.getCateList()
    },
    methods:{
      //获取分类列表数据
      async getCateList(){
        const {data:res} = await uni.$http.get('/api/public/v1/categories')
        if(res.meta.status!==200) return uni.$showMsg()
        this.cateList=res.message //一级分类
        //二级分类
        this.cateLevel2=res.message[0].children
      },
      activeChanged(index){
        this.active=index
        this.cateLevel2=this.cateList[index].children
        this.scrollTop=this.scrollTop===1?0:1
      },
      //跳转到商品列表页面
      gotoGoodsList(obj){
        uni.navigateTo({
          url:'/subpkg/goods_list/goods_list?cid='+obj.cat_id
        })
      }
    }
  }
</script>

<style lang="scss">
.scroll-view-container{
  display: flex;
}
.left-scroll-view{
  width: 120px;
}
.left-scroll-view-item{
  background-color: #f7f7f7;
  line-height: 60px;
  text-align: center;
  font-size: 12px;
  &.active{
    background-color: #ffffff;
    position: relative;
     &::before{
       content: '';
       display: block;
       width: 3px;
       height: 30px;
       background-color: red;
       position: absolute;
       top: 50%;
       left: 0;
       transform: translateY(-50%);
     }
  }
}
.cate-lv2-title{
  font-size: 12px;
  font-weight: bold;
  text-align: center;
  padding: 15px 0;
}
.cate-lv-list{
  display: flex;
  flex-wrap: wrap;
  .cate-lv3-item{
    width: 33.33%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
    image{
      width: 60px;
      height: 60px;
    }
    text{
      font-size: 12px;
    }
  }
}
</style>
