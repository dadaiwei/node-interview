<template>
	<div class="operation-search">
		<div class="operation">
			<el-button type="primary" size="small" v-for="operation in operations" :icon="operation.icon" :key="operation.name" @click="buttonOperation(operation.name)">
				{{operation.name}}
			</el-button>
			<template v-if="hasMoreOperation">
				<el-select v-model="operationValue" size="medium" placeholder="更多操作" @change="changeOperation(operationValue)" style="margin-left: 10px; width: 120px;">
					<el-option v-for="item in moreOperations" :key="item" :label="item" :value="item">
					</el-option>
				</el-select>
			</template>
		</div>
		<template v-if="searchConditions.length > 0">
			<div class="search">
				<el-select v-model="searchCondition" size="medium" style="width: 120px;">
					<el-option v-for="item in searchConditions" :key="item.value" :label="item.name" :value="item.field">
					</el-option>		
				</el-select>
				<el-input v-model="searchValue" size="medium" placeholder="请输入" style="margin-left: 10px; width: 180px;"></el-input>
				<el-button type="primary" size="medium" icon="iconfont icon-iconfind icon-button" style="margin-left: 10px;" @click="searchContents(searchCondition, searchValue)">搜索</el-button>
			</div>
		</template>
	</div>
</template>

<script>
	export default{
		name: 'OperationSearch',
		props: {	
			module: {
				type: String,
				required: true
			}
		},
		data(){
			return {
				operations: [],
				searchConditions: [],
				hasMoreOperation: false,
				moreOperations: [],
				operationValue: '',
				searchCondition: '',
				searchValue: ''
			}
		},
		methods: {
			buttonOperation(operation){
				this.$emit('button-operation', {
					operation
				});
			},
			changeOperation(operation){
				this.operationValue = "";
				this.$emit('button-operation', {
					operation
				});
			},
			searchContents(searchCondition, searchValue){
				this.$emit('search-contents', {
					searchCondition,
					searchValue
				});
			},
			init(){
				let module = this.module;
				let operations = tableOperations[module];
				let moreOperation = operations.hasMoreOperation;
				this.operations = operations.common;
				this.searchConditions = searchConditions[module];
				this.searchCondition = this.searchConditions[0].field;
				if(moreOperation){
					this.hasMoreOperation = moreOperation;
					this.moreOperations = operations.moreOperations;
				}
			}
		},
		mounted(){
			this.init();
		}
	}
</script>

<style scoped>
	.operation-search{
		display: flex;
		justify-content: space-between;
		padding: 0px 20px;
	}
	.search{
		display: flex;
	}
</style>