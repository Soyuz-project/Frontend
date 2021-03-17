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
    <AppLoader  />
    <Targeter/>
  </div>
</template>
<script>
  import { S, store } from '~/plugins/soyuz-store-api';
	export default {
  	name: 'Layout',
  	components: {
			DataFrame: () => import('~/modules/soyuz-core/DataFrame.js'),
      AppLoader: () => import('~/modules/soyuz-core/AppLoader'),
      Targeter: () => import('~/modules/soyuz-core/Targeter.js'),
		},
    created: function () {
      /* MOCKUP MODE, TODO - do plugable */
      try {
        return S.set({ source: 'events', value: JSON.parse(window.localStorage.getItem("soyuz_events")) });
      } catch (error) {}
    }
  }
</script>

