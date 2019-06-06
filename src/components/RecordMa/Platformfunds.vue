<template>
	<el-container>
		<el-header>
			<el-row :gutter="15">
				<el-col :span="4">
					<div class="grid-content bg-purple">
						<el-input size="small" v-model="id" suffix-icon="el-icon-search" placeholder="搜索流水号"></el-input>
					</div>
				</el-col>
				<el-col :span="4">
					<el-select size="small" v-model="valuetype" filterable placeholder="请选择">
						<el-option v-for="item in optionstype" :key="item.valuetype" :label="item.label" :value="item.valuetype">
						</el-option>
					</el-select>
				</el-col>
				<el-col :span="3">
					<el-select size="small" v-model="value" filterable placeholder="请选择">
						<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</el-col>
				<el-col :span="4">
					<el-button @click="searchFun"  size="small" plain>搜索</el-button>
				</el-col>
				<el-col :span="2" :offset="7">
					<el-button plain size="small">导出</el-button>
				</el-col>
			</el-row>
		</el-header>
		<el-header>
			<el-row :gutter="15">
				<el-col :span="24">
					<el-col :span="24" class="platBorder">
						<el-col :span="18">
							<div>平台账户余额: <span class="platOrange">123123.12</span>元</div>
						</el-col>
						<el-col :span="3">
							<el-button size="medium" type="primary">平台充值</el-button>
						</el-col>
						<el-col :span="3">
							<el-button size="medium" type="primary">平台提现</el-button>
						</el-col>
					</el-col>

				</el-col>
			</el-row>
		</el-header>
		<el-main>
			<el-table id="moneyTable" 
			stripe style="font-size: 11px;"
			 :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
			  :cell-style="{'text-align':'center'}"
			    tooltip-effect="dark"
    @selection-change="handleSelectionChange"
			  >
					<el-table-column type="selection">
					</el-table-column>
					<el-table-column prop="id" label="流水号" align="center">
				</el-table-column>
				<el-table-column prop="type" label="类型" align="center">
				</el-table-column>
				<el-table-column prop="account_type" label="出入帐" align="center">
				</el-table-column>
				<el-table-column prop="operating_amount" label="操作金额" align="center">
				</el-table-column>
				<el-table-column prop="service_charge" label="手续费" align="center">
				</el-table-column>
				<el-table-column prop="before_operaing" label="操作前余额" align="center">
				</el-table-column>
				<el-table-column prop="after_operaing" label="操作后余额" align="center">
				</el-table-column>
				<el-table-column prop="state" label="状态" align="center">
				</el-table-column>
							
							
				<el-table-column prop="message" label="备注" align="center">
				</el-table-column>
				<el-table-column prop="date_operaing" width='165' label="操作时间" align="center">
				</el-table-column>

			</el-table>
		</el-main>
		<el-footer style="margin:20px 0 10px">
			<el-row>
				<el-col>
					<el-pagination background layout="total,prev, pager, next,sizes" :page-sizes="[10, 25, 50, 100]" :page-size="pagesize"
					 :total="total" :current-page="currentPage"  @size-change="handleSizeChange" @current-change="current_change">
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
		name: 'Platformfunds',
		data() {
			// const item = {
			// 	userId: '201709091123',
			// 	name: '百事可乐',
			// 	phone: '13990722322',
			// 	total_assets: '现金红包',
			// 	Account: '出帐',
			// 	total_monney: '￥20000',
			// 	balance: 0,
			// 	Freezing_amount: 0,
			// 	amount_collected: 0,
			// 	Cumulative_investment: 0,
			// 	Remarks: "出入帐明细",
			// 	Accumulated_loan: '2017-01-01 12:23:33',
			// 	Accumulated_repayment: 0,
			// 	repayment_balance: 0,
			// 	state: '完成'
			// };

			return {
				// tableData: Array(20).fill(item),
				tableData: [],
				total: 0, //默认数据总数
				pagesize: 10, //每页的数据条数
				currentPage: 1, //当前页
				id: '',
				input_name: '',
				options: [{
					value: 0,
					label: '出入帐'
				}, {
					value: 1,
					label: '出账'
				}, {
					value: 2,
					label: '入账'
				}],
				value: 0,
				optionstype: [
					{
						valuetype: 0,
						label: '全部类型'
					},
					{
					valuetype: 1,
					label: '平台充值'
				}, {
					valuetype: 2,
					label: '平台提现'
				}, {
					valuetype: 3,
					label: '借款管理费'
				},{
					valuetype: 4,
					label: '利息管理费'
				}, {
					valuetype: 5,
					label: '还款垫付'
				}, {
					valuetype: 6,
					label: '现金红包'
				},{
					valuetype: 7,
					label: '邀请奖励'
				}, {
					valuetype: 8,
					label: '体验金收益'
				}, {
					valuetype: 9,
					label: '其他活动奖励'
				}],
				valuetype: 0
			}
		},
		created() {
			this.total=this.tableData.length;
			this.axiosFun();
		},watch:{
			valuetype(){
				this.axiosFun();
			},
			value(){
				this.axiosFun();
			}},
		methods: {
			axiosFun(){
				this.Axios.get('http://19h4o94140.51mypc.cn/platformfunds',{
					params:{
						type:this.valuetype,
						account_type:this.value,
						id:this.id
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
			searchFun(){
					this.total=this.tableData.length;
				this.Axios.get('http://19h4o94140.51mypc.cn/platformfunds',{
					params:{
						type:this.valuetype,
						account_type:this.value,
						id:this.id
					}
				}).then(
						(response) => {
							console.log(response.data);
							this.tableData = response.data;
							this.total = this.tableData.length;
							
						})
					.catch(function(error) {
						console.log(error);
					});
			},
			datacheck(){
				for(let i=0;i<this.tableData.length;i++){
					// console.log(this.tableData[i].type);
						if(this.tableData[i].type=="1"){
							this.tableData[i].type="平台充值";
						}else if(this.tableData[i].type=="2"){
							this.tableData[i].type="平台提现";
						}else if(this.tableData[i].type=="3"){
							this.tableData[i].type="借款管理费";
						}else if(this.tableData[i].type=="4"){
							this.tableData[i].type="利息管理费";
						}else if(this.tableData[i].type=="5"){
							this.tableData[i].type="还款垫付";
						}else if(this.tableData[i].type=="6"){
							this.tableData[i].type="现金红包";
						}else if(this.tableData[i].type=="7"){
							this.tableData[i].type="邀请奖励";
						}else if(this.tableData[i].type=="8"){
							this.tableData[i].type="体验金收益";
						}else{
							this.tableData[i].type="其他活动奖励";
						}
						if(this.tableData[i].account_type=="1"){
							this.tableData[i].account_type="出账";
						}else{
							this.tableData[i].account_type="入账";
						}
						if(this.tableData[i].state=="0"){
							this.tableData[i].state="成功";
						}else{
							this.tableData[i].state="失败";
						}
				}
			},
			  handleSelectionChange(val) {
        this.multipleSelection = val;
      },
			current_change:function(currentPage){
				this.currentPage = currentPage;
			},handleSizeChange(pagesize){
				this.pagesize=pagesize;
				
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

	.el-aside {
		color: #333;
	}

	.el-table th {
		text-align: center !important;
	}

	.platBorder {
		/* width: 100%; */
		/* height:55px; */
		border: 0.3px solid #bbb;
		/* border-right:none; */
		/* box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1); */
		/* box-sizing: border-box; */
		/* background:#bbb; */
	}

	.platOrange {
		color: orange;
	}
</style>
