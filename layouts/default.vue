<template>
  <div class="app-layout">
  	<DataFrame 
      :blockAttrs="{tagName:'header'}" 
      :urlQuery="{query:$route.query, params:{slug:'header'}}">    
    </DataFrame>
    <Nuxt />
  	<DataFrame 
      :blockAttrs="{}" 
      :urlQuery="{query:$route.query, params:{slug:'footer'}}">    
    </DataFrame>
  </div>
</template>
<script>
  import { S, store } from '~/plugins/soyuz-store-api';
  import {default_app_pages, default_app_events} from '~/default-soyuz-app';
	export default {
  	name: 'Layout',
  	components: {
			DataFrame: () => import('~/modules/soyuz-core/DataFrame.js'),
		},
    created: function () {
      /* MOCKUP MODE, Initial data */
      try {

        /* check default events or register stored events */
        const ev = JSON.parse(window.localStorage.getItem("soyuz_events"))
        if(ev){
          return S.set({ source: 'events', value: ev });
        }else{
          window.localStorage.setItem("soyuz_events", JSON.stringify(default_app_events))
          location.reload();
        }

        /* check default pages */
        const pg = JSON.parse(window.localStorage.getItem("soyuz_pages"))
        if(!pg){
          window.localStorage.setItem("soyuz_pages", JSON.stringify(default_app_pages))

        }
        
      } catch (error) {}
    }
  }
</script>

