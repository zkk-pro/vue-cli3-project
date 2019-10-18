<template>
  <div class="app-container">
    <el-card class="box-card">
      <span>审核状态</span>
      <el-select v-model="req_params.status" placeholder="不限">
        <el-option
          v-for="option in auditStatusOption"
          :key="option.value"
          :label="option.label"
          :value="option.value"
        ></el-option>
      </el-select>
      <el-input
        v-model="req_params.queryStr"
        clearable
        placeholder="输入车主姓名/手机号/车牌号搜索"
        prefix-icon="el-icon-search"
        style="width:300px;margin:0 20px"
      ></el-input>
      <el-button type="primary" @click="handleSearch">搜索</el-button>
      <el-button type="info" plain @click="handleImport">导出车主信息</el-button>
      <div class="table-box">
        <el-table v-loading="tableLoading" :data="tableData" border style="width: 100%;">
          <el-table-column align="center" prop="realName" label="姓名"></el-table-column>
          <el-table-column align="center" prop="plateNo" label="车牌号"></el-table-column>
          <el-table-column align="center" prop="phoneNo" label="手机号"></el-table-column>
          <el-table-column align="center" prop="carModelName" label="车型"></el-table-column>
          <el-table-column align="center" prop="carColor" label="车身颜色"></el-table-column>
          <el-table-column align="center" prop="leaseCompany" label="租赁公司"></el-table-column>
          <el-table-column align="center" prop="idCard" label="身份证号" width="180"></el-table-column>
          <el-table-column align="center" prop="createDate" label="注册时间" width="160"></el-table-column>
          <el-table-column align="center" prop="updateDate" label="提交时间" width="160"></el-table-column>
          <el-table-column align="center" prop="auditStatusStr" label="审核状态"></el-table-column>
          <el-table-column align="center" prop="auditorStr" label="审核方"></el-table-column>
          <el-table-column align="center" prop="address" label="操作" width="220px">
            <template slot-scope="scope">
              <el-button
                :disabled="disabledBtn(scope.row.auditStatus)"
                size="mini"
                type="primary"
                plain
                @click="handlePass(scope.$index, scope.row)"
              >审核通过</el-button>
              <el-button
                :disabled="disabledBtn(scope.row.auditStatus)"
                size="mini"
                type="danger"
                plain
                @click="handleNoPass(scope.$index, scope.row)"
              >审核不通过</el-button>
            </template>
          </el-table-column>
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
import { getCarList, carAudit } from "@/api/car-owner-audit";
import { exportCarOwnerData } from "@/api/export-table";
import CommonMixins from '@/mixins/common-methods.js'

export default {
  data() {
    return {
      auditStatusOption: [
        { label: "不限", value: -1 },
        { label: "认证审核", value: 0 },
        { label: "修改审核", value: 1 },
        { label: "审核通过", value: 2 },
        { label: "审核驳回", value: 3 }
      ],
      req_params: {
        pageSize: 10,
        pageNum: 1,
        status: -1,
        queryStr: ""
      },
      tableLoading: false,
      tableData: [],
      total: 0
    };
  },
  mixins: [CommonMixins],
  methods: {
    disabledBtn(status) {
      return status === 2 || status === 3 || status === 4;
    },
    // 搜索
    handleSearch() {
      this.req_params.pageNum = 1;
      this.getCarList();
    },
    // 导出
    handleImport() {
      this.exportCarOwnerData();
    },

    // 审核通过
    handlePass(index, row) {
      this.$confirm(
        "是否已确认车辆信息无误，审核通过后将可以预约广告！",
        "审核确认"
      )
        .then(() => {
          this.carAudit({ auditStatus: 2, id: row.id });
        })
        .catch(() => {});
    },
    // 审核不通过
    handleNoPass(index, row) {
      this.$prompt("", "不通过原因")
        .then(val => {
          this.carAudit({
            auditStatus: 3,
            id: row.id,
            auditComment: val.value
          });
        })
        .catch(() => {});
    },
    // currentPage 改变时
    handleCurrentChange(page) {
      this.req_params.pageNum = page;
      this.getCarList();
    },
    // 导出数据
    async exportCarOwnerData() {
      let data = await exportCarOwnerData(this.req_params);
      this.mixin_exportData(data, '车主信息') // mixin 里的方法
    },
    // 车辆审核操作
    async carAudit(params) {
      let { data } = await carAudit(params);
      this.getCarList();
    },
    // 获取车辆审核列表
    async getCarList() {
      this.tableLoading = true;
      let { data } = await getCarList(this.req_params);
      this.tableData = data.list;
      this.total = data.totalCount;
      this.tableLoading = false;
    }
  },
  created() {
    this.getCarList();
  }
};
</script>
