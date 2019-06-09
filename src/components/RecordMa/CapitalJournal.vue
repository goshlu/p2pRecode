<template>
	<el-container>
		<el-header>
			<el-row :gutter="15">
				<el-col :span="7">
					<el-input size="small" placeholder="请输入搜索内容" v-model="cinput" class="input-with-select">
						<el-select size="small" class="select-width" v-model="csel" slot="prepend" placeholder="请选择">
							<el-option label="姓名" value="0"></el-option>
							<el-option label="手机号" value="1"></el-option>
						</el-select>
						<el-button size="small" @click="CapitalSearch" slot="append" icon="el-icon-search"></el-button>
					</el-input>
				</el-col>
				<el-col :span="3">
					<el-select size="small" v-model="value" filterable placeholder="请选择">
						<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</el-col>
				<el-col :span="3" :offset="11">
					<el-select size="small" v-model="exportvalue" filterable placeholder="请选择">
						<el-option v-for="item in exportoptions" :key="item.exportvalue" :label="item.label" :value="item.exportvalue">
						</el-option>
					</el-select>
				</el-col>


			</el-row>
		</el-header>
		<el-main>
			<el-table id="moneyTable" stripe style="font-size: 14px;" :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
			 :header-cell-style="{color:'#333',backgroundColor:'#e9e9eb'}" :cell-style="{'text-align':'center'}">

				<el-table-column prop="name" label="姓名" align="center">
				</el-table-column>
				<el-table-column prop="phone" width="120" label="用户手机" align="center">
				</el-table-column>
				<el-table-column prop="type" label="类型" align="center">
				</el-table-column>
				<el-table-column prop="operating_amount" label="操作金额" align="center">
				</el-table-column>
				<el-table-column prop="before_operaing" width='120' label="操作前可用金额" align="center">
				</el-table-column>
				<el-table-column prop="after_operaing" width='120' label="操作后可用金额" align="center">
				</el-table-column>
				<el-table-column prop="before_freezing" width='120' label="操作前冻结金额" align="center">
				</el-table-column>
				<el-table-column prop="after_freezing" width='120' label="操作后冻结金额" align="center">
				</el-table-column>
				<el-table-column width='100' prop="message" label="备注" align="center">
				</el-table-column>
				<el-table-column width='170' prop="date_operaing" label="操作时间" align="center">
				</el-table-column>

			</el-table>
			<el-table hidden="true" id="moneyTableExport" stripe style="font-size: 11px;" :data="tableData" :header-cell-style="getRowClass"
			 :cell-style="{'text-align':'center'}">

				<el-table-column prop="name" label="姓名" align="center">
				</el-table-column>
				<el-table-column prop="phone" width="100" label="用户手机" align="center">
				</el-table-column>
				<el-table-column prop="type" label="类型" align="center">
				</el-table-column>
				<el-table-column prop="operating_amount" label="操作金额" align="center">
				</el-table-column>
				<el-table-column prop="before_operaing" width='100' label="操作前可用金额" align="center">
				</el-table-column>
				<el-table-column prop="after_operaing" width='100' label="操作后可用金额" align="center">
				</el-table-column>
				<el-table-column prop="before_freezing" width='100' label="操作前冻结金额" align="center">
				</el-table-column>
				<el-table-column prop="after_freezing" width='100' label="操作后冻结金额" align="center">
				</el-table-column>
				<el-table-column width='100' prop="message" label="备注" align="center">
				</el-table-column>
				<el-table-column width='170' prop="date_operaing" label="操作时间" align="center">
				</el-table-column>

			</el-table>
		</el-main>
		<el-footer style="margin:20px 0 10px;text-align: right;">
			<el-row>
				<el-col>
					<el-pagination background layout="total,prev, pager, next,sizes" :page-sizes="[10, 25, 50, 100]" :page-size="pagesize"
					 :total="total" :current-page="currentPage" @size-change="handleSizeChange" @current-change="current_change">
					</el-pagination>
				</el-col>

			</el-row>

		</el-footer>
	</el-container>

