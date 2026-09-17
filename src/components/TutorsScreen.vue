<template>
  <div class="tutors" :class="{ 'tutors--toast': toastOpen }">
    <button class="streak" type="button" @click="$emit('streak')">
      <img class="streak__icon" :src="figma('icon-flame.svg')" width="16" height="16" alt="" />
      <span>{{ streakDays }} days</span>
    </button>

    <div class="tutors__main">
      <section class="active">
        <div class="active__photo">
          <img :src="active.hero" width="104" height="104" :alt="active.name" />
          <img class="active__flag" :src="active.flag" width="22" height="22" alt="" />
        </div>
        <div class="active__copy">
          <p class="active__kicker">Your tutor</p>
          <h1>{{ active.name }}</h1>
          <button class="active__cta" type="button" @click="$emit('talk', active.name)">
            Start conversation
          </button>
        </div>
      </section>

      <section class="block">
        <header class="block__head">
          <h2>Other tutors</h2>
          <button class="block__all" type="button">
            See all
            <i class="ri-arrow-right-s-line" />
          </button>
        </header>
        <div class="row">
          <button
            v-for="tutor in tutors"
            :key="tutor.id"
            class="avatar"
            :class="{ 'avatar--on': tutor.id === activeId }"
            type="button"
            @click="activeId = tutor.id"
          >
            <span class="avatar__img">
              <img :src="tutor.photo" width="52" height="52" :alt="tutor.name" />
              <img class="avatar__flag" :src="tutor.flag" width="16" height="16" alt="" />
            </span>
            <span>{{ tutor.name }}</span>
          </button>
        </div>
      </section>

      <section class="block">
        <header class="block__head">
          <div class="block__title">
            <span class="chip">
              <i class="ri-sparkling-2-fill" />
              New
            </span>
            <h2>English with Masters</h2>
          </div>
          <button class="block__all block__all--brand" type="button" @click="$emit('twins', 'brian')">
            See all
            <i class="ri-arrow-right-s-line" />
          </button>
        </header>
        <div class="masters">
          <button
            v-for="master in masters"
            :key="master.id"
            class="master"
            type="button"
            @click="$emit('twins', master.id)"
          >
            <img class="master__photo" :src="master.photo" width="96" height="140" alt="" />
            <div class="master__scrim" />
            <img class="master__flag" :src="master.flag" width="20" height="20" alt="" />
            <div class="master__copy">
              <p class="master__name">{{ master.name }}</p>
              <p class="master__role">{{ master.role }}</p>
            </div>
          </button>
        </div>
      </section>

      <button class="be" type="button" @click="$emit('be')">
        <img :src="figma('be-face.svg')" width="56" height="56" alt="" />
        <span>
          <strong>Anything you’re unsure about in English?</strong>
          Let’s clear it up.
        </span>
        <i class="ri-arrow-right-s-line" />
      </button>
    </div>

    <aside v-if="toastOpen" class="toast" role="status">
      <div class="toast__copy">
        <img :src="figma('icon-whatsapp.svg')" width="20" height="20" alt="" />
        <div class="toast__text">
          <p class="toast__kicker">Did you know?</p>
          <p class="toast__line">You can talk to your tutor on WhatsApp too.</p>
        </div>
        <button class="toast__close" type="button" aria-label="Dismiss" @click="toastOpen = false">
          <i class="ri-close-line" />
        </button>
      </div>
      <a
        class="toast__cta"
        href="https://wa.me/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Open WhatsApp
      </a>
    </aside>
  </div>
</template>

<script setup>
import { figma } from '../figma.js';
import { computed, ref } from 'vue';

defineEmits(['talk', 'be', 'streak', 'twins']);

defineProps({
  streakDays: { type: Number, default: 2 },
});

const toastOpen = ref(true);

