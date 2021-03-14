<template>
  <div>
  	<header><DataFrame :URLQuery="{query:$route.query, params:$route.params}"></DataFrame></header>
    <Nuxt />
    <div>Footer</div>
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

