<template>
  <nav style="display: flex; align-items: center; width: 100%; padding: 1em 2em; gap: 2em; background: #eee">
    <h1 style="margin: 0; flex-grow: 1" class="mono">HackSpace</h1>
    <router-link to="/" class="link">Home</router-link>
    <router-link to="/events" class="link">Events</router-link>
  </nav>
</template>

<script>
export default {
  name: 'NavBar'
}
</script>
