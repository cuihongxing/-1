<template>
  <div>
    <div class="welconme-content">
      <el-menu
        default-active="1-4-1"
        router
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        :collapse="isCollapse"
      >
        <div class="toggleBar" @click="suo">| | |</div>
        <el-submenu index="1">
          <div slot="title">
            <i class="el-icon-user-solid"></i>
            <span slot="title" class="span">{{ list[0].authName }}</span>
          </div>

          <el-menu-item
            v-for="(item,index) in list[0].children"
            :key="index"
            class="welcome-user"
            :index="item.path"
          >
            <i class="el-icon-menu"></i>
            {{ item.authName }}
          </el-menu-item>

        </el-submenu>
        <el-submenu index="2">
          <div slot="title">
            <i class="el-icon-apple"></i>
            <span slot="title" class="span">{{ list[1].authName }}</span>
          </div>
          <el-menu-item
            :index="item.path"
            v-for="(item,index) in list[1].children"
            :key="index"
            class="welcome-user"
          >
            <div>
              <i class="el-icon-menu"></i>
              {{ item.authName }}
            </div>
          </el-menu-item>
        </el-submenu>
        <el-submenu index="3">
          <div slot="title">
            <i class="el-icon-goods"></i>
            <span slot="title" class="span">{{ list[2].authName }}</span>
          </div>
          <el-menu-item
            :index="item.path"
            v-for="(item,index) in list[2].children"
            :key="index"
            class="welcome-user"
          >
            <div>
              <i class="el-icon-menu"></i>
              {{ item.authName }}
            </div>
          </el-menu-item>
        </el-submenu>
        <el-submenu index="4">
          <div slot="title">
            <i class="el-icon-document-copy"></i>
            <span slot="title" class="span">{{ list[3].authName }}</span>
          </div>
          <el-menu-item
            :index="item.path"
            v-for="(item,index) in list[3].children"
            :key="index"
            class="welcome-user"
          >
            <div>
              <i class="el-icon-menu"></i>
              {{ item.authName }}
            </div>
          </el-menu-item>
        </el-submenu>
        <el-submenu index="5">
          <div slot="title">
            <i class="el-icon-data-line"></i>
            <span slot="title" class="span">{{ list[4].authName }}</span>
          </div>
          <el-menu-item
            :index="item.path"
            v-for="(item,index) in list[4].children"
            :key="index"
            class="welcome-user"
          >
            <div>
              <i class="el-icon-menu"></i>
              {{ item.authName }}
            </div>
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
  </div>
</template>

<script>
export default {
  props: ["list"],
  data() {
    return {
      isCollapse: true
    };
  },

  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    suo() {
      this.isCollapse = !this.isCollapse;
    }
  }
};
</script>

<style lang="scss" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 280px;
  min-height: 400px;
}
.span{
    color: white;
}
li{
  color: white;
}
.welconme-content{
  height: 100%;
}
.toggleBar {
  color: #fff;
  font-size: 12px;
  line-height: 24px;
  background-color: #4a5064;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.el-menu-vertical-demo {
  background-color: #333744;
  height: 100%;
}
.welcome-title {
  color: white;
}
.welcome-user {
  background-color: #333744;
}
</style>