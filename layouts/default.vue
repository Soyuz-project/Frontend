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
    <AppLoader/>
  </div>
</template>
<script>
	export default {
  	name: 'Layout',
  	components: {
			DataFrame: () => import('~/modules/soyuz-core/DataFrame.js'),
      AppLoader: () => import('~/modules/soyuz-core/AppLoader'),
		},
  }
</script>

