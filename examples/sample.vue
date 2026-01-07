<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';

interface Props {
  title: string;
  count?: number;
}

const props = withDefaults(defineProps<Props>(), {
  count: 0
});

const emit = defineEmits<{
  (e: 'update', value: number): void;
  (e: 'reset'): void;
}>();

const localCount = ref(props.count);
const isEven = computed(() => localCount.value % 2 === 0);

const increment = () => {
  localCount.value++;
  emit('update', localCount.value);
};

const reset = () => {
  localCount.value = 0;
  emit('reset');
};

onMounted(() => {
  console.log('Component mounted');
});
</script>

<template>
  <div class="counter">
    <h2>{{ title }}</h2>
    <p class="count" :class="{ even: isEven }">
      Count: {{ localCount }}
    </p>
    <div class="actions">
      <button @click="increment">
        Increment
      </button>
      <button @click="reset" v-if="localCount > 0">
        Reset
      </button>
    </div>
  </div>
</template>

<style scoped>
.counter {
  padding: 1.5rem;
  border-radius: 8px;
  background: var(--bg-secondary);
}

.count {
  font-size: 2rem;
  font-weight: 600;
}

.count.even {
  color: var(--color-success);
}

.actions {
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
}
</style>