export default {
  methods: {
    /**
     * 导出表格方法，参数传递如下：
     * @param {blob} data 表格数据（二进制）
     * @param {string} name 表格的名称
     */
    mixin_exportData(data, name) {
      const blob = new Blob([data], {
        type:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
      });
      const link = document.createElement("a");
      const href = window.URL.createObjectURL(blob);
      link.download = name;
      link.href = href;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      this.$message({
        message: "导出成功",
        type: "success"
      });
    },

    // 小于10加0操作
    mixin_addZero(num) {
      num = parseInt(num);
      return num < 10 ? "0" + num : "" + num;
    }
  }
};
