<template>
  <el-menu mode="vertical" :show-timeout="200" background-color="#ffffff" text-color="#333333" active-text-color="#409EFF" default-active="/index" class="el-menu-vertical" :router="true">
    <template v-for="item in asideMenuConfig">
      <router-link v-if="!item.children" :to="item.path" :key="item.name">
        <el-menu-item :index="item.path">
          <i v-if="item.icon" :class="item.icon"></i>
          <span v-if="item.name" slot="title">{{ item.name }}</span>
        </el-menu-item>
      </router-link>
      <el-submenu v-else :index="item.name || item.path" :key="item.name">
        <template slot="title">
          <i v-if="item && item.icon" :class="item.icon"></i>
          <span v-if="item && item.name" slot="title">{{ item.name }}</span>
        </template>
        <template v-for="child in item.children">
          <template v-if="!child.hidden">
            <router-link :to="child.path" :key="child.name">
              <el-menu-item :index="child.path">
                <span v-if="child && child.name" slot="title">
                  {{ child.name }}
                </span>
              </el-menu-item>
            </router-link>
          </template>
        </template>
      </el-submenu>
    </template>
  </el-menu>
</template>

<script>
import { asideMenuConfig } from '../menuConfig'
export default {
  data() {
    return {
      asideMenuConfig: JSON.parse(JSON.stringify(asideMenuConfig))
    }
  }
}
</script>