const tutors = [
  { id: 'karina', name: 'Karina', photo: figma('tutor-karina.png'), hero: figma('activity-tutor.png'), flag: figma('flag-us.png') },
  { id: 'mary', name: 'Mary', photo: figma('tutor-mary.png'), hero: figma('tutor-mary.png'), flag: figma('flag-in.png') },
  { id: 'johny', name: 'Johny', photo: figma('tutor-johny.png'), hero: figma('tutor-johny.png'), flag: figma('flag-uk.png') },
  { id: 'geofrey', name: 'Geofrey', photo: figma('tutor-geofrey.png'), hero: figma('tutor-geofrey.png'), flag: figma('flag-au.png') },
  { id: 'laura', name: 'Laura', photo: figma('tutor-laura.png'), hero: figma('tutor-laura.png'), flag: figma('flag-us.png') },
];

const masters = [
  {
    id: 'brian',
    name: 'Brian\nRequarth',
    role: 'Entrepreneur',
    photo: figma('master-brian.png'),
    flag: figma('flag-us.png'),
  },
  {
    id: 'daiane',
    name: 'Daiane dos\nSantos',
    role: 'Olympic athlete',
    photo: figma('master-daiane.png'),
    flag: figma('flag-br.png'),
  },
  {
    id: 'doug',
    name: 'Doug\nScherrer',
    role: 'Investor',
    photo: figma('master-doug.png'),
    flag: figma('flag-us.png'),
  },
];

const activeId = ref('karina');
const active = computed(() => tutors.find((t) => t.id === activeId.value) ?? tutors[0]);
</script>

<style scoped>
.tutors {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  background: #fff;
}

.tutors__main {
  flex: 1;
  min-height: 0;
  overflow: hidden;
  padding: 58px 16px 8px;
  display: flex;
  flex-direction: column;
}

.tutors:not(.tutors--toast) .tutors__main {
  padding-bottom: 96px;
}

.active {
  display: flex;
  flex-direction: row;
  align-items: center;
  text-align: left;
  gap: 12px;
  margin-bottom: 12px;
  flex-shrink: 0;
}

.active__photo {
  position: relative;
  width: 104px;
  height: 104px;
  flex-shrink: 0;
}

.active__photo > img:first-child {
  width: 104px;
  height: 104px;
  object-fit: cover;
  object-position: 50% 18%;
  border-radius: 999px;
  box-shadow: 0 0 0 3px #8134fe, 0 12px 32px rgba(129, 52, 254, 0.28);
}

.active__flag {
  position: absolute;
  right: 2px;
  bottom: 2px;
  width: 22px;
  height: 22px;
  border-radius: 999px;
  border: 2px solid #fff;
  object-fit: cover;
}

.active__copy {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-width: 0;
  flex: 1;
}

.active__kicker {
  font: 500 11px/1 var(--bc-font-sans);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #928fa3;
}

.active__copy h1 {
  margin: 4px 0 8px;
  font: 600 24px/1.1 var(--bc-font-sans);
  color: #27202c;
}

.active__cta {
  height: 36px;
  padding: 0 14px;
  border-radius: 12px;
  background: #8134fe;
  color: #fff;
  font: 500 13px/1 var(--bc-font-sans);
  box-shadow: 0 10px 30px rgba(129, 52, 254, 0.35);
}

.block {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 12px;
  flex-shrink: 0;
}

.block__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.block__head h2,
.block__title h2 {
  font: 500 14px/1.1 var(--bc-font-sans);
  color: #000;
}

.block__title {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
}

.chip {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  height: 22px;
  padding: 0 10px 0 8px;
  border-radius: 360px;
  background: #8134fe;
  color: #fff;
  font: 500 11px/1.4 var(--bc-font-sans);
}

.chip i {
  font-size: 12px;
}

.block__all {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  color: #302e38;
  font: 500 13px/1.1 var(--bc-font-sans);
}

.block__all--brand {
  color: #8134fe;
}

.block__all i {
  font-size: 18px;
}

.row {
  display: flex;
  gap: 12px;
  overflow-x: auto;
  scrollbar-width: none;
}

