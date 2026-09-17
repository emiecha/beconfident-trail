<template>
  <div class="streak" role="dialog" aria-modal="true" aria-label="Streak">
    <header class="hero">
      <div class="hero__bar">
        <button class="icon-btn" type="button" aria-label="Back" @click="$emit('close')">
          <i class="ri-arrow-left-s-line" />
        </button>
        <p>Current streak</p>
        <button class="icon-btn" type="button" aria-label="Info">
          <i class="ri-information-line" />
        </button>
      </div>
      <h1>15 consecutive days</h1>
      <img class="hero__flame" :src="figma('icon-flame.svg')" width="64" height="64" alt="" />
      <p class="hero__record">Record: 50 days</p>
    </header>

    <div class="body">
      <button class="protect" type="button">
        <span>
          <strong>Protect your streak</strong>
          <small>
            <i class="ri-shield-flash-fill" />
            Chances (2/2) to recover
          </small>
        </span>
        <i class="ri-arrow-right-s-line" />
      </button>

      <aside class="owl">
        <p>Keep your streak going from Coruja on BeConfident</p>
        <img :src="figma('be-face.svg')" width="56" height="56" alt="" />
      </aside>

      <h2>Streak calendar</h2>
      <div class="cal-head">
        <span class="year">2026 <i class="ri-arrow-down-s-line" /></span>
        <button class="today-chip" type="button">Today</button>
      </div>
      <div class="month">
        <button type="button" aria-label="Previous"><i class="ri-arrow-left-s-line" /></button>
        <strong>July 2026</strong>
        <button type="button" aria-label="Next"><i class="ri-arrow-right-s-line" /></button>
      </div>
      <div class="cal">
        <span v-for="d in ['S', 'M', 'T', 'W', 'T', 'F', 'S']" :key="d" class="cal__dow">{{ d }}</span>
        <span v-for="n in 3" :key="'e' + n" />
        <span v-for="n in 31" :key="n" class="day" :class="dayClass(n)">{{ n }}</span>
      </div>

      <div class="goal-head">
        <h2>Chosen goal</h2>
        <button type="button">Change</button>
      </div>
      <article class="goal">
        <p class="goal__kicker">English for Travel</p>
        <p class="goal__title">Backpacker + 30 days</p>
        <p class="goal__left">15 days left</p>
        <div class="goal__bar"><span /></div>
        <p class="goal__meta">15/30 days · 50%</p>
      </article>

      <div class="goal-head">
        <h2>Achievements</h2>
        <span>3 of 6</span>
      </div>
      <div class="stamps">
        <article class="stamp stamp--on">
          <img :src="figma('stamp-star.svg')" width="86" height="86" alt="" />
          <p>Tourist</p>
        </article>
        <article class="stamp stamp--on">
          <img :src="figma('stamp-star.svg')" width="86" height="86" alt="" />
          <p>Backpacker</p>
        </article>
        <article class="stamp stamp--on">
          <img :src="figma('stamp-star.svg')" width="86" height="86" alt="" />
          <p>Pilot</p>
        </article>
        <article class="stamp">
          <img :src="figma('stamp-star-muted.svg')" width="86" height="86" alt="" />
          <p>Nomad</p>
        </article>
      </div>
      <button class="link" type="button">See full passport</button>

      <h2>Learn more</h2>
      <button class="faq" type="button">What is Streak? <i class="ri-arrow-right-s-line" /></button>
      <button class="faq" type="button">How to keep your Streak? <i class="ri-arrow-right-s-line" /></button>
    </div>
  </div>
</template>

<script setup>
import { figma } from '../figma.js';
defineEmits(['close']);

function dayClass(n) {
  if (n === 16) return 'day--today';
  if (n <= 15) return 'day--done';
  return '';
}
</script>

<style scoped>
.streak {
  position: absolute;
  inset: 0;
  z-index: 11;
  overflow-y: auto;
  background: #fff;
  scrollbar-width: none;
}

