<template>
  <view>
    <view class="goods-item">
      <!-- 左侧盒子-->
      <view class="goods-item-left">
        <image :src="item.goods_small_logo || defaultPic" class="goods_pic" mode=""></image>
      </view>
      <!-- 右侧盒子-->
      <view class="goods-item-right">
        <!-- 商品名字-->
        <view class="goods-name">{{item.goods_name}}</view>
        <!-- 价格-->
        <view class="goods-info-box">
          <view class="goods-price">￥{{item.goods_price | tofixed}}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name:"my-goods",
    props:{
     item:{
       type:Object,
       default:{}
     } 
    },
    data() {
      return {
        // 默认的空图片
        defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
      };
    },
    filters:{
      tofixed(num){
        return Number(num).toFixed(2)
      }
    }
  }
</script>

<style lang="scss">
.goods-item{
  display: flex;
  padding: 10px 5px;
  border-bottom: 1px solid #f0f0f0;
  .goods-item-left{
    margin-right: 10px;
    .goods_pic{
      width: 100px;
      height: 100px;
      display: block;
    }
  }
  .goods-item-right{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .goods-name{
      font-size: 13px;
    }
    .goods-info-box{
      .goods-price{
        font-size: 16px;
        color: #c00000;
      }
    }
  }
}
</style>