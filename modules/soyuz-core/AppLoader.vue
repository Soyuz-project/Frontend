<template>   
    <label for="file" class="-b -b-light-gray -pad-s -hvr-invert">
      <span>Load App</span>
      <input id="file" @change="processFile($event)" type="file" class="file" />
      <div v-if="error" class="-color-error">{{ error }}</div>
    </label> 
</template>

<script>
/*
  TODO 
  Switched upload to add code as app or plugin
  Thinkabout namespaces for pages slugs (plugins problem)
*/
import { S, store } from '~/plugins/soyuz-store-api';
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
      error: false,
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
 
        /* Set events */
        if(data.events.length){
          console.log('ev', data.events)
        }

        /* Set pages */
        if(data.pages.length){
          try {
            data.pages.map((load_page)=>{
              S.push({source:'pages', query_variables:{slug:load_page.slug}, value:load_page})
            })
           } catch (error) {}
        }

        /* Set blocks */
        if(data.blocks.length){
          console.log('b', data.blocks)
        }

        /* Set app */
        const app = {name:data.name, slug:data.slug, version:data.version, dependencies: data.dependencies}
        S.push({source:'apps', query_variables:{slug:app.slug}, value:app})



        window.localStorage.setItem(`soyuz_pages`, JSON.stringify(S.get({source:'pages'})));
        window.localStorage.setItem(`soyuz_apps`, JSON.stringify(S.get({source:'apps'})));


        // window.localStorage.setItem(`soyuz_events`, JSON.stringify(data.events));
        window.location.replace('/');
        
      } catch (err) {
        console.log(err)
        /* show message */
        this.error = 'Script fromat error. Please load atother file';
        this.fileinput = Object.assign({});
      }
    },
  },
};
</script>
