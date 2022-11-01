export default{
  //开启命名空间
  namespaced:true,
  state:()=>({
    address:JSON.parse(uni.getStorageSync('address') || '{}'),
    token:uni.getStorageSync('token')||'',
    userInfo:JSON.parse(uni.getStorageSync('userInfo') || '{}'),
    // 重定向的 object 对象 { openType, from }
      redirectInfo: null
  }),
  //方法
  mutations:{
    updateAddress(state,address){
      //更新收货地址
      state.address=address
      this.commit('m_user/saveTostorage')
    },
    saveTostorage(state){
      uni.setStorageSync('address',JSON.stringify(state.address))
    },
    updateUserInfo(state,userInfo){
      state.userInfo=userInfo
      this.commit('m_user/saveUserInfoToStorage')
    },
    saveUserInfoToStorage(state){
      uni.setStorageSync('userInfo',JSON.stringify(state.userInfo))
    },
    undateToken(state,token){
      state.token=token
      this.commit('m_user/saveTokenToStorage')
    },
   // 将 token 字符串持久化存储到本地
     saveTokenToStorage(state) {
       uni.setStorageSync('token', state.token)
     },
      // 更新重定向的信息对象
       updateRedirectInfo(state, info) {
         state.redirectInfo = info
       }
  },
  
  getters:{
    // 收货详细地址的计算属性
    addstr(state) {
      if (!state.address.provinceName) return ''
    
      // 拼接 省，市，区，详细地址 的字符串并返回给用户
      return state.address.provinceName + state.address.cityName + state.address.countyName + state.address.detailInfo
    }
  }
}