<template>
  <section class="place">
    <div class="place__hero">
      <p class="place__kicker">{{ copy.kicker }}</p>
      <h1>{{ copy.title }}</h1>
      <p>{{ copy.body }}</p>
      <button class="place__cta" type="button" @click="$emit('start')">
        Start practising
      </button>
    </div>

    <ul class="place__list">
      <li v-for="item in copy.items" :key="item.title" class="place__card">
        <span class="place__icon">
          <i :class="item.icon" />
        </span>
        <div>
          <h2>{{ item.title }}</h2>
          <p>{{ item.body }}</p>
        </div>
      </li>
    </ul>
  </section>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  tab: { type: String, required: true },
});

defineEmits(['start']);

const copy = computed(() => {
  if (props.tab === 'profile') {
    return {
      kicker: 'Page 4',
      title: 'Profile',
      body: 'Account and settings. The loop still starts with one tap.',
      items: [
        { icon: 'ri-user-3-line', title: 'Your account', body: 'Name, level and plan.' },
        { icon: 'ri-award-line', title: 'Certificates', body: 'What the trail added up to.' },
        { icon: 'ri-settings-3-line', title: 'Settings', body: 'Notifications, language, privacy.' },
      ],
    };
  }
  return {
    kicker: 'Page 2',
    title: 'Mentors',
    body: 'Chat, twins and Be support the loop — they don’t own the first tab.',
    items: [
      { icon: 'ri-robot-2-line', title: 'AI mentor', body: 'Free chat, ideally on WhatsApp.' },
      { icon: 'ri-user-star-line', title: 'Digital twins', body: 'Practise with a specific tutor.' },
      { icon: 'ri-bear-smile-line', title: 'Be', body: 'Solve doubts, as a destination.' },
      { icon: 'ri-error-warning-line', title: 'Review mistakes', body: 'What the last activity flagged.' },
    ],
  };
});
</script>

<style scoped>
.place {
  height: 100%;
  overflow-y: auto;
  padding-bottom: 120px;
  background: #fafafb;
  scrollbar-width: none;
}

.place::-webkit-scrollbar {
  display: none;
}

.place__hero {
  padding: 72px 20px 24px;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  background:
    radial-gradient(120% 140% at 100% 0%, rgba(214, 189, 255, 0.4) 0%, transparent 55%),
    linear-gradient(135deg, #20044e 0%, #3e0798 55%, #8134fe 130%);
}

.place__kicker {
  font: 500 11px/1 var(--bc-font-sans);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.78);
}

.place__hero h1 {
  font: 600 28px/1.1 var(--bc-font-sans);
  letter-spacing: -0.02em;
}

.place__hero > p {
  font: 400 14px/1.45 var(--bc-font-sans);
  color: rgba(255, 255, 255, 0.78);
  max-width: 320px;
}

.place__cta {
  margin-top: 6px;
  height: 44px;
  padding: 0 18px;
  border-radius: 12px;
  background: #fff;
  color: #3e0798;
  font: 500 14px/1 var(--bc-font-sans);
}

.place__list {
  list-style: none;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.place__card {
  display: flex;
  gap: 12px;
  align-items: flex-start;
  padding: 14px;
  background: #fff;
  border: 1px solid #eeeef1;
  border-radius: 16px;
}

.place__icon {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: #f2ebff;
  color: #8134fe;
  display: grid;
  place-items: center;
  flex-shrink: 0;
}

.place__icon i {
  font-size: 20px;
  line-height: 1;
}

.place__card h2 {
  font: 600 15px/1.25 var(--bc-font-sans);
  color: #27202c;
}

.place__card p {
  margin-top: 4px;
  font: 400 13px/1.35 var(--bc-font-sans);
  color: #42364a;
}
</style>