</template>
<script>
	import FileSaver from 'file-saver';
	import XLSX from 'xlsx';
	export default {
		name: 'CapitalJournal',
		data() {
			// const item = {
			// 	userId: '201709091123',
			// 	name: '百事可乐',
			// 	phone: '13990722322',
			// 	total_assets: '回收本金',
			// 	total_monney:'￥20000',
			// 	balance: 0,
			// 	Freezing_amount: 0,
			// 	amount_collected: 0,
			// 	Cumulative_investment: 0,
			// 	Remarks:"[新手标] 还款，收回本金100.00元",
			// 	Accumulated_loan: '2017-01-01 12:23:33',
			// 	Accumulated_repayment: 0,
			// 	repayment_balance: 0
			// };
			return {
				tableData: [],
				total: 0, //默认数据总数
				pagesize: 10, //每页的数据条数
				currentPage: 1, //当前页
				input_phone: '',
				input_name: '',
				cinput: "",
				csel: "0",
				exportoptions: [{
					exportvalue: 0,
					label: "导出选中"
				}, {
					exportvalue: 1,
					label: "导出全部"
				}],
				exportvalue: 0,
				options: [{
					value: 0,
					label: '全部类型'
				}, {
					value: 1,
					label: '回收利息'
				}, {
					value: 2,
					label: '回收本金'
				}, {
					value: 3,
					label: '利息管理费'
				}, {
					value: 4,
					label: '借款入账'
				}],
				value: 0
			}
		},
		created() {
			this.total = this.tableData.length;
			this.axiosFun();
		},
		watch: {
			exportvalue(){
			this.exportExcel();	
			},
			value() {
				this.inputdatacheck();
				this.axiosFun();
			},
			exportvalue(){
				if(this.exportvalue==1){
					this.tableToExcel();
				}
			}
		},
		methods: {
			inputdatacheck() {
				if (this.csel == 0) {
					this.input_phone = "";
					this.input_name = this.cinput;
				} else {
					this.input_name = ""
					this.input_phone = this.cinput;
				}
			},
			CapitalSearch() {
				this.inputdatacheck();
				this.axiosFun();
			},
			axiosFun() {
				this.Axios.get('http://19h4o94140.51mypc.cn/capitaljournal', {
						params: {
							phone: this.input_phone,
							name: this.input_name,
							type: this.value
						}
					}).then(
						(response) => {
							this.tableData = response.data;
							this.datacheck();
							this.total = this.tableData.length;
							// console.log(response);
						})
					.catch(function(error) {
						console.log(error);
					});
			},
			searchFun() {
				this.total = this.tableData.length;
				this.Axios.get('http://19h4o94140.51mypc.cn/capitaljournal', {
						params: {
							phone: this.input_phone,
							name: this.input_name,
							type: this.value
						}
					}).then(
						(response) => {
							console.log(response.data);
							this.tableData = response.data;
							this.datacheck();
							this.total = this.tableData.length;

						})
					.catch(function(error) {
						console.log(error);
					});
			},
			datacheck() {
				for (let i = 0; i < this.tableData.length; i++) {
					// console.log(this.tableData[i].type);
					if (this.tableData[i].type == "1") {
						this.tableData[i].type = "回收利息";
					} else if (this.tableData[i].type == "2") {
						this.tableData[i].type = "回收本金";
					} else if (this.tableData[i].type == "3") {
						this.tableData[i].type = "利息管理费";
					} else {
						this.tableData[i].type = "借款入账";
					}
				}
			},
			getRowClass() {
				return 'background:#f2f2f2'
			},
				tableToExcel() {
				 let data=this.tableData;
					this.JSONToExcelConvertor(data,"sheet");
			},
			current_change: function(currentPage) {
				this.currentPage = currentPage;
			},
			handleSizeChange(pagesize) {
				this.pagesize = pagesize;

			}
		}
	}
</script>
<style scoped>
	.el-header {
		/* background-color: #B3C0D1; */
		color: #333;
		line-height: 60px;
	}

	.select-width {
		width: 100px;
	}

	.input-with-select {
		width: 300px;
	}

	.el-aside {
		color: #333;
	}

	.el-table th {
		text-align: center !important;
	}
</style>
