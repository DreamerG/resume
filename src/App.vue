<template>
  <div id="app">
    <el-container>
      <el-header>Header</el-header>
      <el-container>
        <el-aside width="200px">
          <slide-menu></slide-menu>
        </el-aside>
        <el-main>
          <div class="app-content">
            <router-view />
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import('../src/assets/css/common.scss')
import slideMenu from './components/slideMenu.vue'
export default {
  components: {
    slideMenu
  }
}
</script>

<style lang="scss">
#app {
  height: 100%;
}
.el-container {
  height: 100%;
  .el-header {
    background: #fff;
    box-shadow: 2px 0px 6px 0px rgba(0, 21, 41, 0.06);
  }
  .el-aside {
    background: #fff;
    box-shadow: 2px 0px 6px 0px rgba(0, 21, 41, 0.06);
  }
  .el-main {
    .app-content {
      background: #fff;
      height: 100%;
      border-radius: 8px;
      box-shadow: 0px 2px 4px 0px rgba(51, 51, 51, 0.08);
      padding: 24px;
    }
  }
}
</style>
