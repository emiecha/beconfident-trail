<template>
  <div class="path">
    <header class="path__hero">
      <div class="path__chrome">
        <p class="path__crumb">B1 · Travel</p>
        <button class="streak" type="button" @click="$emit('streak')">
          <img class="streak__icon" src="/figma/icon-flame.svg" width="16" height="16" alt="" />
          <span>2 days</span>
        </button>
      </div>
      <h1>Your path</h1>
      <p class="path__progress-label">9 of 24 activities · 180 XP</p>
      <div class="path__bar" aria-hidden="true">
        <span style="width: 38%" />
      </div>
    </header>

    <div class="path__scroll">
      <article
        v-for="mod in modules"
        :key="mod.id"
        class="mod"
        :class="[`mod--${mod.state}`, { 'mod--open': isOpen(mod) }]"
      >
        <div class="mod__rail" aria-hidden="true">
          <span class="mod__node">
            <i v-if="mod.state === 'done'" class="ri-check-line" />
            <i v-else-if="mod.state === 'locked'" class="ri-lock-2-line" />
            <span v-else>{{ mod.currentIndex }}</span>
          </span>
        </div>

        <div class="card">
          <button
            class="card__head"
            type="button"
            :disabled="mod.state === 'locked'"
            :aria-expanded="isOpen(mod)"
            @click="toggle(mod)"
          >
            <span class="card__icon" :style="{ background: mod.tint }">
              <i :class="mod.icon" />
            </span>
            <div class="card__titles">
              <p class="card__kicker">{{ mod.kicker }}</p>
              <h2>{{ mod.title }}</h2>
              <p class="card__meta">{{ mod.meta }}</p>
            </div>
            <span v-if="mod.state === 'current'" class="card__now">Now</span>
            <i
              v-else-if="mod.state === 'done'"
              class="ri-arrow-down-s-line card__chevron"
              :class="{ 'card__chevron--open': isOpen(mod) }"
            />
            <i v-else class="ri-lock-2-line card__lock" />
          </button>

          <div class="card__track" aria-hidden="true">
            <span :style="{ width: mod.progress }" />
          </div>

          <ul v-if="isOpen(mod)" class="lessons">
            <li
              v-for="lesson in mod.lessons"
              :key="lesson.id"
              class="lesson"
              :class="[`lesson--${lesson.state}`]"
            >
              <i
                v-if="lesson.state === 'done'"
                class="ri-checkbox-circle-fill"
              />
              <i
                v-else-if="lesson.state === 'locked'"
                class="ri-lock-2-line"
              />
              <i v-else class="ri-play-circle-fill" />
              <span>{{ lesson.title }}</span>
              <span v-if="lesson.xp && lesson.state === 'done'" class="lesson__xp">{{ lesson.xp }} XP</span>
              <button
                v-if="lesson.state === 'current'"
                class="lesson__cta"
                type="button"
                @click="$emit('start')"
              >
                Start
              </button>
            </li>
          </ul>
        </div>
      </article>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

defineEmits(['start', 'streak']);

