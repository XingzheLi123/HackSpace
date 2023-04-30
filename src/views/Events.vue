<template>
  <div style="margin: 3em">
    <h1>Hosted Events</h1>
    <div style="display: flex; flex-direction: column; flex-wrap: 0">
      <router-link v-for="event in events" :to="{ name: 'Event', params: { id: event.id.toNumber() } }">
        <div class="card card-hover">
          <span class="index">#{{ event.id.toNumber() }}</span>
          <span>{{ event.name }}</span>
        </div>
      </router-link>
      <div v-if="loading" class="loading"></div>
    </div>
  </div>
</template>

<script>
import { view_num_of_events, view_event } from '@/SCinteraction.js'

export default {
  name: 'Events',
  data() {
    return {
      events: [],
      loading: true
    }
  },
  async created() {
    const numEvents = (await view_num_of_events()).toNumber();
    console.log('number of events', numEvents);

    this.events.length = 0;
    for (let i = 1; i <= numEvents; i++) {
      const event = await view_event(i);
      console.log(event);
      this.events.push(event);
    }

    this.loading = false;
  }
}
</script>
