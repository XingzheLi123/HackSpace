<template>
  <div style="">
    <form @submit="submit">
      <h4>{{ title }}</h4>
      <input v-for="field in fields" type="text" required autocomplete="off" :placeholder="field">
      <input type="submit">
    </form>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    title: String,
    fields: Array,
    action: Function
  },
  methods: {
    async submit() {
      await this.action();
    }
  }
}
</script>
