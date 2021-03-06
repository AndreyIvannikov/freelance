<template>
  <h3 class="text-white center">
    Задачи с id = <strong>{{ id }}</strong> нет.
  </h3>
</template>
<script>
export default {
  props: {
    id: Number
  }
};
</script>
