<template>
  <div class="store" role="dialog" aria-modal="true" aria-label="Store">
    <header class="store__head">
      <button class="icon-btn" type="button" aria-label="Back" @click="$emit('close')">
        <i class="ri-arrow-left-s-line" />
      </button>
      <h1>Store</h1>
      <span class="coins">
        <i class="ri-copper-coin-fill" />
        {{ coins }}
      </span>
    </header>

    <p class="lead">Spend coins you earn by finishing activities. Nothing here moves the path.</p>

    <ul>
      <li v-for="item in items" :key="item.id">
        <span class="icon" :style="{ background: item.tint }">
          <i :class="item.icon" />
        </span>
        <div>
          <h2>{{ item.title }}</h2>
          <p>{{ item.body }}</p>
        </div>
        <button
          class="buy"
          type="button"
          :disabled="owned[item.id] || coins < item.price"
          @click="buy(item)"
        >
          {{ owned[item.id] ? 'Owned' : item.price }}
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';

defineEmits(['close']);

const coins = ref(340);
const owned = reactive({});

const items = [
  {
    id: 'freeze',
    title: 'Streak freeze',
    body: 'Miss a day without breaking the streak.',
    price: 120,
    icon: 'ri-snowy-line',
    tint: '#e8f4ff',
  },
  {
    id: 'twin',
    title: 'Twin week pass',
    body: 'One extra digital twin conversation.',
    price: 200,
    icon: 'ri-user-star-line',
    tint: '#f2ebff',
  },
  {
    id: 'stamp',
    title: 'City stamp pack',
    body: 'Cosmetic seals for your passport.',
    price: 80,
    icon: 'ri-passport-line',
    tint: '#fff3e8',
  },
  {
    id: 'boost',
    title: 'Priority tutor slot',
    body: 'Jump the queue for Karina this week.',
    price: 160,
    icon: 'ri-flashlight-line',
    tint: '#eaf9ee',
  },
];

function buy(item) {
  if (owned[item.id] || coins.value < item.price) return;
  coins.value -= item.price;
  owned[item.id] = true;
}
</script>

<style scoped>
.store {
  position: absolute;
  inset: 0;
  z-index: 11;
  overflow-y: auto;
  padding: 60px 20px 40px;
  background: #fff;
  scrollbar-width: none;
}

.store::-webkit-scrollbar {
  display: none;
}

.store__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.store__head h1 {
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

.coins {
  display: flex;
  align-items: center;
  gap: 4px;
  min-width: 48px;
  justify-content: flex-end;
  font: 600 14px/1 var(--bc-font-sans);
  color: #3e0798;
}

.coins i {
  color: #fac940;
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
  display: grid;
  grid-template-columns: 48px 1fr auto;
  gap: 12px;
  align-items: center;
  padding: 14px;
  border-radius: 16px;
  background: #fafafb;
}

.icon {
  display: grid;
  place-items: center;
  width: 48px;
  height: 48px;
  border-radius: 14px;
  font-size: 22px;
  color: #3e0798;
}

h2 {
  font: 600 15px/1.2 var(--bc-font-sans);
  color: #27202c;
}

li p {
  margin-top: 2px;
  font: 400 13px/1.35 var(--bc-font-sans);
  color: #605c71;
}

.buy {
  min-width: 64px;
  height: 36px;
  padding: 0 12px;
  border-radius: 10px;
  background: #8134fe;
  color: #fff;
  font: 600 13px/1 var(--bc-font-sans);
  box-shadow: 0 8px 20px rgba(129, 52, 254, 0.28);
}

.buy:disabled {
  background: #eeeef1;
  color: #928fa3;
  box-shadow: none;
}
</style>
