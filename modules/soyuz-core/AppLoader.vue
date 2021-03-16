<template>
  <div>
    <hr>
    <div>Soyuz app loader (JSON app file)</div>
    <form id="jsonFile" name="jsonFile" enctype="multipart/form-data" method="post">
      <input @change="processFile($event)" type="file" />
      <div v-if="message" class="field-message">{{ message }}</div>
    </form>
  </div>
</template>

<script>
/*
  TODO 
  Switched upload to add code as app or plugin
  Thinkabout namespaces for pages slugs (plugins problem)
*/
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
        window.localStorage.setItem(`soyuz_pages`, JSON.stringify(data.pages));
        window.localStorage.setItem(`soyuz_events`, JSON.stringify(data.events));
      } catch (err) {
        /* show message */
        this.message = 'Script fromat error. Please load atother file';
      }
    },
  },
};
</script>
