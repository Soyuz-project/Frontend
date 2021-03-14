<template>
  <div>
  	<DataFrame :blockAttrs="{tagName:'header',className:'header'}" :URLQuery="{query:{}, params:{slug:'header'}}"></DataFrame>
    <Nuxt />
  	<DataFrame :blockAttrs="{className:'footer'}" :URLQuery="{query:{}, params:{slug:'footer'}}"></DataFrame>
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

