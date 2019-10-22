<template>
  <div class="app-container">
    <el-card>
      <el-tabs v-model="active">
        <el-tab-pane label="今日收益" name="1"></el-tab-pane>
        <el-tab-pane label="月份收益" name="2"></el-tab-pane>
        <el-tab-pane label="年份收益" name="3"></el-tab-pane>
        <Table :show-type="active" />
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import Table from "./components/Table";
export default {
  data() {
    return {
      active: "1"
    };
  },
  components: { Table }
};
</script>

<style scoped>
</style>