.streak::-webkit-scrollbar {
  display: none;
}

.hero {
  position: relative;
  padding: 54px 20px 28px;
  background: linear-gradient(180deg, #ffd0b8 0%, #ff7947 100%);
  color: #fff;
}

.hero__bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #27202c;
  font: 500 16px/1.1 var(--bc-font-sans);
}

.icon-btn {
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  font-size: 22px;
  color: #27202c;
}

.hero h1 {
  margin-top: 20px;
  max-width: 240px;
  font: 600 36px/1.1 var(--bc-font-sans);
}

.hero__flame {
  position: absolute;
  right: 24px;
  top: 92px;
  width: 72px;
  height: 72px;
  filter: brightness(10);
}

.hero__record {
  margin-top: 12px;
  font: 400 14px/1.2 var(--bc-font-sans);
}

.body {
  padding: 20px 20px 40px;
}

.protect,
.owl,
.faq {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 16px;
  border-radius: 16px;
  text-align: left;
}

.protect {
  background: #fff4ee;
  border: 1px solid #ffd0b8;
}

.protect strong,
h2 {
  display: block;
  font: 500 16px/1.2 var(--bc-font-sans);
  color: #27202c;
}

.protect small {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 6px;
  font: 400 13px/1.2 var(--bc-font-sans);
  color: #42364a;
}

.owl {
  margin: 12px 0 24px;
  background: #f2ebff;
}

.owl p {
  font: 500 14px/1.3 var(--bc-font-sans);
  color: #27202c;
}

.owl img {
  width: 56px;
  height: 56px;
}

.cal-head,
.month,
.goal-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 12px 0;
}

.year,
.today-chip,
.goal-head button,
.link {
  font: 500 14px/1 var(--bc-font-sans);
  color: #8134fe;
}

.today-chip {
  height: 32px;
  padding: 0 12px;
  border-radius: 999px;
  background: #f2ebff;
}

.month strong {
  font: 500 16px/1 var(--bc-font-sans);
  color: #27202c;
}

.cal {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8px 0;
  margin-bottom: 24px;
  text-align: center;
}

.cal__dow,
.day {
  font: 500 13px/32px var(--bc-font-sans);
  color: #928fa3;
}

.day {
  color: #27202c;
  border-radius: 999px;
}

.day--done {
  background: #ff7947;
  color: #fff;
}

.day--today {
  box-shadow: inset 0 0 0 1.5px #ff7947;
}

.goal {
  padding: 16px;
  border-radius: 16px;
  background: #f3fbf4;
  margin-bottom: 24px;
}

.goal__kicker {
  font: 400 12px/1.2 var(--bc-font-sans);
  color: #42364a;
}

.goal__title {
  margin-top: 4px;
  font: 600 16px/1.2 var(--bc-font-sans);
  color: #27202c;
}

.goal__left {
  margin: 8px 0;
  font: 400 13px/1.2 var(--bc-font-sans);
  color: #2f7a44;
}

.goal__bar {
  height: 8px;
  border-radius: 999px;
  background: #d8f0dc;
}

.goal__bar span {
  display: block;
  width: 50%;
  height: 100%;
  border-radius: 999px;
  background: #82e39c;
}

.goal__meta {
  margin-top: 8px;
  font: 400 12px/1 var(--bc-font-sans);
  color: #42364a;
}

.stamps {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
}

.stamp {
  text-align: center;
}

.stamp img {
  width: 72px;
  height: 72px;
}

.stamp p {
  font: 500 11px/1.2 var(--bc-font-sans);
  color: #c9c7d1;
}

.stamp--on p {
  color: #27202c;
}

.link {
  display: block;
  width: 100%;
  margin: 12px 0 20px;
  text-align: center;
}

.faq {
  border: 1px solid #eeeef1;
  margin-bottom: 8px;
  font: 400 14px/1.2 var(--bc-font-sans);
  color: #27202c;
}

h2 {
  margin: 8px 0 12px;
}
</style>
