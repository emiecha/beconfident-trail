<template>
  <div class="home">
    <div class="home__main">
      <header class="home__bar">
        <p class="hello">Hi Emi</p>
        <button class="streak" type="button" @click="$emit('streak')">
          <img class="streak__icon" :src="figma('icon-flame.svg')" width="16" height="16" alt="" />
          <span>{{ streakDays }} days</span>
        </button>
      </header>
      <section class="lesson">
        <button class="lesson__card" type="button" @click="$emit('practice')">
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
      </section>

      <section class="tutor" :aria-busy="switching">
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
              class="active__hit"
              type="button"
              :aria-label="`Talk with ${active.name}`"
              @click="$emit('talk', active.name)"
            >
              <span class="active__photo">
                <img :src="active.hero" width="116" height="116" :alt="active.name" />
                <img class="active__flag" :src="active.flag" width="28" height="28" alt="" />
                <span class="active__talk">
                  <i class="ri-chat-3-fill" />
                  Talk
                </span>
              </span>
              <span class="active__copy">
                <span class="active__kicker">Your AI tutor</span>
                <span class="active__name">{{ active.name }}</span>
                <span class="active__hint">Let’s talk about whatever you want. This is yours — an open, personal conversation.</span>
              </span>
            </button>
            <button class="active__switch" type="button" @click.stop="openPicker">
              Switch tutors
              <i class="ri-arrow-right-s-line" />
            </button>
          </template>
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

    <Transition name="sheet">
      <div
        v-if="picking"
        class="picker"
        role="dialog"
        aria-modal="true"
        :aria-label="`Switch tutors · ${preview.name}`"
      >
        <img class="picker__hero" :src="preview.hero" width="390" height="844" :alt="preview.name" />
        <div class="picker__scrim" />

        <header class="picker__top">
          <button class="picker__back" type="button" aria-label="Back" @click="closePicker">
            <img :src="figma('icon-back.svg')" width="24" height="24" alt="" />
          </button>
          <div class="picker__controls">
            <button class="picker__chip" type="button" @click="paused = !paused">
              <img :src="figma('icon-pause-twin.svg')" width="16" height="16" alt="" />
              {{ paused ? 'Play' : 'Pause' }}
            </button>
            <button class="picker__chip" type="button" @click="speed = speed === '1x' ? '1.5x' : '1x'">
              <i class="ri-volume-up-line" />
              {{ speed }}
            </button>
          </div>
        </header>

        <div class="picker__dock">
          <div class="picker__voices" role="list">
            <button
              v-for="tutor in voices"
              :key="tutor.id"
              class="voice"
              :class="{ 'voice--on': tutor.id === previewId }"
              type="button"
              :aria-pressed="tutor.id === previewId"
              @click="previewId = tutor.id"
            >
              <span class="voice__ring">
                <img :src="tutor.photo" width="82" height="82" alt="" />
                <img
                  v-if="tutor.id === previewId"
                  class="voice__sel"
                  :src="figma('twin-selector.svg')"
                  width="88"
                  height="88"
                  alt=""
                />
                <img class="voice__flag" :src="tutor.flag" width="32" height="32" alt="" />
              </span>
              <span v-if="tutor.badge && tutor.id === previewId" class="voice__badge">{{ tutor.badge }}</span>
              <span class="voice__name">{{ tutor.name }}</span>
            </button>
          </div>
          <button class="picker__cta" type="button" @click="talkPreview">
            <i class="ri-phone-fill" />
            Talk with {{ preview.name }}
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { figma } from '../figma.js';
import { computed, ref } from 'vue';

const emit = defineEmits(['practice', 'talk', 'be', 'streak', 'twins', 'picking']);

defineProps({
  streakDays: { type: Number, default: 2 },
});

const switching = ref(false);
const picking = ref(false);
const paused = ref(false);
const speed = ref('1x');
const activeId = ref('karina');
const previewId = ref('karina');

const tutors = [
  { id: 'karina', name: 'Karina', photo: figma('tutor-karina.png'), hero: figma('activity-tutor.png'), flag: figma('flag-us.png'), badge: 'New!' },
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
const preview = computed(() => tutors.find((t) => t.id === previewId.value) ?? active.value);
const voices = computed(() => {
  const list = tutors.slice();
  const i = Math.max(0, list.findIndex((t) => t.id === previewId.value));
  const shift = (i - 2 + list.length) % list.length;
  return list.slice(shift).concat(list.slice(0, shift));
});

function setPicking(value) {
  picking.value = value;
  emit('picking', value);
}

function openPicker() {
  previewId.value = activeId.value;
  paused.value = false;
  speed.value = '1x';
  setPicking(true);
}

function closePicker() {
  const next = previewId.value;
  setPicking(false);
  if (next !== activeId.value) selectTutor(next);
}

function talkPreview() {
  const next = preview.value;
  setPicking(false);
  if (next.id !== activeId.value) activeId.value = next.id;
  emit('talk', next.name);
}

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
  position: relative;
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
  padding: 54px 16px 96px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.home__bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-shrink: 0;
  min-height: 32px;
  padding-top: 4px;
}

