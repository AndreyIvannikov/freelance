<template>
  <AppLoader v-if="loader" />

  <h1 v-if="tasks.length === 0 && !errorMessage" class="text-white center">
    Список задач пуст
  </h1>

  <h1 v-if="errorMessage" class="text-white center">
    {{ errorMessage }}
  </h1>

  <template v-else>
    <h3 class="text-white">Всего активных задач: {{ activeTasks }}</h3>
    <AppCard />
  </template>
</template>

<script>
import AppCard from "../components/AppCard";
import AppLoader from "../components/AppLoader";
import { ref, computed, onMounted } from "vue";
import { useStore, mapGetters } from "vuex";
import { useRouter } from "vue-router";

export default {
  components: { AppCard, AppLoader },
  setup(props) {
    const store = useStore();
    const router = useRouter();
    const tasks = computed(() => store.getters.tasks);
    const loader = ref(true);
    onMounted(async () => {
      await store.dispatch("getTasksInDatabase");
      loader.value = await false;
    });

    return {
      tasks,
      activeTasks: computed(() => store.getters.tasksActive),
      loader: computed(() => loader.value),
      errorMessage: computed(() => store.getters.errorMessage)
    };
  }
};
</script>
