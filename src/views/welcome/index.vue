<template>
  <el-card shadow="always" style="margin: 30px">
    <div class="welcome-content">
      <img :src="welcomeLogo" />
      <div class="text">
        <!-- <h2>亚滴新能源</h2> -->
        <p>欢迎使用租赁公司管理系统</p>
      </div>
    </div>
  </el-card>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Welcome",
  data() {
    return {
      welcomeLogo: require("@/assets/welcome-logo.png")
    };
  },
  computed: {
    ...mapGetters(["name"])
  }
};
</script>

<style lang="scss" scoped>
.welcome-content {
  display: flex;
  align-items: center;
  img {
    width: 150px;
  }
  .text {
    margin-left: 20px;
    p {
      // color: #909399;
      color: #000;
      font-size: 28px;
    }
  }
}
</style>
