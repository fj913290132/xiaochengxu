<template>
  <view class="cart-container" v-if="cart.length !== 0">
    <!-- 收货地址组件-->
    <my-address></my-address>
    <!-- 商品列表的标题区域-->
    <view class="cart-title">
      <!-- 左侧图标-->
      <uni-icons type="shop" size="18"></uni-icons>
      <!-- 右侧的文本-->
      <text class="cart-title-text">购物车</text>
    </view>
    <!-- 循环渲染购物车中的商品信息-->
    <uni-swipe-action>
      <block v-for="(item,index) in cart" :key="index">
      <uni-swipe-action-item :right-options="options" @click="swipeItemClickHandler(item)">
        <my-goods :item="item" :showRadio="true" @radio-change="radioChangeHandler" :showNum="true" @num-change="numberChangeHandler"></my-goods>
      </uni-swipe-action-item>
      </block>
    </uni-swipe-action>
    
    <!-- 自定义组件结算组件-->
    <my-settle></my-settle>
  </view>
<!-- 空包购物车的区域-->
    <view class="empty-cary" v-else>
      <image src="/static/cart_empty@2x.png" class="empty-image" mode=""></image>
      <text class="empty-text">空空如也</text>
    </view>
</template>

<script>
  import badgeMix from '../../mixins/tabbar-badge.js'
  import { mapState, mapMutations } from 'vuex'
  export default {
    computed:{
      ...mapState('m_cart',['cart'])
    },
    mixins:[badgeMix],
    data() {
      return {
        options:[{
          text:'删除',
          style:{
            backgroundColor:'#C00000'
          }
        }]
      };
    },
   methods:{
     ...mapMutations('m_cart', ['updateGoodsState']),
     radioChangeHandler(e){
       this.$store.commit('m_cart/updateGoodsState',e)
        //this.updateGoodsState(e) //不太喜欢这种方法
     },
     numberChangeHandler(e) {
       this.$store.commit('m_cart/uddateGoodsCount',e)
     },
     swipeItemClickHandler(goods){
       this.$store.commit('m_cart/removeGoodsById',goods.goods_id)
     }
   }
    
  }
</script>

<style lang="scss">
.cart-title{
  height: 40px;
  display: flex;
  align-items: center;
  padding-left: 10px;
  border-bottom: 1px solid #efefef;
  .cart-title-text{
    font-size: 14px;
    margin-left: 10px;
  }
}
.cart-container{
  padding-bottom: 50px;
}
.empty-cary{
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 150px;
  .empty-image{
    display: block;
    height: 90px;
    width: 90px;
  }
  .empty-text{
  margin-top: 20px;
  font-size: 12px;
  }
}
</style>
