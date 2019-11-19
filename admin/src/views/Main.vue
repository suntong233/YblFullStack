<template>
  <el-container>
    <el-aside width="200px">
      <el-menu style="height:100vh" mode="vertical" :default-active="$route.path" router>
        <el-submenu
          v-for="(item, index) in menu.items"
          :index="index + 1 + ''"
          :key="`menu-item-${index}`"
        >
          <template slot="title">{{ item.title }}</template>
          <el-menu-item
            v-for="(subItem, subIndex) in item.items"
            :index="subItem.path"
            :key="`menu-item-${index}-${subIndex}`"
          >{{subItem.title}}</el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <h3>YblFullStack后台管理</h3> 
      </el-header>
      <el-main>
        <!-- <keep-alive> -->
          <router-view :key="$route.path"></router-view>
        <!-- </keep-alive> -->
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({})
export default class Main extends Vue {
  menu = {
    items: [
      {
        title: "内容管理",
        items: [
          { title: "首页", path: "/" },
          { title: "课程管理", path: "/courses/crud" },
          { title: "课时管理", path: "/episodes/crud" }
        ]
      },
      {
        title: "运营管理",
        items: [{ title: "用户管理", path: "/users/crud" }]
      }
    ]
  };
}
</script>
