<template>
  <view>
    <view class="goods-list">
      <view v-for="(item,index) in goodsList" :key="index" @click="gotoDetail(item)">
        <my-goods :item='item'></my-goods>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        //请求参数对象
        queryObj: {
          // 查询关键词
          query: '',
          // 商品分类Id
          cid: '',
          // 页码值
          pagenum: 1,
          // 每页显示多少条数据
          pagesize: 10
        },
        // 商品列表的数据
        goodsList: [],
        // 总数量，用来实现分页
        total: 0,
        //节流阀
        isloading:false
      };
    },
    onLoad(option) {
      //console.log(option);
      this.queryObj.query = option.query || ''
      this.queryObj.cid = option.cid || ''
      this.getGoodsList()
    },
    methods: {
      async getGoodsList(cb) {
        this.isloading=true
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/goods/search', this.queryObj)
        this.isloading=false
        cb&&cb()
        if (res.meta.status !== 200) return uni.$showMsg()
        this.goodsList = [...this.goodsList,...res.message.goods]
        this.total = res.message.total
      },
      onReachBottom(){
        if(this.isloading) return
        if(this.total===this.goodsList.length) return
        this.queryObj.pagenum=this.queryObj.pagenum + 1
        this.getGoodsList()
      },
      onPullDownRefresh(){
        //上拉刷新事件，重置关键数据
        this.queryObj.pagenum=1
        this.total=0
        this.isloading=false
        this.goodsList=[]
        //重新调接口
        this.getGoodsList(()=>uni.stopPullDownRefresh())
      },
      gotoDetail(obj){
        uni.navigateTo({
          url:'/subpkg/goods_detail/goods_detail?goods_id='+obj.goods_id
        })
      }
    }
  }
</script>

<style lang="scss">

</style>
