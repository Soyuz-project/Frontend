<template>
  <div>
  	<DataFrame :blockAttrs="{tagName:'header', className:'header'}" :urlQuery="{query:{}, params:{slug:'header'}}"></DataFrame>
    <Nuxt />
  	<DataFrame :blockAttrs="{className:'footer'}" :urlQuery="{query:{}, params:{slug:'footer'}}"></DataFrame>
  </div>
</template>
<script>
	export default {
  		name: 'Layout',
  		components: {
			DataFrame: () => import('~/modules/soyuz-core/DataFrame.js'),
		},
  	}
</script>

