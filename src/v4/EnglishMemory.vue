<template>
  <div class="memory" role="dialog" aria-modal="true" aria-label="English Memory">
    <header class="memory__head">
      <button class="icon-btn" type="button" aria-label="Back" @click="$emit('close')">
        <i class="ri-arrow-left-s-line" />
      </button>
      <h1>English Memory</h1>
      <span class="icon-btn" aria-hidden="true" />
    </header>

    <p class="lead">Mistakes from your activities. Reviewing them can feed the streak. It does not move the path.</p>

    <ul>
      <li v-for="card in cards" :key="card.id" :class="{ 'is-done': card.done }">
        <div>
          <p class="kicker">{{ card.tag }}</p>
          <h2>{{ card.prompt }}</h2>
          <p>{{ card.hint }}</p>
        </div>
        <button class="cta" type="button" :disabled="card.done" @click="card.done = true">
          {{ card.done ? 'Reviewed' : 'Review' }}
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { reactive } from 'vue';

defineEmits(['close']);

const cards = reactive([
  {
    id: 'thought',
    tag: 'Pronunciation',
    prompt: 'thought',
    hint: 'From “Let’s travel to New York”.',
    done: false,
  },
  {
    id: 'coffee',
    tag: 'Phrase',
    prompt: 'I’d like a coffee, please',
    hint: 'From the café order activity.',
    done: false,
  },
  {
    id: 'went',
    tag: 'Grammar',
    prompt: 'went / gone',
    hint: 'Irregular past from yesterday’s review.',
    done: false,
  },
]);
</script>

<style scoped>
.memory {
  position: absolute;
  inset: 0;
  z-index: 11;
  overflow-y: auto;
  padding: 60px 20px 40px;
  background: #fff;
  scrollbar-width: none;
}

.memory::-webkit-scrollbar {
  display: none;
}

.memory__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.memory__head h1 {
  font: 500 20px/1.1 var(--bc-font-sans);
  color: #27202c;
}

.icon-btn {
  display: grid;
  place-items: center;
  width: 48px;
  height: 48px;
  font-size: 24px;
  color: #27202c;
}

.lead {
  margin: 12px 4px 20px;
  font: 400 14px/1.45 var(--bc-font-sans);
  color: #42364a;
}

ul {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 16px;
  border-radius: 16px;
  background: #f2ebff;
}

li.is-done {
  background: #fafafb;
}

.kicker {
  font: 500 12px/1.2 var(--bc-font-sans);
  color: #8134fe;
}

h2 {
  margin-top: 4px;
  font: 600 18px/1.2 var(--bc-font-sans);
  color: #27202c;
}

li p:last-of-type {
  margin-top: 4px;
  font: 400 13px/1.35 var(--bc-font-sans);
  color: #605c71;
}

.cta {
  flex-shrink: 0;
  height: 36px;
  padding: 0 14px;
  border-radius: 10px;
  background: #8134fe;
  color: #fff;
  font: 600 13px/1 var(--bc-font-sans);
}

.cta:disabled {
  background: #eeeef1;
  color: #928fa3;
}
</style>
