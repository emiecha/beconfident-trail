<template>
  <div class="modules">
    <header class="top">
      <span class="top__spacer" />
      <h1>Modules</h1>
      <button class="icon-btn" type="button" aria-label="Help">
        <i class="ri-question-line" />
      </button>
    </header>

    <button v-if="leadPractice" class="lesson" type="button" @click="$emit('practice')">
      <span class="lesson__top">
        <img :src="figma('module-continue.png')" width="104" height="104" alt="" />
        <span class="lesson__copy">
          <strong>How to go to New York</strong>
          <span>New York · 1 of 5 activities</span>
        </span>
      </span>
      <span class="lesson__cta">
        Practice
        <i class="ri-arrow-right-s-line" />
      </span>
    </button>

    <label v-if="!leadPractice" class="search">
      <i class="ri-search-line" />
      <input type="search" placeholder="Search activity, module..." />
    </label>

    <h2 class="trail">
      {{ leadPractice ? 'You are on Trail A1' : 'You’re on trail A1:' }}
      <span>Confident Beginnings</span>
    </h2>
    <button class="link" type="button">
      See all trails
      <i class="ri-arrow-right-s-line" />
    </button>

    <button class="cert" type="button">
      <span class="cert__lock">
        <i class="ri-lock-2-line" />
      </span>
      <span class="cert__copy">
        <strong>A1 level certificate</strong>
        <span>10 of 39 modules completed</span>
        <span class="bar"><i style="width: 26%" /></span>
      </span>
      <i class="ri-arrow-right-s-line cert__chevron" />
    </button>

    <template v-if="!leadPractice">
      <p class="label">Continue where you left off</p>
      <button class="resume" type="button" @click="$emit('practice')">
        <img :src="figma('module-continue.png')" width="350" height="220" alt="" />
        <span class="resume__scrim" />
        <span class="chip chip--new">New</span>
        <span class="resume__copy">
          <strong>How to go to New York</strong>
          <span class="bar bar--on-photo"><i style="width: 20%" /></span>
          <span class="resume__meta">
            <span>1 of 5 activities</span>
            <span class="resume__go">
              Continue
              <i class="ri-arrow-right-s-line" />
            </span>
          </span>
        </span>
      </button>
    </template>

    <p class="label">All modules</p>
    <label v-if="leadPractice" class="search search--modules">
      <i class="ri-search-line" />
      <input type="search" placeholder="Search activity, module..." />
    </label>
    <div class="grid">
      <button class="card" type="button" @click="$emit('invite')">
        <span class="card__cover card__cover--bonus">
          <i class="ri-lock-2-line" />
          <span class="chip chip--bonus">
            <i class="ri-sparkling-2-fill" />
            Exclusive bonus
          </span>
        </span>
        <span class="card__body">
          <strong>Invite 1 friend to unlock</strong>
          <span class="bar" />
          <span class="card__meta">
            <span>5 activities</span>
            <i class="ri-arrow-right-s-line" />
          </span>
        </span>
      </button>

      <button
        v-for="mod in modules"
        :key="mod.id"
        class="card"
        :class="{ 'card--soon': mod.state === 'soon' }"
        type="button"
        :disabled="mod.state === 'soon'"
        @click="openModule(mod)"
      >
        <span class="card__cover">
          <img :src="mod.cover" width="169" height="120" alt="" />
          <span v-if="mod.state === 'soon'" class="chip chip--soon">
            <i class="ri-time-line" />
            Coming soon
          </span>
        </span>
        <span class="card__body">
          <strong>{{ mod.title }}</strong>
          <template v-if="mod.state !== 'soon'">
            <span class="bar" :class="`bar--${mod.state}`">
              <i :style="{ width: mod.progress }" />
            </span>
            <span class="card__meta">
              <span>
                <i v-if="mod.state === 'done'" class="ri-checkbox-circle-fill card__check" />
                {{ mod.meta }}
              </span>
              <i class="ri-arrow-right-s-line" />
            </span>
          </template>
          <span v-else class="card__meta">5 activities</span>
        </span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { figma } from '../figma.js';

defineProps({
  leadPractice: { type: Boolean, default: false },
});

const emit = defineEmits(['practice', 'invite']);

const modules = [
  {
    id: 'stories',
    title: 'Daily stories',
    cover: figma('module-cover-1.png'),
    state: 'progress',
    progress: '20%',
    meta: '1 of 5 activities',
  },
  {
    id: 'hotel',
    title: 'At the hotel',
    cover: figma('module-cover-2.png'),
    state: 'soon',
    progress: '0%',
    meta: '5 activities',
  },
  {
    id: 'airport',
    title: 'Airport basics',
    cover: figma('module-cover-3.png'),
    state: 'done',
    progress: '100%',
    meta: '5 activities',
  },
  {
    id: 'around',
    title: 'Getting around',
    cover: figma('module-cover-4.png'),
    state: 'blue',
    progress: '20%',
    meta: '1 of 5 activities',
  },
  {
    id: 'restaurant',
    title: 'At a restaurant',
    cover: figma('module-cover-5.png'),
    state: 'blue',
    progress: '20%',
    meta: '1 of 5 activities',
  },
];

function openModule(mod) {
  if (mod.state === 'soon') return;
  emit('practice');
}
</script>

<style scoped>
.modules {
  height: 100%;
  overflow-y: auto;
  padding: 58px 20px 110px;
  background: #fff;
  scrollbar-width: none;
}

.modules::-webkit-scrollbar {
  display: none;
}

.top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 48px;
  margin-bottom: 12px;
}

.top h1 {
  font: 500 20px/1.1 var(--bc-font-sans);
  color: #27202c;
}

.top__spacer,
.icon-btn {
  width: 48px;
  height: 48px;
}

