<template>
  <view>
    <my-login v-if="!token"></my-login>
    <my-userinfo v-else></my-userinfo>
  </view>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    computed:{
      ...mapState('m_user',['token'])
    },
    data() {
      return {
        
      };
    }
  }
</script>

<style lang="scss">

</style>
