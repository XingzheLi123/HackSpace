<template>
  <div v-if="active" @click="deactivate" @blur="deactivate"
    style="position: fixed; inset: 0; background: #0003; display: flex; align-items: center; justify-content: center;">
    <div @click="e => e.stopPropagation()" style="background: white; padding: 2em">
      <form @submit="submit">
        <h4 style="margin: 0 0 1em 0">{{ title }}</h4>
        <p v-for="input in inputs" style="margin-bottom: 1em">
          <input v-model="input.value" type="text" required autocomplete="off" :placeholder="input.name">
        </p>
        <input type="submit">
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    title: String,
    fields: Array,
    action: Function,
    active: Boolean
  },
  emits: ['update:active'],
  data() {
    return {
      inputs: this.fields.map(field => ({ name: field, value: undefined }))
    }
  },
  methods: {
    async submit(e) {
      e.preventDefault();
      console.log(this.inputs)
      const values = this.inputs.map(({ value: value }) => value);
      console.log('values',values)
      await this.action(...values);
      this.deactivate();
    },
    deactivate() {
      this.$emit('update:active', false);
      console.log('deactivated');
    }
  }
}
</script>
