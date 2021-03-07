<template>
  <the-navbar></the-navbar>
  <div class="container with-nav">
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>
</template>

<script>
import TheNavbar from "./components/TheNavbar";
import { useStore } from "vuex";
import { ref, computed, onMounted } from "vue";

export default {
  components: {
    TheNavbar
  },
  setup(props) {
    const store = useStore();

    return {};
  }
};
</script>

<style>
</style>