.row::-webkit-scrollbar {
  display: none;
}

.avatar {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
  color: #42364a;
  font: 500 12px/1 var(--bc-font-sans);
}

.avatar__img {
  position: relative;
  width: 52px;
  height: 52px;
}

.avatar__img > img:first-child {
  width: 52px;
  height: 52px;
  object-fit: cover;
  border-radius: 999px;
}

.avatar__flag {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 16px;
  height: 16px;
  border-radius: 999px;
  border: 1.5px solid #fff;
  object-fit: cover;
}

.avatar--on .avatar__img img {
  box-shadow: 0 0 0 2px #8134fe;
}

.masters {
  display: flex;
  gap: 10px;
  overflow-x: auto;
  scrollbar-width: none;
}

.masters::-webkit-scrollbar {
  display: none;
}

.master {
  position: relative;
  width: 96px;
  height: 140px;
  flex-shrink: 0;
  overflow: hidden;
  padding: 0;
  border-radius: 12px;
  background: linear-gradient(180deg, #3e0798, #8134fe);
  text-align: center;
}

.master__photo {
  width: 96px;
  height: 140px;
  object-fit: cover;
  object-position: 50% 20%;
  color: transparent;
}

.master__scrim {
  position: absolute;
  inset: auto 0 0;
  height: 70px;
  background: linear-gradient(180deg, transparent, #000);
}

.master__flag {
  position: absolute;
  top: 6px;
  right: 6px;
  width: 20px;
  height: 20px;
  border-radius: 8px;
  object-fit: cover;
}

.master__copy {
  position: absolute;
  left: 4px;
  right: 4px;
  bottom: 8px;
  text-align: center;
}

.master__name {
  font: 600 13px/1.05 var(--bc-font-sans);
  letter-spacing: -0.16px;
  color: #fff;
  white-space: pre-line;
}

.master__role {
  margin-top: 4px;
  font: 400 11px/1 var(--bc-font-sans);
  color: #e0e0e0;
}

.be {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  margin-top: auto;
  padding: 6px 10px 6px 6px;
  border: 1px solid #eeeef1;
  border-radius: 16px;
  text-align: left;
  flex-shrink: 0;
}

.be img {
  width: 56px;
  height: 56px;
  flex-shrink: 0;
}

.be span {
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex: 1;
  min-width: 0;
  font: 400 12px/1.25 var(--bc-font-sans);
  color: #42364a;
}

.be strong {
  font: 600 13px/1.2 var(--bc-font-sans);
  color: #27202c;
}

.be i {
  font-size: 18px;
  color: #928fa3;
}

.streak {
  position: absolute;
  top: 54px;
  right: 16px;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 4px;
  height: 28px;
  padding: 6px 8px 6px 6px;
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 180px;
  color: #000;
  font: 500 13px/1 var(--bc-font-sans);
}

.streak__icon {
  width: 16px;
  height: 16px;
}

.toast {
  flex-shrink: 0;
  z-index: 4;
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: 0 12px 92px;
  padding: 10px 12px;
  border-radius: 12px;
  background: #20044e;
}

.toast__copy {
  display: flex;
  align-items: flex-start;
  gap: 8px;
}

.toast__copy img {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  margin-top: 1px;
  filter: brightness(0) invert(1);
}

.toast__text {
  flex: 1;
  min-width: 0;
}

.toast__kicker {
  font: 600 12px/1.2 var(--bc-font-sans);
  color: #fff;
}

.toast__line {
  margin-top: 2px;
  font: 400 12px/1.2 var(--bc-font-sans);
  color: rgba(255, 255, 255, 0.86);
  white-space: nowrap;
}

.toast__cta {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 32px;
  border-radius: 8px;
  background: #fff;
  color: #20044e;
  font: 500 13px/1 var(--bc-font-sans);
}

.toast__close {
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  color: rgba(255, 255, 255, 0.8);
}

.toast__close i {
  font-size: 16px;
}
</style>
