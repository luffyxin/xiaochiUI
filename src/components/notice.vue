<!-- 公告 -->
<template>
  <div>
    <el-form>
      <el-form-item label="公告">
        <el-input type="textarea" :rows="4" v-model="notice"></el-input>
        <el-button @click="savenotice()">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    return {
      notice: null,
      user: null
    };
  },
  //监听属性 类似于data概念
  computed: {},
  watch: {},
  //方法集合
  methods: {
    getnotice() {
      var storage = window.localStorage;
      //将JSON字符串转换成为JSON对象输出
      var userjson = storage.getItem("user");
      if (userjson != null) {
        this.user = JSON.parse(userjson);
      }
      var url = "/xiaochi/info/getpublicinfo";
      this.$axios.get(url).then(res => {
        if (res.data.result.code == "200") {
          this.notice = res.data.result.object.info;
        } else {
          this.$message.error(res.data.result.message);
        }
      });
    },
    savenotice() {
      var url = "/xiaochi/info/updatepublicinfo/" + this.user.id;
      const params = new URLSearchParams();
      params.append("info", this.notice);
      this.$axios.post(url,params).then(res => {
        if (res.data.result.code == "200") {
          this.$message.success(res.data.result.message);
        } else {
          this.$message.error(res.data.result.message);
        }
      });
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.getnotice();
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style >
</style>
