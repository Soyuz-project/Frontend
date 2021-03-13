<template>
  <div :class="[blockAttrs.className]">
    <form id="jsonFile" name="jsonFile" enctype="multipart/form-data" method="post">
      <label>loadfile</label>
      <input @change="processFile($event)" type="file" />
      <div v-if="message" class="field-message">{{ message }}</div>
    </form>
  </div>
</template>

<script>
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
      fileinput: {},
      message: false,
    };
  },
  methods: {
    processFile(event) {
      let file = event.target.files[0];
      const fr = new FileReader();
      fr.onload = this.receivedText;
      fr.readAsText(file);
      let ref_message = this.message;
    },
    receivedText(e) {
      let lines = e.target.result;
      try {
        var data = JSON.parse(lines);
        console.log('recive', data.pages);
        window.localStorage.setItem(`sojuz_pages`, JSON.stringify(data.pages));
      } catch (err) {
        /* show message */
        this.message = 'Script fromat error. Please load atother file';
      }
    },
  },
};
</script>
