<template>
  <div style="margin: 3em">
    <h1>Hosted Events</h1>
    <div>
      <div v-for="i in numEvents">
        <router-link :to="{ name: 'Event', params: { id: i - 1 } }">Event {{ i - 1 }}</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { view_num_of_events } from '@/SCinteraction.js'

export default {
  name: 'Events',
  data() {
    return {
      numEvents: 0
    }
  },
  async created() {
    this.numEvents = (await view_num_of_events()).toNumber();
    console.log('number of events', this.numEvents)
  }
}
</script>
