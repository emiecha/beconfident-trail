<template>
  <section class="place">
    <div class="place__hero">
      <p class="place__kicker">{{ copy.kicker }}</p>
      <h1>{{ copy.title }}</h1>
      <p>{{ copy.body }}</p>
    </div>
    <div v-if="tab === 'be'" class="place__be">
      <img src="/figma/be-mascot.svg" width="96" height="96" alt="Be" />
      <p>Realtime conversation would live here. Not part of this draft.</p>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  tab: { type: String, required: true },
});

const copy = computed(() => {
  if (props.tab === 'ranking') {
    return {
      kicker: 'Ranking',
      title: 'Your place in the club',
      body: 'Placeholder. Ranking stays on the tab bar for now — moving it off is a later recommendation.',
    };
  }
  if (props.tab === 'clube') {
    return {
      kicker: 'Club',
      title: 'Community',
      body: 'Events, notices and the feed would live here.',
    };
  }
  if (props.tab === 'perfil') {
    return {
      kicker: 'Profile',
      title: 'Your account',
      body: 'Progress, certificates and settings.',
    };
  }
  return {
    kicker: 'Be',
    title: 'Talk with Be',
    body: 'Entry point to realtime conversation. Off the nav bar is a later recommendation.',
  };
});
</script>

<style scoped>
.place {
  height: 100%;
  padding: 88px 24px 120px;
  background: linear-gradient(180deg, #20044e 0%, #fff 42%);
}

.place__hero {
  color: #fff;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.place__kicker {
  font: 500 11px/1 var(--bc-font-sans);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  opacity: 0.8;
}

.place h1 {
  font: 600 32px/1.1 var(--bc-font-sans);
}

.place p {
  font: 400 15px/1.45 var(--bc-font-sans);
  color: rgba(255, 255, 255, 0.78);
  max-width: 300px;
}

.place__be {
  margin-top: 48px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  text-align: center;
}

.place__be img {
  width: 96px;
  height: 96px;
  filter: drop-shadow(0 0 18px rgba(129, 52, 254, 0.45));
}

.place__be p {
  color: #42364a;
}
</style>
