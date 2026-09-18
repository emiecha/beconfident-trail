<template>
  <div class="home">
    <button class="streak" type="button" @click="$emit('streak')">
      <img class="streak__icon" :src="figma('icon-flame.svg')" width="16" height="16" alt="" />
      <span>{{ streakDays }} days</span>
    </button>

    <div class="home__main">
      <section class="lesson">
        <p class="lesson__kicker">Up next</p>
        <button class="lesson__card" type="button" @click="$emit('practice')">
          <img :src="figma('module-continue.png')" width="88" height="88" alt="" />
          <span class="lesson__copy">
            <strong>How to go to New York</strong>
            <span>New York · 1 of 5 activities</span>
          </span>
          <span class="lesson__cta">
            Practice
            <i class="ri-arrow-right-s-line" />
          </span>
        </button>
      </section>

      <section class="tutor" :aria-busy="switching">
        <h2>Talk with your tutor</h2>
        <div class="active">
          <template v-if="switching">
            <div class="skel skel--photo" />
            <div class="active__copy">
              <span class="skel skel--kicker" />
              <span class="skel skel--name" />
            </div>
          </template>
          <template v-else>
            <button
              class="active__photo"
              type="button"
              :aria-label="`Talk with ${active.name}`"
              @click="$emit('talk', active.name)"
            >
              <img :src="active.hero" width="96" height="96" :alt="active.name" />
              <img class="active__flag" :src="active.flag" width="24" height="24" alt="" />
              <span class="active__talk">
                <i class="ri-chat-3-fill" />
                Talk
              </span>
            </button>
            <div class="active__copy">
              <p class="active__kicker">Your tutor</p>
              <p class="active__name">{{ active.name }}</p>
              <p class="active__hint">Tap the photo to start a conversation</p>
            </div>
          </template>
        </div>
        <header class="block__head">
          <h3>Change tutor</h3>
          <button class="block__all" type="button">
            See all
            <i class="ri-arrow-right-s-line" />
          </button>
        </header>
        <div class="row">
          <template v-if="switching">
            <div v-for="n in 4" :key="`skel-${n}`" class="avatar" aria-hidden="true">
              <span class="skel skel--avatar" />
              <span class="skel skel--label" />
            </div>
          </template>
          <button
            v-else
            v-for="tutor in others"
            :key="tutor.id"
            class="avatar"
            type="button"
            @click="selectTutor(tutor.id)"
          >
            <span class="avatar__img">
              <img :src="tutor.photo" width="64" height="64" :alt="tutor.name" />
              <img class="avatar__flag" :src="tutor.flag" width="18" height="18" alt="" />
            </span>
            <span>{{ tutor.name }}</span>
          </button>
        </div>
      </section>

      <section class="block block--masters">
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
            <img class="master__photo" :src="master.photo" width="110" height="210" alt="" />
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
        <img :src="figma('be-face.svg')" width="64" height="64" alt="" />
        <span>
          <strong>Anything you’re unsure about in English?</strong>
          Let’s clear it up.
        </span>
        <i class="ri-arrow-right-s-line" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { figma } from '../figma.js';
import { computed, ref } from 'vue';

defineEmits(['practice', 'talk', 'be', 'streak', 'twins']);

defineProps({
  streakDays: { type: Number, default: 2 },
});

const switching = ref(false);
const activeId = ref('karina');

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

const active = computed(() => tutors.find((t) => t.id === activeId.value) ?? tutors[0]);
const others = computed(() => tutors.filter((t) => t.id !== activeId.value));

function selectTutor(id) {
  if (id === activeId.value || switching.value) return;
  switching.value = true;
  window.setTimeout(() => {
    activeId.value = id;
    switching.value = false;
  }, 520);
}
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  background: #fff;
}

