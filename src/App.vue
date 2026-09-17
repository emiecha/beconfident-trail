<template>
  <div class="studio">
    <div class="studio__meta">
      <h1>BeConfident · {{ variant === 'path' ? 'Path' : 'Trail' }}</h1>
      <p>{{ variant === 'path' ? 'Option B · modules as cards' : 'Option A · winding trail' }}</p>
      <div class="studio__switch" role="tablist" aria-label="Design variant">
        <button
          type="button"
          :class="{ 'is-on': variant === 'trail' }"
          @click="variant = 'trail'"
        >
          A · Trail
        </button>
        <button
          type="button"
          :class="{ 'is-on': variant === 'path' }"
          @click="variant = 'path'"
        >
          B · Path
        </button>
      </div>
    </div>
    <div class="phone">
      <HomeScreen :variant="variant" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import HomeScreen from './components/HomeScreen.vue';

const variant = ref('path');
</script>
