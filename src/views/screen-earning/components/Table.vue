<template>
  <div class="app-container">
    <span>{{dateText()}}</span>
    <el-date-picker
      v-model="req_params.dateStr"
      :type="datePickerType()"
      :editable="false"
      value-format="yyyy-MM-dd"
      :placeholder="dateText()"
    ></el-date-picker>
    <el-input
      v-model="req_params.paramStr"
      placeholder="输入车主姓名/手机号搜索"
      prefix-icon="el-icon-search"
      style="width:300px;margin:0 20px"
    ></el-input>
    <el-button type="primary" @click="handleSearch">搜索</el-button>
    <el-button type="info" plain @click="handleImport">导出收益信息</el-button>
    <div class="table-box">
      <el-table :data="tableData" v-loading="tableLoading" border style="width: 100%;">
        <el-table-column align="center" prop="month" :label="tableDateText()"></el-table-column>
        <el-table-column align="center" prop="userName" label="车主姓名"></el-table-column>
        <el-table-column align="center" prop="phoneNo" label="手机号"></el-table-column>
        <el-table-column align="center" prop="base" label="屏幕基础收益"></el-table-column>
        <el-table-column align="center" prop="reward" label="奖励金"></el-table-column>
        <el-table-column align="center" prop="extend" label="推广收益"></el-table-column>
        <el-table-column align="center" prop="charge" label="充电收益"></el-table-column>
      </el-table>
    </div>
    <el-pagination
      background
      layout="total, prev, pager, next"
      :total="total"
      :current-page.sync="req_params.pageNum"
      :page-size="req_params.pageSize"
      @current-change="handleCurrentChange"
      style="text-align:right"
    ></el-pagination>
  </div>
</template>

<script>
import { getScreenEarnList } from "@/api/screen-earning";
import { exportScreenEarningData } from "@/api/export-table";
import exportTable from "@/mixins/export-table";
export default {
  name: "Table",
  props: {
    showType: {
      type: String,
      default: 1
    }
  },
  data() {
    return {
      req_params: {
        pageSize: 10,
        pageNum: 1,
        dateStr: "",
        paramStr: ""
      },
      date: "",
      tableData: [],
      tableLoading: true,
      total: 0
    };
  },
  mixins: [exportTable],
  computed: {
    // 合并请求参数
    params() {
      return Object.assign(this.req_params, {
        dimension: Number(this.showType)
      });
    }
  },
  methods: {
    // 动态日期文字
    dateText() {
      if (this.showType === "1") return "选择日期";
      else if (this.showType === "2") return "选择月份";
      else if (this.showType === "3") return "选择年份";
      else return "";
    },
    // 动态时间类型
    datePickerType() {
      if (this.showType === "1") return "date";
      else if (this.showType === "2") return "month";
      else if (this.showType === "3") return "year";
    },
    tableDateText() {
      if (this.showType === "1") return "日期";
      else if (this.showType === "2") return "月份";
      else if (this.showType === "3") return "年份";
    },
    // 搜索
    handleSearch() {
      this.req_params.pageNum = 1;
      this.getScreenEarnList();
    },
    // 导出
    handleImport() {
      this.exportScreenEarningData();
    },
    handleCurrentChange(page) {
      this.req_params.pageNum = page;
    },
    // 导出数据接口
    async exportScreenEarningData() {
      let data = await exportScreenEarningData(this.params);
      this.exportData(data, "收益信息"); // mixin 里的方法
    },
    // 获取屏幕收益列表
    async getScreenEarnList() {
      this.tableLoading = true;
      let { data } = await getScreenEarnList(this.params);
      this.tableData = data.list;
      this.total = data.total;
      this.tableLoading = false;
    }
  },
  watch: {
    showType: {
      handler(value) {
        this.getScreenEarnList();
      },
      immediate: true
    }
  }
};
</script>

<style scoped>
</style>

