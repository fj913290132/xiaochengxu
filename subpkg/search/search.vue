<template>
  <view>
    <view class="search-box">
      <!-- 使用 uni-ui 提供的搜索组件 -->
      <uni-search-bar @input="input" :radius="100" cancelButton="none"></uni-search-bar>
      <!-- 搜索建议列表-->
      <view class="sugg-list" v-if="searchResults.length!==0">
        <view class="sugg-item" v-for="(item,index) in searchResults" :key="index" @click="gotoDetail(item)">
          <view class="goods-name">{{item.goods_name}}</view>
          <uni-icons type="arrowright" size="16"></uni-icons>
        </view>
      </view>

      <!-- 搜索历史-->
      <view class="history-box" v-else>
        <!-- 标题-->
        <view class="history-title">
          <text>搜索历史</text>
          <uni-icons type="trash" size="17" @click="clean"></uni-icons>
        </view>
        <!-- 列表区域-->
        <view class="history-list">
          <uni-tag :text="item" v-for="(item,index) in historyes" :key="index" @click="gotoGoodsList(item)"></uni-tag>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    onLoad() {
    this.historyList = JSON.parse(uni.getStorageSync('kw') || '[]')  
    },
    data() {
      return {
        // 延时器的 timerId
        timer: null,
        // 搜索关键词
        kw: '',
        // 搜索结果列表
        searchResults: [],
        // 搜索关键词的历史记录
        historyList: []
      };
    },
    methods: {
      input(e) {
        // 清除 timer 对应的延时器
        clearTimeout(this.timer)
        // 重新启动一个延时器，并把 timerId 赋值给 this.timer
        this.timer = setTimeout(() => {
          // 如果 500 毫秒内，没有触发新的输入事件，则为搜索关键词赋值
          this.kw = e
          // 根据关键词，查询搜索建议列表
          this.getSearchList()
        }, 500)
      },
      // 根据搜索关键词，搜索商品建议列表
      async getSearchList() {
        // 判断关键词是否为空
        if (this.kw === '') {
          this.searchResults = []
          return
        }
        // 发起请求，获取搜索建议列表
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/goods/qsearch', {
          query: this.kw
        })
        if (res.meta.status !== 200) return uni.$showMsg()
        this.searchResults = res.message
        // 查询到搜索建议之后，调用 saveSearchHistory() 方法保存搜索关键词
        this.saveSearchHistory()
      },
      gotoDetail(obj) {
        uni.navigateTo({
          url: '/subpkg/goods_detail/goods_detail?goods_id=' + obj.goods_id
        })
      },
      saveSearchHistory() {
        //this.historyList.push(this.kw)
        // 1. 将 Array 数组转化为 Set 对象
        const set = new Set(this.historyList)
        // 2. 调用 Set 对象的 delete 方法，移除对应的元素
        set.delete(this.kw)
        // 3. 调用 Set 对象的 add 方法，向 Set 中添加元素
        set.add(this.kw)
        // 4. 将 Set 对象转化为 Array 数组
        this.historyList = Array.from(set)
        // 调用 uni.setStorageSync(key, value) 将搜索历史记录持久化存储到本地
        uni.setStorageSync('kw', JSON.stringify(this.historyList))
      },
      clean(){
        this.historyList=[]
        uni.setStorageSync('kw','[]')
      },
      gotoGoodsList(item){
        uni.navigateTo({
          url:'/subpkg/goods_list/goods_list?query='+item
        })
      }
    },
    computed: {
      historyes() {
        return [...this.historyList].reverse()
      }
    }
  }
</script>

<style lang="scss">
  .search-box {
    position: sticky;
    top: 0;
    z-index: 999;
  }

  .uni-searchbar {
    /* #ifndef APP-NVUE */
    display: flex;
    /* #endif */
    flex-direction: row;
    position: relative;
    padding: 16rpx;
    /* 将默认的 #FFFFFF 改为 #C00000 */
    background-color: #c00000;
  }

  .sugg-list {
    padding: 0 5px;

    .sugg-item {
      font-size: 12px;
      padding: 13px 0;
      border-bottom: 1px solid #efefef;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .goods-name {
        // 文字不允许换行（单行文本）
        white-space: nowrap;
        // 溢出部分隐藏
        overflow: hidden;
        // 文本溢出后，使用 ... 代替
        text-overflow: ellipsis;
        margin-right: 3px;
      }
    }
  }

  .history-box {
    padding: 0 10px;

    .history-title {
      display: flex;
      justify-content: space-between;
      height: 40px;
      align-items: center;
      font-size: 13px;
      border-bottom: 1px solid #efefef;
    }

    .history-list {
      display: flex;
      flex-wrap: wrap;

      .uni-tag {
        margin: 5px 5px 0 0;
        background-color: #fff;
        color: black;
      }
    }
  }
</style>
