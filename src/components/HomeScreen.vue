<template>
  <div class="home">
    <StatusBar :tone="tab === 'trail' ? 'dark' : 'light'" />

    <TrailScreen
      v-if="tab === 'trail'"
      @start="openSheet('activity')"
      @streak="openSheet('streak')"
    />

    <PathScreen
      v-else-if="tab === 'path'"
      @start="openSheet('activity')"
      @streak="openSheet('streak')"
    />

    <PlaceholderScreen v-else :tab="tab" />

    <TabBar :tab="tab" :variant="variant" @update:tab="tab = $event" />

    <div class="home-indicator" aria-hidden="true" />

    <Transition name="sheet">
      <div v-if="sheet" class="overlay" @click.self="closeSheet">
        <div class="sheet" role="dialog" aria-modal="true">
          <div class="sheet__handle" />
          <template v-if="sheet === 'activity'">
            <img class="sheet__hero" src="/figma/activity-tutor.png" width="88" height="132" alt="" />
            <p class="sheet__kicker">Activity 3 of 6</p>
            <h2>Let’s travel to New York</h2>
            <p class="sheet__body">This would open the activity — the core loop starts here.</p>
            <button class="sheet__cta" type="button" @click="closeSheet">Got it</button>
          </template>
          <template v-else>
            <h2>2-day streak</h2>
            <p class="sheet__body">The streak is present, not the protagonist. Calendar and protections would live here.</p>
            <button class="sheet__cta" type="button" @click="closeSheet">Keep practising</button>
          </template>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import PathScreen from './PathScreen.vue';
import PlaceholderScreen from './PlaceholderScreen.vue';
import StatusBar from './StatusBar.vue';
import TabBar from './TabBar.vue';
import TrailScreen from './TrailScreen.vue';

const props = defineProps({
  variant: { type: String, default: 'trail' },
});

const tab = ref(props.variant === 'path' ? 'path' : 'trail');
const sheet = ref(null);

function openSheet(id) {
  sheet.value = id;
}

function closeSheet() {
  sheet.value = null;
}

watch(
  () => props.variant,
  (next) => {
    tab.value = next === 'path' ? 'path' : 'trail';
  },
);

watch(tab, () => {
  sheet.value = null;
});
</script>

<style scoped>
.home {
  position: relative;
  width: 100%;
  height: 100%;
  background: #fff;
  overflow: hidden;
}

.home-indicator {
  position: absolute;
  z-index: 6;
  left: 50%;
  bottom: 8px;
  width: 134px;
  height: 5px;
  border-radius: 100px;
  background: #000;
  transform: translateX(-50%);
  pointer-events: none;
}

.overlay {
  position: absolute;
  inset: 0;
  z-index: 10;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: flex-end;
}

.sheet {
  width: 100%;
  background: #fff;
  border-radius: 24px 24px 0 0;
  padding: 12px 24px 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 8px;
}

.sheet__handle {
  width: 40px;
  height: 4px;
  border-radius: 999px;
  background: #eeeef1;
  margin-bottom: 12px;
}

.sheet h2 {
  font: 600 22px/1.2 var(--bc-font-sans);
  color: #27202c;
}

.sheet__kicker,
.sheet__body {
  font: 400 14px/1.45 var(--bc-font-sans);
  color: #42364a;
}

.sheet__hero {
  width: 88px;
  height: 132px;
  object-fit: cover;
  border-radius: 12px;
}

.sheet__cta {
  margin-top: 12px;
  width: 100%;
  height: 48px;
  border-radius: 12px;
  background: #8134fe;
  color: #fff;
  font: 500 14px/1.1 var(--bc-font-sans);
  box-shadow: 0 10px 30px rgba(129, 52, 254, 0.35);
}

.sheet-enter-active,
.sheet-leave-active {
  transition: opacity 180ms ease;
}

.sheet-enter-active .sheet,
.sheet-leave-active .sheet {
  transition: transform 220ms ease;
}

.sheet-enter-from,
.sheet-leave-to {
  opacity: 0;
}

.sheet-enter-from .sheet,
.sheet-leave-to .sheet {
  transform: translateY(24px);
}
</style>
