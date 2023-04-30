<template>
  <div style="display: flex; flex-direction: column; gap: 2em; flex-wrap: 0; align-items: center;">
    <h1>Welcome to HackSpace</h1>
    <router-link to="/events" class="link">
      Browse Events
    </router-link>
    <router-link to="/organize" class="link">
      Become an Organizer
    </router-link>
    <a v-if="notConnected" @click="connectWallet" class="link">Connect to Wallet</a>
  </div>
</template>

<script>
import { connect, isConnected } from '@/SCinteraction.js';

export default {
  name: 'Home',
  data() {
    return {
      notConnected: false
    }
  },
  async created() {
    this.notConnected = !(await isConnected());
  },
  methods: {
    async connectWallet() {
      await connect();
      this.notConnected = !(await isConnected());
    }
  }
}
</script>
