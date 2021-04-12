<template>
  <div  class="app-layout">
  	<DataFrame
      :blockAttrs="{event: 'load-header', tagName:'header'}" 
      :urlQuery="{query:$route.query, params:{ slug:'header' }}"
    />    
    <Nuxt/>
  	<DataFrame
      :blockAttrs="{event: 'load-footer'}" 
      :urlQuery="{query:$route.query, params:{ slug:'footer' }}"
    />    
  </div>
</template>
<script>
  import { default_app } from '~/default-soyuz-app';
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
      if(!local_get({source:'events'})){
        const areas = Object.keys(default_app).forEach((el, i)=>{
          local_set({source:el, value: default_app[el]})             
          i == 2 ? location.reload() : null
        })
      }
    }
  }
</script>

