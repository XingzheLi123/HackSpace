<template>
  <form @submit="addEventSubmit">
    <div>
      <label for="event-name">Event Name:</label>
      <input v-model="eventName" type="text" id="event-name" required autocomplete="0" autofocus>
    </div>
  </form>
</template>

<script>
import { addEvent } from '@/SCinteraction.js'

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
      await addEvent(name);
      // TODO route
    }
  }
}
</script>
