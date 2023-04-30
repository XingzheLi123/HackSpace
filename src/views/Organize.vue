<template>
  <div style="margin: 3em">
    <h1>Organize an Event</h1>
    <form @submit="addEventSubmit">
      <div>
        <label for="event-name">Event name: </label>
        <input v-model="eventName" type="text" id="event-name" required autocomplete="off" autofocus>
      </div>
    </form>
  </div>
</template>

<script>
import { addEvent, view_num_of_events } from '@/SCinteraction.js'

export default {
  name: 'Organize',
  data() {
    return {
      eventName: '',
    }
  },
  methods: {
    async addEventSubmit(e) {
      e.preventDefault();
      const name = this.eventName;
      const numEvents = (await view_num_of_events()).toNumber();
      await addEvent(name);
      this.$router.push({ name: 'Event', params: { id: numEvents + 1 } });
    }
  }
}
</script>