const modules = [
  {
    id: 'airport',
    state: 'done',
    title: 'Airport basics',
    kicker: 'Module 1',
    meta: '6 of 6 · 120 XP',
    progress: '100%',
    currentIndex: 6,
    icon: 'ri-plane-line',
    tint: 'linear-gradient(135deg, #3e0798, #8134fe)',
    lessons: [
      { id: 'a1', state: 'done', title: 'Check in', xp: 20 },
      { id: 'a2', state: 'done', title: 'Security questions', xp: 20 },
      { id: 'a3', state: 'done', title: 'Find the gate', xp: 20 },
      { id: 'a4', state: 'done', title: 'Boarding call', xp: 20 },
      { id: 'a5', state: 'done', title: 'Ask for help', xp: 20 },
      { id: 'a6', state: 'done', title: 'On the plane', xp: 20 },
    ],
  },
  {
    id: 'nyc',
    state: 'current',
    title: 'New York',
    kicker: 'Module 2',
    meta: '3 of 6 · 60 XP',
    progress: '50%',
    currentIndex: 3,
    icon: 'ri-building-4-line',
    tint: 'linear-gradient(135deg, #20044e, #8134fe)',
    lessons: [
      { id: 'l1', state: 'done', title: 'Book the flight', xp: 20 },
      { id: 'l2', state: 'done', title: 'At the gate', xp: 20 },
      { id: 'l3', state: 'done', title: 'Meet your host', xp: 20 },
      { id: 'l4', state: 'current', title: 'Let’s travel to New York', xp: 20 },
      { id: 'l5', state: 'locked', title: 'Order coffee', xp: 20 },
      { id: 'l6', state: 'locked', title: 'Ask for directions', xp: 20 },
    ],
  },
  {
    id: 'hotel',
    state: 'locked',
    title: 'At the hotel',
    kicker: 'Module 3',
    meta: 'Locked · 6 activities',
    progress: '0%',
    currentIndex: 0,
    icon: 'ri-hotel-bed-line',
    tint: 'linear-gradient(135deg, #605c71, #928fa3)',
    lessons: [
      { id: 'h1', state: 'locked', title: 'Check in at reception' },
      { id: 'h2', state: 'locked', title: 'Ask for the wifi' },
    ],
  },
  {
    id: 'city',
    state: 'locked',
    title: 'Getting around',
    kicker: 'Module 4',
    meta: 'Locked · 6 activities',
    progress: '0%',
    currentIndex: 0,
    icon: 'ri-subway-line',
    tint: 'linear-gradient(135deg, #605c71, #928fa3)',
    lessons: [
      { id: 'c1', state: 'locked', title: 'Buy a metro ticket' },
    ],
  },
];

const openId = ref('nyc');

function isOpen(mod) {
  if (mod.state === 'locked') return false;
  return openId.value === mod.id;
}

function toggle(mod) {
  if (mod.state === 'locked') return;
  openId.value = openId.value === mod.id ? null : mod.id;
}
</script>

<style scoped>
.path {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #fafafb;
}

.path__hero {
  position: relative;
  z-index: 2;
  padding: 64px 20px 16px;
  color: #fff;
  background:
    radial-gradient(120% 140% at 100% 0%, rgba(214, 189, 255, 0.4) 0%, transparent 55%),
    linear-gradient(135deg, #20044e 0%, #3e0798 55%, #8134fe 130%);
  box-shadow: 0 10px 30px rgba(129, 52, 254, 0.28);
}

.path__chrome {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.path__crumb {
  min-width: 0;
  font: 500 12px/1.2 var(--bc-font-sans);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.78);
}

.streak {
  display: flex;
  align-items: center;
  gap: 4px;
  flex-shrink: 0;
  height: 28px;
  padding: 6px 8px 6px 6px;
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.22);
  border-radius: 180px;
  color: #fff;
  font: 500 14px/1 var(--bc-font-sans);
  backdrop-filter: blur(6px);
}

.streak__icon {
  width: 16px;
  height: 16px;
}

.path__hero h1 {
  margin-top: 10px;
  font: 600 24px/1.1 var(--bc-font-sans);
  letter-spacing: -0.02em;
}

.path__progress-label {
  margin-top: 8px;
  font: 400 13px/1.3 var(--bc-font-sans);
  color: rgba(255, 255, 255, 0.78);
}

.path__bar {
  margin-top: 12px;
  height: 8px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.18);
  overflow: hidden;
}

.path__bar span {
  display: block;
  height: 100%;
  border-radius: 999px;
  background: #82e39c;
}

.path__scroll {
  flex: 1;
  overflow-y: auto;
  padding: 20px 16px 120px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  scrollbar-width: none;
}

.path__scroll::-webkit-scrollbar {
  display: none;
}

.mod {
  display: grid;
  grid-template-columns: 28px minmax(0, 1fr);
  gap: 12px;
  align-items: stretch;
}

.mod__rail {
  position: relative;
  display: flex;
  justify-content: center;
  padding-top: 18px;
}

.mod:not(:last-child) .mod__rail::after {
  content: '';
  position: absolute;
  top: 48px;
  bottom: -14px;
  left: 50%;
  width: 2px;
  transform: translateX(-50%);
  background: #d6bdff;
}

