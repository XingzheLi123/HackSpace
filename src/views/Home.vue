<template>
  <div style="display: flex; flex-direction: column; gap: 2em; flex-wrap: 0; align-items: center;">
    <h1>Welcome to HackSpace</h1>
    <router-link to="/events" class="link">
      Browse Events
    </router-link>
    <!-- <router-link to="/organize" class="link"> -->
    <a @click="modalActive = true" class="link">
      Become an Organizer
    </a>
    <!-- </router-link> -->
    <a v-if="notConnected" @click="connectWallet" class="link">Connect to Wallet</a>

    <Modal title="Organize an Event" :fields="['Event name']" :action="organizeAction" v-model:active="modalActive"></Modal>
  </div>
</template>

<script>
import { connect, isConnected } from '@/SCinteraction.js';
import { addEvent, view_num_of_events } from '@/SCinteraction.js'
import Modal from '@/components/Modal.vue';

export default {
  name: 'Home',
  components: {
    Modal,
  },
  data() {
    return {
      notConnected: false,
      modalActive: false
    }
  },
  async created() {
    this.notConnected = !(await isConnected());
  },
  methods: {
    async connectWallet() {
      await connect();
      this.notConnected = !(await isConnected());
    },
    async organizeAction(eventName) {
      const numEvents = (await view_num_of_events()).toNumber();
      await addEvent(eventName);
      // this.$router.push({ name: 'Event', params: { id: numEvents + 1 } });
      this.$router.push('/events');
    }
  }
}
</script>
