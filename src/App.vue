<template>
  <div id="app"> 
    <site-nav v-if="showNav"></site-nav> 
    <router-view/>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import SiteNav from '@/components/SiteNav';
export default {
  components: { SiteNav },
  computed: {
    ...mapState(['userProfile']),
    showNav() {
      console.log(Object.keys(this.userProfile));
      return Object.keys(this.userProfile).length > 1;
    }
  }
  
}
</script>
<style lang="scss">

</style>
