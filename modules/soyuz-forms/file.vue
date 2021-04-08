<template>
  <div :class="[blockAttrs.className]">
      <input id="file" @change="processFile($event)" type="file" class="file" />
      <label for="file">{{content}}</label>
      <div v-if="message" class="field-message">{{ message }}</div>
  </div>
</template>

<script>
import { action, getClick } from '~/plugins/soyuz-targeter';
export default {
  name: 'Input',
  props: {
    blockAttrs: {
      type: Object,
      default: () => ({}),
    },
  },
  data: function() {
    return {
      content: this.blockAttrs.content || "Load File",
      fileinput: {},
      message: false,
    };
  },
  methods: {
    processFile(event) {
      const fr = new FileReader();
      fr.onload = this.receivedText;
      fr.readAsText(event.target.files[0]);
      let ref_message = this.message;
    },
    receivedText(e) {
      let lines = e.target.result;
      try {
        this.blockAttrs.data = JSON.parse(lines)
        this.blockAttrs.actions ?  action(e, this.blockAttrs) : null
      } catch (err) {
        /* show message */
        console.log(err)
        this.message = 'Script fromat error. Please load atother file';
      }
    },
  },
};
</script>
