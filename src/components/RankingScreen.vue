<template>
  <div class="rank" role="dialog" aria-modal="true" aria-label="Ranking">
    <header class="rank__head">
      <button class="icon-btn" type="button" aria-label="Back" @click="$emit('close')">
        <i class="ri-arrow-left-s-line" />
      </button>
      <h1>Ranking</h1>
      <button class="icon-btn" type="button" aria-label="Info">
        <i class="ri-information-line" />
      </button>
    </header>

    <div class="chips" role="tablist">
      <button
        v-for="id in ['all', 'level', 'friends']"
        :key="id"
        class="chip"
        :class="{ 'chip--on': filter === id }"
        type="button"
        @click="filter = id"
      >
        {{ labels[id] }}
      </button>
    </div>
    <p class="range">
      <i class="ri-bar-chart-fill" />
      1–27 Feb 2025
    </p>

    <div class="podium">
      <article v-for="person in podium" :key="person.place" class="pod" :class="`pod--${person.place}`">
        <span class="badge" :class="`badge--${person.place}`">{{ person.place }}</span>
        <span v-if="person.letter" class="avatar avatar--letter">{{ person.letter }}</span>
        <img v-else class="avatar" :class="{ 'avatar--lg': person.place === 1 }" :src="person.photo" alt="" />
        <span v-if="person.place === 1" class="crown"><i class="ri-vip-crown-fill" /></span>
        <p class="pod__name">{{ person.name }}</p>
        <p class="pod__id">({{ person.code }})</p>
        <p class="pod__pts">{{ person.pts }} pts</p>
      </article>
    </div>

    <ul class="list">
      <li v-for="row in rest" :key="row.place">
        <span class="list__n">{{ row.place }}</span>
        <img :src="row.photo" width="48" height="48" alt="" />
        <span>
          <strong>{{ row.name }}</strong>
          <small>({{ row.code }})</small>
        </span>
        <em>{{ row.pts }} pts</em>
      </li>
    </ul>

    <aside class="you">
      <span class="list__n">40</span>
      <img :src="figma('rank-you.png')" width="48" height="48" alt="" />
      <span>
        <strong>You <small>(1020)</small></strong>
        398 points
      </span>
      <button class="you__cta" type="button">Compare</button>
    </aside>
  </div>
</template>

<script setup>
import { figma } from '../figma.js';
import { ref } from 'vue';

defineEmits(['close']);

const filter = ref('level');
const labels = { all: 'All', level: 'My level', friends: 'Friends' };

const podium = [
  { place: 2, name: 'Lucas', code: '0245', pts: '15,000', photo: figma('rank-2.png') },
  { place: 1, name: 'Sofia', code: '1010', pts: '15,000', photo: figma('rank-1.png') },
  { place: 3, name: 'Bruno', code: '8291', pts: '15,000', letter: 'B' },
];

const rest = [
  { place: 4, name: 'Amina', code: '1010', pts: '12,000', photo: figma('rank-3.png') },
  { place: 5, name: 'Jia', code: '1010', pts: '11,000', photo: figma('rank-4.png') },
  { place: 6, name: 'Noah', code: '1010', pts: '10,000', photo: figma('tutor-johny.png') },
];
</script>

<style scoped>
.rank {
  position: absolute;
  inset: 0;
  z-index: 11;
  overflow-y: auto;
  padding: 60px 20px 120px;
  background: #fff;
  scrollbar-width: none;
}

.rank::-webkit-scrollbar {
  display: none;
}

.rank__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.rank__head h1 {
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

.chips {
  display: flex;
  gap: 8px;
  width: max-content;
  margin: 16px auto 12px;
  padding: 4px;
  border-radius: 999px;
  background: #efeef0;
}

.chip {
  height: 40px;
  padding: 0 20px;
  border-radius: 999px;
  font: 500 14px/1 var(--bc-font-sans);
  color: #27202c;
}

.chip--on {
  background: #20044e;
  color: #fff;
}

.range {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  font: 400 14px/1 var(--bc-font-sans);
  color: #707070;
}

.podium {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin: 24px 0 8px;
}

.pod {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 114px;
  text-align: center;
  gap: 8px;
}

.badge {
  display: grid;
  place-items: center;
  width: 24px;
  height: 24px;
  border-radius: 999px;
  font: 600 10px/1 var(--bc-font-sans);
  color: #27202c;
  background: #d9d9d9;
}

.badge--1 {
  background: #f0f050;
}

.badge--3 {
  background: #ea7748;
}

.avatar {
  width: 48px;
  height: 48px;
  object-fit: cover;
  border-radius: 999px;
}

.avatar--lg {
  width: 80px;
  height: 80px;
}

.avatar--letter {
  display: grid;
  place-items: center;
  background: #d2ed78;
  font: 500 16px/1 var(--bc-font-sans);
  color: #272f00;
}

.crown {
  position: absolute;
  top: 92px;
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  border-radius: 999px;
  background: #8134fe;
  color: #fff;
  font-size: 14px;
}

.pod--1 .crown {
  top: 118px;
}

.pod__name {
  margin-top: 8px;
  font: 500 16px/1.1 var(--bc-font-sans);
  color: #27202c;
}

.pod__id,
.pod__pts,
.list small,
.list em,
.you {
  font: 400 12px/1.1 var(--bc-font-sans);
  color: #42364a;
}

.pod__id {
  color: #707070;
}

.list {
  list-style: none;
}

.list li,
.you {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
}

.list img,
.you img {
  width: 48px;
  height: 48px;
  object-fit: cover;
  border-radius: 999px;
}

.list__n {
  width: 32px;
  font: 400 12px/1.1 var(--bc-font-sans);
  color: #42364a;
}

.list span,
.you span {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.list strong,
.you strong {
  font: 500 16px/1.1 var(--bc-font-sans);
  color: #27202c;
}

.list small,
.you small {
  color: #707070;
  font-weight: 400;
}

.list em {
  font-style: normal;
  text-align: right;
  width: 80px;
}

.you {
  position: sticky;
  bottom: 16px;
  margin-top: 8px;
  border-radius: 16px;
  background: #f2ebff;
}

.you__cta {
  height: 44px;
  padding: 0 16px;
  border-radius: 12px;
  background: #20044e;
  color: #fff;
  font: 500 14px/1 var(--bc-font-sans);
}
</style>