.hello {
  margin: 0;
  font: 600 22px/1.1 var(--bc-font-sans);
  color: #27202c;
}

.lesson {
  display: flex;
  flex-direction: column;
  flex: 1.55 1 216px;
  min-height: 0;
}

.lesson__card {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 12px;
  width: 100%;
  height: 100%;
  min-height: 0;
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
  flex: 1;
}

.lesson__card img {
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

.tutor {
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1 1 148px;
  min-height: 0;
  padding: 12px 14px;
}

.active {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  text-align: left;
  gap: 14px;
  flex: 1;
  min-height: 0;
}

.active__hit {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  min-width: 0;
  height: 100%;
  flex: 1;
  padding: 0 8px 0 0;
  text-align: left;
}

.active__photo {
  position: relative;
  width: 116px;
  height: 128px;
  flex-shrink: 0;
}

.active__photo > img:first-child {
  width: 116px;
  height: 116px;
  object-fit: cover;
  object-position: 50% 18%;
  border-radius: 999px;
  box-shadow: 0 0 0 3px #8134fe, 0 12px 32px rgba(129, 52, 254, 0.28);
}

.active__flag {
  position: absolute;
  right: 4px;
  top: 4px;
  width: 28px;
  height: 28px;
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
  padding: 28px 4px 0 0;
}

.active__kicker {
  white-space: nowrap;
  font: 500 11px/1 var(--bc-font-sans);
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: #928fa3;
}

.active__name {
  margin: 6px 0 8px;
  font: 600 26px/1.1 var(--bc-font-sans);
  color: #27202c;
}

.active__hint {
  font: 400 13px/1.35 var(--bc-font-sans);
  color: #42364a;
}

.active__switch {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  gap: 2px;
  color: #8134fe;
  font: 500 13px/1.1 var(--bc-font-sans);
}

.active__switch i {
  font-size: 18px;
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
  flex: 0.45 1 128px;
  min-height: 0;
  padding: 12px 14px 4px;
}

.masters {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  flex: 1;
  min-height: 104px;
  max-height: 118px;
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
  margin-top: 24px;
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
  flex-shrink: 0;
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
  width: 116px;
  height: 116px;
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

.skel--switch {
  width: 128px;
  height: 18px;
  margin-top: 8px;
  border-radius: 6px;
}

.skel--label {
  width: 44px;
  height: 10px;
  border-radius: 4px;
}

.picker {
  position: absolute;
  inset: 0;
  z-index: 13;
  overflow: hidden;
  background: #20044e;
}

.picker__hero {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 50% 12%;
}

.picker__scrim {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 42%;
  background: linear-gradient(180deg, rgba(15, 19, 25, 0) 0%, rgba(15, 19, 25, 0.4) 42%, rgba(32, 4, 78, 0.72) 100%);
  pointer-events: none;
}

.picker__top {
  position: absolute;
  top: 71px;
  left: 18px;
  right: 18px;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.picker__back {
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: linear-gradient(90deg, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.2));
  backdrop-filter: blur(50px);
}

.picker__controls {
  display: flex;
  align-items: center;
  gap: 12px;
}

.picker__chip {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  height: 40px;
  min-width: 48px;
  padding: 0 12px;
  border-radius: 12px;
  background: #fff;
  color: #27202c;
  font: 500 14px/17px var(--bc-font-sans);
}

.picker__chip i {
  font-size: 20px;
}

.picker__chip img {
  width: 16px;
  height: 16px;
}

.picker__dock {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 22px;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px;
}

.picker__voices {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 20px 0 16px;
}

.voice {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  min-width: 0;
  padding: 0;
  background: none;
}

.voice__ring {
  position: relative;
  display: block;
  width: 48px;
  height: 48px;
}

.voice--on .voice__ring {
  width: 82px;
  height: 82px;
}

.voice__ring > img:first-child {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 50% 12%;
  border-radius: 999px;
}

.voice__sel {
  position: absolute;
  inset: -4px;
  width: calc(100% + 8px);
  height: calc(100% + 8px);
  pointer-events: none;
}

.voice__flag {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 18px;
  height: 18px;
  border: 2px solid #fff;
  border-radius: 999px;
  object-fit: cover;
}

.voice--on .voice__flag {
  width: 32px;
  height: 32px;
}

.voice__badge {
  position: absolute;
  top: -10px;
  left: 58%;
  z-index: 1;
  padding: 6px;
  border-radius: 180px;
  background: #8134fe;
  font: 500 12px/1 var(--bc-font-sans);
  color: #fff;
  white-space: nowrap;
}

.voice__name {
  font: 500 12px/1 var(--bc-font-sans);
  letter-spacing: -0.32px;
  color: #fff;
}

.voice--on .voice__name {
  font-size: 16px;
}

.picker__cta {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  max-width: 350px;
  height: 48px;
  border-radius: 12px;
  background: #20044e;
  color: #fff;
  font: 500 14px/1.1 var(--bc-font-sans);
}

.picker__cta i {
  font-size: 20px;
}

.sheet-enter-active,
.sheet-leave-active {
  transition: opacity 180ms ease;
}

.sheet-enter-from,
.sheet-leave-to {
  opacity: 0;
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
