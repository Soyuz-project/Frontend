<template>
  
    
    <label for="file" class="-b -b-light-gray -pad-s -hvr-invert">
      <span>Load App</span>
      <input id="file" @change="processFile($event)" type="file" class="file" />
      <div v-if="message" class="field-message">{{ message }}</div>
    </label>
   
  
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
      let ref_message = e.target.result;
      try {
        var data = JSON.parse(lines);
        window.localStorage.setItem(`soyuz_pages`, JSON.stringify(data.pages));
        window.localStorage.setItem(`soyuz_events`, JSON.stringify(data.events));
        window.location.replace('/');
      } catch (err) {
        console.log(err)
        /* show message */
        this.message = 'Script fromat error. Please load atother file';
        this.fileinput = Object.assign({});
      }
    },
  },
};
</script>
