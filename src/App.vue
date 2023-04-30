<template>
  <NavBar />
  <router-view />
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import { connect, isConnected } from '@/SCinteraction.js';

export default {
  name: 'App', 
  components: {
    NavBar
  },
  async created() {
    if (await isConnected()) await connect();
  }
}
</script>
