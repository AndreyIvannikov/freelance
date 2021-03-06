<template>
  <h2 v-if="loader" class="card">Загрузка....</h2>

  <h1 v-if="tasks.length === 0 && !errorMessage" class="text-white center">
    Список задач пуст
  </h1>

  <h1 v-if="errorMessage" class="text-white center">
    {{ errorMessage }}
  </h1>

  <template v-else>
    <h3 class="text-white">Всего активных задач: {{ activeTasks }}</h3>
    <div class="card" v-for="task in tasks" :key="task.id">
      <h2 class="card-title">
        {{ task.nameDedlaine }}
        <AppStatus :type="task.status.type" :nameStatus="task.status.text" />
      </h2>
      <p>
        <strong>
          <small>
            {{ task.dateDedlaine }}
          </small>
        </strong>
      </p>

      <button class="btn primary" @click="showTask(task.id)">Посмотреть</button>
      <button class="btn danger" @click="deleteTask(task.id)">Удалить</button>
    </div>
  </template>
</template>

<script>
import AppStatus from "../components/AppStatus";
import { ref, computed } from "vue";
import { useStore, mapGetters } from "vuex";
import { useRouter } from "vue-router";

export default {
  components: { AppStatus },
  setup(props) {
    const store = useStore();
    const router = useRouter();

    const showTask = id => router.push(`/task/${id}`);
    const deleteTask = id => store.dispatch("deleteTask", id);

    return {
      tasks: computed(() => store.getters.tasks),
      activeTasks: computed(() => store.getters.tasksActive),
      loader: computed(() => store.getters.loader),
      errorMessage: computed(() => store.getters.errorMessage),
      showTask,
      deleteTask
    };
  }
};
</script>
