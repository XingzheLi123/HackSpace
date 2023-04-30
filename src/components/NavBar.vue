<template>
  <nav style="display: flex; align-items: center; width: 100%; padding: 1em 2em; gap: 2em; background: #eee">
    <!-- <h1 style="margin: 0; flex-grow: 1" class="mono">HackSpace</h1> -->
    <div style="margin: 0; flex-grow: 1">
      <img style="max-height: 1.5em" :src="image">
    </div>
    <router-link to="/" class="link">Home</router-link>
    <router-link to="/events" class="link">Events</router-link>
  </nav>
</template>

<script>
import image from '@/assets/logo.jpg';

export default {
  name: 'NavBar',
  data() {
    return {
      image
    }
  }
}
</script>
