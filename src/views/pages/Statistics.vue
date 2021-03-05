<template>
  <div class="Statistics">
    <div class="card">
      <card />
    </div>
    <div class="charts">
      <charts />
    </div>
  </div>
</template>

<script>
import Card from '@/components/Card.vue';
import Charts from '@/components/Charts.vue';

export default {
  components: {
    Card,
    Charts,
  },
};
</script>
