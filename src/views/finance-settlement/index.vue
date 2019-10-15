<template>
  <div class="app-container">
    <el-card class="box-card">
      <span>提现月份</span>
      <el-date-picker
        v-model="req_params.dateStr"
        type="month"
        value-format="yyyy-MM"
        placeholder="选择月"
      ></el-date-picker>
      <el-input
        v-model="req_params.paramStr"
        clearable
        placeholder="输入车主姓名/手机号搜索"
        prefix-icon="el-icon-search"
        style="width:300px;margin:0 20px"
      ></el-input>
      <el-button type="primary" @click="handleSearch">搜索</el-button>
      <el-button type="info" plain @click="handleImport">导出结算记录</el-button>
      <div class="table-box">
        <el-table :data="tableData" v-loading="tableLoading" border style="width: 100%;">
          <el-table-column prop="month" label="提现月份"></el-table-column>
          <el-table-column prop="userName" label="车主姓名"></el-table-column>
          <el-table-column prop="phoneNo" label="手机号"></el-table-column>
          <el-table-column prop="monthProfit" label="当月收入金额"></el-table-column>
          <el-table-column prop="base" label="屏幕-基础收益"></el-table-column>
          <el-table-column prop="reward" label="屏幕-奖励金"></el-table-column>
          <el-table-column prop="extend" label="推广收益"></el-table-column>
          <el-table-column prop="charge" label="充电收益"></el-table-column>
          <el-table-column prop="total" label="屏幕累计收益"></el-table-column>
          <el-table-column prop="payProfit" label="当月应打款金额">
            <template slot-scope="scope">
              <!-- 当月应打款金额小于0时，显示0 -->
              {{scope.row.payProfit > 0 ? scope.row.payProfit: 0 }}
            </template>
          </el-table-column>
          <el-table-column prop="address" label="结算状态"></el-table-column>
        </el-table>
      </div>
      <el-pagination
        background
        layout="total, prev, pager, next"
        :total="total"
        :page-size="req_params.pageSize"
        :current-page.sync="req_params.pageNum"
        @current-change="handleCurrentChange"
        style="text-align:right"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
import { getSettlementList } from "@/api/finance-settlement";
import { exportSettlementData } from "@/api/export-table";
import exportTable from "@/mixins/export-table";
export default {
  data() {
    return {
      req_params: {
        pageSize: 10,
        pageNum: 1,
        dateStr: "",
        paramStr: ""
      },
      tableData: [],
      tableLoading: false,
      total: 0
    };
  },
  mixins: [exportTable],
  methods: {
    // 搜索
    handleSearch() {
      this.req_params.pageNum = 1;
      this.getSettlementList();
    },
    // 导出
    handleImport() {
      this.exportSettlementData()
    },
    // currentPage 改变时
    handleCurrentChange(page) {
      this.req_params.pageNum = page;
    },
    // 导出结算记录数据
    async exportSettlementData() {
      let data = await exportSettlementData(this.req_params);
      this.exportData(data, '结算记录') // mixin 里的方法
    },
    // 获取结算列表
    async getSettlementList() {
      this.tableLoading = true;
      let { data } = await getSettlementList(this.req_params);
      this.tableData = data.list;
      this.total = data.total;
      this.tableLoading = false;
    }
  },
  created() {
    this.getSettlementList();
  }
};
</script>