.home__main {
  flex: 1;
  min-height: 0;
  overflow: hidden;
  padding: 72px 16px 96px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.lesson {
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex-shrink: 0;
}

.lesson__kicker {
  font: 500 11px/1 var(--bc-font-sans);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #928fa3;
}

.lesson__card {
  display: flex;
  align-items: center;
  gap: 14px;
  width: 100%;
  padding: 14px 14px 14px 12px;
  border: 1px solid #eeeef1;
  border-radius: 16px;
  text-align: left;
  background: #fff;
}

.lesson__card img {
  width: 88px;
  height: 88px;
  object-fit: cover;
  object-position: 50% 18%;
  border-radius: 14px;
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
  font: 600 20px/1.15 var(--bc-font-sans);
  color: #27202c;
}

.lesson__copy span {
  font: 400 13px/1.2 var(--bc-font-sans);
  color: #707070;
}

.lesson__cta {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  height: 44px;
  padding: 0 16px;
  border-radius: 12px;
  background: #8134fe;
  color: #fff;
  font: 500 14px/1 var(--bc-font-sans);
  box-shadow: 0 8px 20px rgba(129, 52, 254, 0.28);
  flex-shrink: 0;
}

.lesson__cta i {
  font-size: 16px;
}

.tutor {
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex-shrink: 0;
}

.tutor > h2 {
  font: 500 16px/1.1 var(--bc-font-sans);
  color: #000;
}

.tutor h3 {
  font: 500 14px/1.1 var(--bc-font-sans);
  color: #000;
}

.active {
  display: flex;
  flex-direction: row;
  align-items: center;
  text-align: left;
  gap: 14px;
  flex-shrink: 0;
}

.active__photo {
  position: relative;
  width: 96px;
  height: 108px;
  flex-shrink: 0;
  padding: 0;
  background: none;
}

.active__photo > img:first-child {
  width: 96px;
  height: 96px;
  object-fit: cover;
  object-position: 50% 18%;
  border-radius: 999px;
  box-shadow: 0 0 0 3px #8134fe, 0 12px 32px rgba(129, 52, 254, 0.28);
}

.active__flag {
  position: absolute;
  right: 2px;
  top: 2px;
  width: 24px;
  height: 24px;
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

.active__name {
  margin: 4px 0 6px;
  font: 600 24px/1.1 var(--bc-font-sans);
  color: #27202c;
}

.active__hint {
  font: 400 13px/1.3 var(--bc-font-sans);
  color: #707070;
}

.active__talk {
  position: absolute;
  left: 50%;
  bottom: 0;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  height: 24px;
  padding: 0 10px;
  border-radius: 999px;
  background: #20044e;
  color: #fff;
  font: 500 12px/1 var(--bc-font-sans);
  box-shadow: 0 6px 16px rgba(32, 4, 78, 0.35);
  transform: translateX(-50%);
  white-space: nowrap;
}

.active__talk i {
  font-size: 13px;
}

.block {
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex-shrink: 0;
}

.block--masters {
  flex: 1;
  min-height: 0;
  max-height: 148px;
}

.block__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.block__head h2,
.block__title h2 {
  font: 500 16px/1.1 var(--bc-font-sans);
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
  gap: 14px;
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
  gap: 8px;
  flex-shrink: 0;
  color: #42364a;
  font: 500 13px/1 var(--bc-font-sans);
}

.avatar__img {
  position: relative;
  width: 64px;
  height: 64px;
}

.avatar__img > img:first-child {
  width: 64px;
  height: 64px;
  object-fit: cover;
  border-radius: 999px;
}

.avatar__flag {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 18px;
  height: 18px;
  border-radius: 999px;
  border: 1.5px solid #fff;
  object-fit: cover;
}

.masters {
  display: flex;
  gap: 8px;
  height: 112px;
  min-height: 0;
  overflow: hidden;
}

.master {
  position: relative;
  flex: 1;
  min-width: 0;
  height: 100%;
  overflow: hidden;
  padding: 0;
  border-radius: 16px;
  background: linear-gradient(180deg, #3e0798, #8134fe);
  text-align: center;
}

.master__photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 50% 18%;
  color: transparent;
}

.master__scrim {
  position: absolute;
  inset: auto 0 0;
  height: 46%;
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
  font: 600 12px/1.05 var(--bc-font-sans);
  letter-spacing: -0.16px;
  color: #fff;
  white-space: pre-line;
}

.master__role {
  margin-top: 2px;
  font: 400 11px/1 var(--bc-font-sans);
  color: #e0e0e0;
}

.be {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 8px 12px 8px 8px;
  border: 1px solid #eeeef1;
  border-radius: 16px;
  text-align: left;
  flex-shrink: 0;
  position: relative;
  z-index: 1;
  background: #fff;
}

.be img {
  width: 64px;
  height: 64px;
  flex-shrink: 0;
}

.be span {
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
  min-width: 0;
  font: 400 13px/1.3 var(--bc-font-sans);
  color: #42364a;
}

.be strong {
  font: 600 14px/1.2 var(--bc-font-sans);
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

.skel {
  display: block;
  background: #eeeef1;
  animation: pulse 0.9s ease-in-out infinite;
}

.skel--photo,
.skel--avatar {
  border-radius: 999px;
}

.skel--photo {
  width: 96px;
  height: 96px;
  flex-shrink: 0;
}

.skel--avatar {
  width: 64px;
  height: 64px;
}

.skel--kicker {
  width: 72px;
  height: 10px;
  border-radius: 4px;
}

.skel--name {
  width: 118px;
  height: 22px;
  margin: 8px 0 12px;
  border-radius: 6px;
}

.skel--label {
  width: 44px;
  height: 10px;
  border-radius: 4px;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.45;
  }
}
</style>
