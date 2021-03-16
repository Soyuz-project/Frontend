<template>
  <div>
  	<DataFrame 
      :blockAttrs="{tagName:'header', className:'header'}" 
      :urlQuery="{query:$route.query, params:{slug:'header'}}">    
    </DataFrame>
    <Nuxt />
  	<DataFrame 
      :blockAttrs="{className:'footer'}" 
      :urlQuery="{query:$route.query, params:{slug:'footer'}}">    
    </DataFrame>
    <DataFrame 
      :blockAttrs="{
        className:'right-panel'
      }" 
      :urlQuery="{query:$route.query, params:{slug:'right-panel'}}">    
    </DataFrame>
    <AppLoader v-if="!register_events" />
  </div>
</template>
<script>
	export default {
  	name: 'Layout',
  	components: {
			DataFrame: () => import('~/modules/soyuz-core/DataFrame.js'),
      AppLoader: () => import('~/modules/soyuz-core/AppLoader'),
		},
    computed: {
      register_events() {
        try {
          return window.localStorage.getItem("sojuz_register_events") || false
        } catch (error) {}
      },
    },
  }
</script>

