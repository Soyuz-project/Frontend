<template>
  <div  class="app-layout">
  	<DataFrame
      :blockAttrs="{tagName:'header'}" 
      :urlQuery="{query:$route.query, params:{slug:'header'}}"
    />    
    <Nuxt/>
  	<DataFrame
      :blockAttrs="{}" 
      :urlQuery="{query:$route.query, params:{slug:'footer'}}"
    />    
  </div>
</template>
<script>
  import { default_app_pages, default_app_events } from '~/default-soyuz-app';
  import { local_get, local_set } from '~/plugins/soyuz-resolver';
	export default {
  	name: 'Layout',
  	components: {
			DataFrame: () => import('~/modules/soyuz-core/DataFrame.js'),
		},
    mounted: function () {
      /* 
        MOCKUP MODE, Initial data 
      */
      let counter = 0
      /* check default events or register stored events */ 
      if(!local_get({source:"events"})){
        local_set({source:"events", value: default_app_events})
        counter++;
      }
      /* check default pages */
      if(!local_get({source:"pages"})){
        local_set({source:"pages", value: default_app_pages})
        counter++;
      }
      if(counter == 2){
        location.reload()
      }
    }
  }
</script>

