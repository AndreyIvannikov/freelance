<template>
  <form class="card" @submit.prevent="createTask">
    <h1>Создать новую задачу</h1>
    <div class="form-control">
      <label for="title">Название</label>
      <input type="text" v-model="nameDedlaine" id="title" />
    </div>
    <div class="form-control">
      <label for="date">Дата дэдлайна</label>
      <input type="date" id="date" v-model="dateDedlaine" />
    </div>
    <div class="form-control">
      <label for="description">Описание</label>
      <textarea id="description" v-model="descriptionDedlaine"></textarea>
    </div>
    <button class="btn primary" :disabled="!isDisabled">Создать</button>
  </form>
</template>

<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  setup(props) {
    const store = useStore();
    const nameDedlaine = ref("");
    const descriptionDedlaine = ref("");
    const dateDedlaine = ref("");
    const router = useRouter();

    const createTask = () => {
      const date = new Date(dateDedlaine.value).setHours(23,59,59,999) > new Date().setHours(23,59,59,999)
      const dedlaine = {
        nameDedlaine: nameDedlaine.value,
        descriptionDedlaine: descriptionDedlaine.value,
        dateDedlaine: new Date().toLocaleDateString(),
        status: {
          text: date ? "В ождидании" : "Завершен",
          type: date ? "primary" : "danger",
          active: date ? true : false
        },
      };

      router.push("/");
      store.dispatch("addedTask", dedlaine);
    };

    const isDisabled = computed(() => {
      return (
        nameDedlaine.value !== "" &&
        descriptionDedlaine.value !== "" &&
        dateDedlaine.value !== ""
      );
    });

    return {
      nameDedlaine,
      descriptionDedlaine,
      dateDedlaine,
      createTask,
      isDisabled
    };
  }
};
</script>
