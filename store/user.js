export default{
  //开启命名空间
  namespaced:true,
  state:()=>({
    address:JSON.parse(uni.getStorageSync('address') || '{}'),
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