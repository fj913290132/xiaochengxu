<template>
  <view class="my-search-container" :style="{'background-color':bgcolor}">
    <view class="my-search-box" :style="{'border-radius':radius+'px'}" @click="searchBoxHandler">
    <!-- 使用uni-ui提供的图标组件-->
    <uni-icons type="search" size="17"></uni-icons>
    <text class="placeholder">搜索</text>
    </view>
  </view>
</template>

<script>
  export default {
    name:"my-search",
    props:{
      bgcolor:{
        type:String,
        default:()=>'#c00000'
      },
      radius:{
        type:Number,
        default:()=>18
      }
    },
    data() {
      return {
        
      };
    },
    methods:{
      searchBoxHandler(){
        this.$emit('click')
      }
    }
  }
</script>

<style lang="scss">
.my-search-container{
  height: 36px;
  /* background-color: #C00000; */
  display: flex;
  align-items: center;
  padding: 0 20px;
  .my-search-box{
    height: 30px;
    background-color: white;
    /* border-radius: 18px; */
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .placeholder{
      font-size: 15px;
      margin-left: 10px;
    }
  }
}
</style>