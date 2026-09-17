<template>
  <div class="win" role="dialog" aria-modal="true" aria-label="Streak unlocked">
    <header class="win__bar">
      <div class="segs" aria-hidden="true">
        <span class="is-on" />
        <span />
        <span />
        <span />
      </div>
      <button class="help" type="button" aria-label="Help">
        <img :src="figma('icon-help-white.svg')" width="24" height="24" alt="" />
      </button>
    </header>

    <p class="win__kicker">Your new record!</p>
    <h1>10-day streak</h1>

    <img
      class="win__flame"
      :src="figma('streak-win-flame.png')"
      width="280"
      height="280"
      alt=""
    />

    <div class="week" aria-hidden="true">
      <div v-for="day in days" :key="day.label" class="week__day">
        <span>{{ day.label }}</span>
        <span class="week__dot" :class="{ 'week__dot--on': day.on }">
          <img
            v-if="day.on"
            :src="figma('streak-win-check.svg')"
            width="20"
            height="20"
            alt=""
          />
        </span>
      </div>
    </div>

    <p class="win__copy">People with a 30-day streak tend to become fluent 2× faster</p>

    <div class="win__actions">
      <button class="btn btn--light" type="button">
        Share achievement
        <img :src="figma('icon-share-up.svg')" width="20" height="20" alt="" />
      </button>
      <button class="btn btn--text" type="button" @click="$emit('continue')">Continue</button>
    </div>
  </div>
</template>

<script setup>
import { figma } from '../figma.js';

defineEmits(['continue', 'close']);

const days = [
  { label: 'M', on: true },
  { label: 'T', on: false },
  { label: 'W', on: false },
  { label: 'T', on: false },
  { label: 'F', on: false },
  { label: 'S', on: false },
  { label: 'S', on: false },
];
</script>

<style scoped>
.win {
  position: absolute;
  inset: 0;
  z-index: 11;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 64px 20px 28px;
  background: #20044e;
  color: #e0e0e0;
  text-align: center;
}

.win__bar {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 48px;
}

.segs {
  display: flex;
  gap: 8px;
  width: 238px;
}

.segs span {
  flex: 1;
  height: 4px;
  background: #42364a;
}

.segs .is-on {
  background: #8134fe;
}

.help {
  position: absolute;
  right: 0;
  top: 0;
  display: grid;
  place-items: center;
  width: 48px;
  height: 48px;
}

.help img {
  width: 24px;
  height: 24px;
}

.win__kicker {
  margin-top: 16px;
  font: 500 16px/17px var(--bc-font-sans);
  color: #e0e0e0;
}

.win h1 {
  margin-top: 16px;
  font: 500 32px/1.1 var(--bc-font-sans);
  background: linear-gradient(90deg, #8134fe 17%, #d6bdff 45%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.win__flame {
  width: 280px;
  height: 280px;
  margin-top: 8px;
  object-fit: contain;
  flex-shrink: 0;
  animation: flame-in 700ms cubic-bezier(0.2, 0.8, 0.2, 1);
}

.week {
  display: flex;
  gap: 12px;
  margin-top: 8px;
}

.week__day {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  font: 600 16px/1 var(--bc-font-sans);
  color: #a9a9a9;
}

.week__dot {
  width: 32px;
  height: 32px;
  border-radius: 100px;
  background: #42364a;
  display: grid;
  place-items: center;
}

.week__dot--on {
  background: #82e39c;
}

.week__dot img {
  width: 20px;
  height: 20px;
  filter: brightness(0) invert(1);
}

.win__copy {
  margin-top: 24px;
  max-width: 278px;
  font: 500 14px/1.5 var(--bc-font-sans);
  color: #e0e0e0;
}

.win__actions {
  margin-top: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  width: 100%;
}

.btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 48px;
  font: 500 16px/1 var(--bc-font-sans);
}

.btn--light {
  width: 100%;
  border-radius: 12px;
  background: #f2ebff;
  color: #27202c;
}

.btn--light img {
  width: 20px;
  height: 20px;
}

.btn--text {
  width: 195px;
  height: 56px;
  color: #fff;
}

@keyframes flame-in {
  from {
    transform: scale(0.84);
    opacity: 0.4;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