.mod--done:not(:last-child) .mod__rail::after,
.mod--current:not(:last-child) .mod__rail::after {
  background: #8134fe;
}

.mod__node {
  position: relative;
  z-index: 1;
  width: 28px;
  height: 28px;
  border-radius: 999px;
  display: grid;
  place-items: center;
  font: 600 12px/1 var(--bc-font-sans);
  background: #fff;
  border: 2px solid #d6bdff;
  color: #8134fe;
}

.mod--done .mod__node {
  background: #8134fe;
  border-color: #8134fe;
  color: #fff;
}

.mod--current .mod__node {
  background: #20044e;
  border-color: #20044e;
  color: #fff;
  box-shadow: 0 0 0 4px rgba(129, 52, 254, 0.18);
}

.mod--locked .mod__node {
  background: #eeeef1;
  border-color: #eeeef1;
  color: #928fa3;
}

.mod__node i {
  font-size: 14px;
  line-height: 1;
}

.card {
  background: #fff;
  border: 1px solid #eeeef1;
  border-radius: 16px;
  padding: 14px;
  text-align: left;
}

.mod--current .card {
  border-color: #d6bdff;
  box-shadow: 0 8px 24px rgba(129, 52, 254, 0.12);
}

.mod--locked .card {
  opacity: 0.72;
}

.card__head {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  width: 100%;
  text-align: left;
}

.card__head:disabled {
  cursor: default;
}

.card__icon {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  display: grid;
  place-items: center;
  flex-shrink: 0;
  color: #fff;
}

.card__icon i {
  font-size: 22px;
  line-height: 1;
}

.card__titles {
  flex: 1;
  min-width: 0;
}

.card__kicker {
  font: 500 11px/1 var(--bc-font-sans);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #928fa3;
}

.card__titles h2 {
  margin-top: 4px;
  font: 600 16px/1.25 var(--bc-font-sans);
  color: #27202c;
}

.card__meta {
  margin-top: 4px;
  font: 400 13px/1.3 var(--bc-font-sans);
  color: #42364a;
}

.card__now {
  flex-shrink: 0;
  height: 22px;
  padding: 0 8px;
  border-radius: 999px;
  background: #f2ebff;
  color: #3e0798;
  font: 600 11px/22px var(--bc-font-sans);
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.card__chevron,
.card__lock {
  color: #928fa3;
  font-size: 20px;
  line-height: 1;
  margin-top: 2px;
}

.card__chevron--open {
  transform: rotate(180deg);
  color: #8134fe;
}

.card__track {
  margin-top: 12px;
  height: 6px;
  border-radius: 999px;
  background: #eeeef1;
  overflow: hidden;
}

.card__track span {
  display: block;
  height: 100%;
  border-radius: 999px;
  background: #8134fe;
}

.mod--locked .card__track span {
  background: #c9c7d1;
}

.lessons {
  list-style: none;
  margin: 12px 0 0;
  padding: 10px 0 0;
  border-top: 1px solid #eeeef1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.lesson {
  display: flex;
  align-items: center;
  gap: 10px;
  min-height: 44px;
  padding: 6px 8px;
  border-radius: 12px;
  font: 500 14px/1.2 var(--bc-font-sans);
  color: #27202c;
}

.lesson i {
  font-size: 18px;
  width: 18px;
  color: #8134fe;
}

.lesson--locked {
  color: #928fa3;
}

.lesson--locked i {
  color: #c9c7d1;
}

.lesson--current {
  background: #f2ebff;
}

.lesson span {
  flex: 1;
  min-width: 0;
}

.lesson__xp {
  flex: 0 0 auto;
  font: 500 11px/1 var(--bc-font-sans);
  color: #928fa3;
}

.lesson--current .lesson__xp {
  display: none;
}

.lesson__cta {
  height: 32px;
  padding: 0 14px;
  border-radius: 8px;
  background: #8134fe;
  color: #fff;
  font: 500 13px/1 var(--bc-font-sans);
  box-shadow: 0 8px 18px rgba(129, 52, 254, 0.28);
}
</style>
