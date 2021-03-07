<template>
  <AppLoader v-if="loader" />
  <h2 v-if="errorMessage" class="card">{{ errorMessage }}</h2>

  <div class="card" v-if="task">
    <h2>{{ task.nameDedlaine }}</h2>
    <p>
      <strong>Статус</strong>:
      <AppStatus :type="task.status.type" :nameStatus="task.status.text" />
    </p>
    <p><strong>Дэдлайн</strong>: {{ new Date().toLocaleDateString() }}</p>
    <p><strong>Описание</strong>: {{ task.descriptionDedlaine }}</p>
    <div>
      <button class="btn" @click="changeStatusInState('Выполняется', 'danger', false)">
        Взять в работу
      </button>
      <button
        class="btn primary"
        @click="changeStatusInState('Завершено', 'primary', false)"
      >
        Завершить
      </button>
      <button
        class="btn danger"
        @click="changeStatusInState('Отменено', 'warning', false)"
      >
        Отменить
      </button>

      <button
        class="btn primary"
        @click="saveStatusInDatabase('Отменено', 'warning', false)"
      >
        Сохранить изменения
      </button>
    </div>
  </div>
</template>

<script>
import AppStatus from "../components/AppStatus";
import AppLoader from "../components/AppLoader";
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  components: { AppStatus,AppLoader },
  props: ["id"],

  setup(props) {
    const store = useStore();
    const router = useRouter();
    const id = props.id;
    const task = computed(() => store.getters.getTask)
    const loader = ref(true)
    // if (!task.value) router.push(`/${id}`);

    const changeStatusInState = (status, type, activeStatus) => {
      store.commit("changeStatusInState", { status, id, type, activeStatus });
    };

    const saveStatusInDatabase = () => {
      store.dispatch('saveStatusInDatabase',id)
    }

    onMounted(async ()=>{
      await store.dispatch('getTask',id)
      loader.value = await false
    })

    const errorMessage = computed(() => {
      return store.getters.errorMessage;
    });

    return {
      task,
      changeStatusInState,
      loader:computed(() => loader.value),
      errorMessage,
      saveStatusInDatabase
    };
  }
};
</script>

<style scoped>
</style>
