<template>
	<div class="view-header">
		<p>{{title}}</p>
	</div>
</template>

<script>
	export default{
		name: 'ViewHeader',
		props: {
			title: String, 
			required: true
		}
	}
</script>

<style scoped>
	.view-header{
		padding: 15px 20px 5px 20px;
	}
	.view-header>p{
		font-size: 22px;
		font-weight: 400;
		margin: 0px 0px 10px 0px;
	}
</style>