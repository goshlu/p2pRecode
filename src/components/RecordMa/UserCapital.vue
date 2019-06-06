<template>
	<el-container>
		<el-header>
			<el-row :gutter="15">
				<el-col :span="7">
					<el-input size="small" placeholder="请输入内容" v-model="uinput" class="input-with-select">
						<el-select size="small" class="select-width" v-model="usel"  slot="prepend" placeholder="请选择">
							<el-option label="姓名" value="0"></el-option>
							<el-option label="手机号" value="1"></el-option>
						</el-select>
						<el-button size="small" @click="UserSearch" slot="append" icon="el-icon-search"></el-button>
					</el-input>
				</el-col>
				<el-col :span="3">
					<el-select size="small" v-model="value" filterable placeholder="请选择">
						<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</el-col>
				<el-col :span="2" :offset="12">
					<el-button plain size="small" @click="exportExcel">导出</el-button>
				</el-col>


			</el-row>
		</el-header>
		<el-main>
			<el-table id="moneyTable" :header-cell-style="{color:'#333',backgroundColor:'#e9e9eb'}" tooltip-effect="dark" stripe
			 style="font-size: 11px;" :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" :cell-style="{'text-align':'center',border:'none'}">
				<el-table-column type="selection">
				</el-table-column>
				<!-- 	<el-table-column prop="id" width="70" label="用户ID" align="center">
				</el-table-column> -->
				<el-table-column prop="name" label="姓名" align="center">
				</el-table-column>
				<el-table-column prop="phone" width="130" label="用户手机" align="center">
				</el-table-column>
				<el-table-column prop="total_assets" label="总资产" align="center">
				</el-table-column>
				<el-table-column prop="available_balance" label="可用余额" align="center">
				</el-table-column>
				<el-table-column prop="frozen_balance" label="冻结金额" align="center">
				</el-table-column>
				<el-table-column prop="amount_collected" label="待收金额" align="center">
				</el-table-column>
				<el-table-column prop="cumulative_investment" label="累计投资" align="center">
				</el-table-column>
				<el-table-column prop="accumulated_return_investment" width="100" label="累计投资收益" align="center">
				</el-table-column>
				<el-table-column prop="accumulated_loan" label="累计借款" align="center">
				</el-table-column>
				<el-table-column prop="accumulated_repayment" label="累计还款" align="center">
				</el-table-column>
				<el-table-column prop="lending_repayment_balance" label="借还款差额" align="center">
				</el-table-column>

			</el-table>
			<!-- 		<el-table hidden="true" id="moneyTableExport" stripe style="font-size: 11px;" :data="tableData" :header-cell-style="getRowClass" :cell-style="{'text-align':'center'}">
				<el-table-column prop="id" width="130" label="用户ID" align="center">
				</el-table-column>
				<el-table-column prop="username" label="姓名" align="center">
				</el-table-column>
				<el-table-column prop="personageMemberInfoPhone" width="130" label="用户手机" align="center">
				</el-table-column>
				<el-table-column prop="money" label="总资产" align="center">
				</el-table-column>
				<el-table-column prop="money" label="可用余额" align="center">
				</el-table-column>
				<el-table-column prop="smallmoney" label="冻结金额" align="center">
				</el-table-column>
				<el-table-column prop="smallmoney" label="待收金额" align="center">
				</el-table-column>
				<el-table-column prop="maxmoney" label="累计投资" align="center">
				</el-table-column>
				<el-table-column prop="maxmoney" width="100" label="累计投资收益" align="center">
				</el-table-column>
				<el-table-column prop="smallmoney" label="累计借款" align="center">
				</el-table-column>
				<el-table-column prop="smallmoney" label="累计还款" align="center">
				</el-table-column>
				<el-table-column prop="smallmoney" label="借还款差额" align="center">
				</el-table-column>
				
			</el-table> -->

		</el-main>
		<el-footer style="margin:20px 0 10px">
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
	import FileSaver from "file-saver";
	import XLSX from "xlsx";
	export default {
		name: "UserCapital",
		data() {
			return {
				usel: "",
				uinput: "",
				tableData: [],
				total: 0, //默认数据总数
				pagesize: 10, //每页的数据条数
				currentPage: 1, //当前页
				input_phone: "",
				input_name: "",
				pubdata:"",
				options: [{
						value: 0,
						label: "全部用户"
					},
					{
						value: 1,
						label: "个人用户"
					},
					{
						value: 2,
						label: "企业用户"
					}
				],
				value: 0
			};
		},
		created() {
			this.axiosFun();
		},
		watch: {
			value(){
				this.inputdatacheck();
				this.axiosFun();
			}
		},
		methods: {
			UserSearch(){
				this.inputdatacheck();
				this.axiosFun();
			},
			inputdatacheck(){
					if(this.usel==0){
						this.input_phone="";
						this.input_name=this.uinput;
					}else{
						this.input_name=""
						this.input_phone=this.uinput;
					}
			},
			axiosFun() {
				this.Axios.get("http://19h4o94140.51mypc.cn/usercapital", {
						params: {
							phone: this.input_phone,
							name: this.input_name,
							type: this.value
						}
					})
					.then(response => {
						this.tableData = response.data;
						this.total = this.tableData.length;
					})
					.catch(function(error) {
						console.log(error);
					});
			},
			searchFun() {
				this.total = this.tableData.length;
				this.axiosFun();
			},
			exportExcel() {
				/* generate workbook object from table */
				var wb = XLSX.utils.table_to_book(
					document.querySelector("#moneyTableExport")
				);
				/* get binary string as output */
				var wbout = XLSX.write(wb, {
					bookType: "xlsx",
					bookSST: true,
					type: "array"
				});
				try {
					FileSaver.saveAs(
						new Blob([wbout], {
							type: "application/octet-stream"
						}),
						"sheetjs.xlsx"
					);
				} catch (e) {
					if (typeof console !== "undefined") console.log(e, wbout);
				}
				return wbout;
			},
			current_change: function(currentPage) {
				this.currentPage = currentPage;
			},
			handleSizeChange(pagesize) {
				this.pagesize = pagesize;
			}
		},
	};
</script>
<style scoped="scoped">
/* 	 .el-select .el-input {
    width: 90px;
  } */
  .select-width{
	  width:100px;
  }
  .input-with-select{
	  width: 300px;
  }
	.el-header {
		/* background-color: #B3C0D1; */
		color: orange;
		line-height: 60px;
	}

	.el-aside {
		color: #000
	}

	.el-table th {
		text-align: center !important;
	}
</style>