.icon-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #27202c;
  font-size: 24px;
}

.lesson {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 12px;
  width: 100%;
  margin-bottom: 16px;
  padding: 16px;
  border: 1.5px solid #d6bdff;
  border-radius: 16px;
  text-align: left;
  background: #fff;
  box-shadow: 0 10px 28px rgba(129, 52, 254, 0.12);
}

.lesson__top {
  display: flex;
  align-items: center;
  gap: 16px;
  min-width: 0;
}

.lesson img {
  width: 104px;
  height: 104px;
  object-fit: cover;
  object-position: 50% 18%;
  border-radius: 12px;
  flex-shrink: 0;
}

.lesson__copy {
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 0;
  flex: 1;
}

.lesson__copy strong {
  font: 600 22px/1.15 var(--bc-font-sans);
  color: #27202c;
}

.lesson__copy span {
  font: 400 14px/1.2 var(--bc-font-sans);
  color: #707070;
}

.lesson__cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 2px;
  width: 100%;
  height: 40px;
  flex-shrink: 0;
  border-radius: 12px;
  background: #8134fe;
  color: #fff;
  font: 500 14px/1 var(--bc-font-sans);
  box-shadow: 0 8px 20px rgba(129, 52, 254, 0.28);
}

.lesson__cta i {
  font-size: 16px;
}

.search {
  display: flex;
  align-items: center;
  gap: 10px;
  height: 56px;
  padding: 0 16px;
  border: 1px solid #e0e0e0;
  border-radius: 16px;
  color: #a9a9a9;
}

.search i {
  font-size: 20px;
}

.search input {
  flex: 1;
  min-width: 0;
  border: 0;
  outline: 0;
  background: transparent;
  font: 400 16px/1 var(--bc-font-sans);
  color: #27202c;
}

.search input::placeholder {
  color: #a9a9a9;
}

.search--modules {
  margin-bottom: 16px;
}

.trail {
  margin-top: 24px;
  font: 500 24px/1.26 var(--bc-font-sans);
  color: #27202c;
}

.trail span {
  display: block;
}

.link {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  margin-top: 12px;
  color: #8134fe;
  font: 500 14px/1.1 var(--bc-font-sans);
}

.link i {
  font-size: 20px;
}

.cert {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  margin-top: 16px;
  padding: 16px 12px 16px 16px;
  border: 1px solid #eeeef1;
  border-radius: 12px;
  text-align: left;
}

.cert__lock {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 72px;
  height: 52px;
  border-radius: 5px;
  background: #eeeef1;
  color: #928fa3;
  font-size: 24px;
  flex-shrink: 0;
}

.cert__copy {
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 0;
  flex: 1;
}

.cert__copy strong {
  font: 500 16px/1.36 var(--bc-font-sans);
  color: #27202c;
}

.cert__copy > span {
  font: 400 12px/1.1 var(--bc-font-sans);
  color: #707070;
}

.cert__chevron {
  color: #928fa3;
  font-size: 20px;
}

.bar {
  display: block;
  width: 100%;
  height: 8px;
  overflow: hidden;
  border-radius: 360px;
  background: #e0e0e0;
}

.bar i {
  display: block;
  height: 100%;
  border-radius: 360px;
  background: #8134fe;
}

.bar--done i {
  background: #82e39c;
}

.bar--blue i {
  background: #3b95f4;
}

.bar--on-photo {
  background: #fff;
}

.label {
  margin: 24px 0 12px;
  font: 500 14px/1.36 var(--bc-font-sans);
  color: #707070;
}

.resume {
  position: relative;
  display: block;
  width: 100%;
  height: 220px;
  overflow: hidden;
  padding: 0;
  border-radius: 16px;
  text-align: left;
  color: #fff;
}

.resume img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 50% 18%;
}

.resume__scrim {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.08) 20%, rgba(0, 0, 0, 0.72) 78%);
}

.chip {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  height: 24px;
  padding: 0 12px;
  border-radius: 360px;
  font: 500 12px/1.4 var(--bc-font-sans);
}

.chip--new {
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 1;
  background: #8134fe;
  color: #fff;
}

.chip--bonus {
  background: #8134fe;
  color: #fff;
  padding: 0 12px 0 8px;
}

.chip--soon {
  position: absolute;
  left: 50%;
  bottom: 16px;
  z-index: 1;
  transform: translateX(-50%);
  background: #fac940;
  color: #18171c;
  padding: 0 12px 0 8px;
  white-space: nowrap;
}

.resume__copy {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
}

.resume__copy strong {
  font: 500 20px/1.1 var(--bc-font-sans);
}

.resume__meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font: 500 14px/1.1 var(--bc-font-sans);
}

.resume__go {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.resume__go i {
  font-size: 20px;
}

.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  padding-bottom: 8px;
}

.card {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding: 0;
  border: 1px solid #eeeef1;
  border-radius: 16px;
  background: #fff;
  text-align: left;
  color: #000;
}

.card--soon {
  cursor: default;
}

.card__cover {
  position: relative;
  display: block;
  height: 120px;
  overflow: hidden;
  border-radius: 16px 16px 4px 4px;
  background: #d6bdff;
}

.card__cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card__cover--bonus {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  background: #20044e;
  color: #fff;
}

.card__cover--bonus > i {
  font-size: 24px;
}

.card__body {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
  min-height: 120px;
}

.card__body strong {
  font: 500 16px/1.1 var(--bc-font-sans);
}

.card__meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
  font: 400 12px/1.1 var(--bc-font-sans);
}

.card__meta > span {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.card__meta > i {
  font-size: 20px;
  color: #27202c;
}

.card__check {
  color: #82e39c;
  font-size: 16px;
}
</style>
