<template>
  <span class="badge" :class="type">{{ nameStatus }}</span>
</template>
<script>
export default {
  props: {
    nameStatus: String,
    type:String,
  }
};
</script>
