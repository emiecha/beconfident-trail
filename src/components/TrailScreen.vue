<template>
  <div class="trail">
    <div class="trail__chrome">
      <p class="trail__crumb">B1 · Travel · New York · {{ currentIndex }} of 6</p>
      <button class="streak" type="button" @click="$emit('streak')">
        <img class="streak__icon" :src="figma('icon-flame.svg')" width="16" height="16" alt="" />
        <span>{{ streakDays }} days</span>
      </button>
    </div>

    <div ref="scroller" class="trail__scroll">
      <template v-for="item in items" :key="item.id">
        <p v-if="item.kind === 'section'" class="trail__section">
          {{ item.title }}
          <span v-if="item.locked" class="trail__lock">
            <i class="ri-lock-2-line" />
            Locked
          </span>
        </p>

        <div
          v-else
          class="row"
          :class="[
            `row--${item.align}`,
            `row--${item.state}`,
            {
              'row--leaving': phase === 1 && item.id === 'n4',
              'row--travel': phase === 2 && item.id === 'n4',
              'row--unlocking': phase === 2 && item.id === 'n5',
              'row--landing': phase >= 3 && item.id === 'n5',
            },
          ]"
          :ref="(el) => { if (item.state === 'current') setCurrent(el) }"
        >
          <button
            v-if="item.state === 'done'"
            class="dot dot--done"
            type="button"
            :aria-label="`${item.title}, completed`"
          >
            <i class="ri-check-line" />
            <span>{{ item.title }}</span>
          </button>

          <article
            v-else-if="item.state === 'current'"
            class="current"
            :class="{ 'current--leaving': phase === 1 && item.id === 'n4' }"
          >
            <img class="current__bg" :src="figma('hero-nyc.png')" width="350" height="210" alt="" />
            <div class="current__scrim" />
            <div class="current__check" v-if="phase === 1 && item.id === 'n4'" aria-hidden="true">
              <i class="ri-check-line" />
            </div>
            <div class="current__body">
              <img
                class="current__photo"
                :src="figma('activity-tutor.png')"
                width="88"
                height="132"
                alt=""
              />
              <div class="current__copy">
                <p class="current__eyebrow">Activity {{ currentIndex }} of 6</p>
                <h2>{{ item.title }}</h2>
                <button class="current__cta" type="button" @click="$emit('start')">
                  <span>Start</span>
                  <img :src="figma('icon-play.svg')" width="20" height="20" alt="" />
                </button>
              </div>
            </div>
          </article>

          <button
            v-else-if="item.state === 'locked'"
            class="dot dot--locked"
            type="button"
            disabled
            :aria-label="`${item.title}, locked`"
          >
            <i class="ri-lock-2-line" />
            <span>{{ item.title }}</span>
          </button>

          <div v-else class="checkpoint">
            <div class="checkpoint__gem">
              <i class="ri-award-fill" />
            </div>
            <span>Module complete</span>
          </div>

          <span v-if="phase === 2 && item.id === 'n4'" class="spark" aria-hidden="true" />
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { figma } from '../figma.js';
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';

defineEmits(['start', 'streak']);

const props = defineProps({
  advanced: { type: Boolean, default: false },
  streakDays: { type: Number, default: 2 },
});

const phase = ref(0);
const timers = [];

function later(fn, ms) {
  timers.push(setTimeout(fn, ms));
}

function clearTimers() {
  timers.splice(0).forEach(clearTimeout);
}

watch(
  () => props.advanced,
  (next) => {
    clearTimers();
    if (!next) {
      phase.value = 0;
      return;
    }
    phase.value = 0;
    later(() => {
      phase.value = 1;
    }, 700);
    later(() => {
      phase.value = 2;
    }, 1800);
    later(() => {
      phase.value = 3;
    }, 3200);
  },
  { immediate: true },
);

onBeforeUnmount(() => clearTimers());

const currentIndex = computed(() => (phase.value >= 3 ? 4 : 3));

const items = computed(() => [
  { id: 'sec-nyc', kind: 'section', title: 'New York' },
  { id: 'n1', state: 'done', title: 'Book the flight', align: 'left' },
  { id: 'n2', state: 'done', title: 'At the gate', align: 'center' },
  { id: 'n3', state: 'done', title: 'Meet your host', align: 'right' },
  { id: 'n4', state: phase.value >= 2 ? 'done' : 'current', title: 'Let’s travel to New York', align: 'center' },
  { id: 'n5', state: phase.value >= 3 ? 'current' : 'locked', title: 'Order coffee', align: 'left' },
  { id: 'n6', state: 'locked', title: 'Ask for directions', align: 'center' },
  { id: 'n7', state: 'checkpoint', title: 'Module complete', align: 'center' },
  { id: 'sec-hotel', kind: 'section', title: 'At the hotel', locked: true },
  { id: 'h1', state: 'locked', title: 'Check in at reception', align: 'left' },
  { id: 'h2', state: 'locked', title: 'Ask for the wifi', align: 'center' },
  { id: 'h3', state: 'locked', title: 'Request extra towels', align: 'right' },
  { id: 'h4', state: 'locked', title: 'Report a problem', align: 'center' },
  { id: 'h5', state: 'locked', title: 'Order room service', align: 'left' },
  { id: 'h6', state: 'locked', title: 'Check out', align: 'center' },
  { id: 'sec-city', kind: 'section', title: 'Getting around', locked: true },
  { id: 'c1', state: 'locked', title: 'Buy a metro ticket', align: 'right' },
  { id: 'c2', state: 'locked', title: 'Ask which line to take', align: 'center' },
  { id: 'c3', state: 'locked', title: 'Change trains', align: 'left' },
  { id: 'c4', state: 'locked', title: 'Missed your stop', align: 'center' },
  { id: 'c5', state: 'locked', title: 'Take a taxi', align: 'right' },
  { id: 'c6', state: 'locked', title: 'Read a map', align: 'center' },
]);

const scroller = ref(null);
const currentEl = ref(null);

function setCurrent(el) {
  currentEl.value = el;
}

onMounted(async () => {
  await nextTick();
  scrollToCurrent(false);
});

watch(phase, async (next) => {
  if (next < 3) return;
  await nextTick();
  scrollToCurrent(true);
});

function scrollToCurrent(smooth) {
  const track = scroller.value;
  const current = currentEl.value;
  if (!track || !current) return;
  const top = current.offsetTop - track.clientHeight / 2 + current.clientHeight / 2;
  const y = Math.max(0, top);
  if (smooth && typeof track.scrollTo === 'function') {
    track.scrollTo({ top: y, behavior: 'smooth' });
    return;
  }
  track.scrollTop = y;
}
</script>

<style scoped>
.trail {
  display: flex;
  flex-direction: column;
  height: 100%;
  background:
    radial-gradient(120% 60% at 100% 0%, rgba(214, 189, 255, 0.28), transparent 55%),
    #fafafb;
}

.trail__chrome {
  position: relative;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 64px 20px 8px;
}

.trail__crumb {
  min-width: 0;
  font: 500 12px/1.2 var(--bc-font-sans);
  letter-spacing: 0.02em;
  color: #42364a;
}

.streak {
  display: flex;
  align-items: center;
  gap: 4px;
  flex-shrink: 0;
  height: 28px;
  padding: 6px 8px 6px 6px;
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 180px;
  color: #000;
  font: 500 14px/1 var(--bc-font-sans);
}

.streak__icon {
  width: 16px;
  height: 16px;
}

.trail__scroll {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 8px 0 160px;
  scrollbar-width: none;
  overscroll-behavior: contain;
}

.trail__scroll::-webkit-scrollbar {
  display: none;
}

.trail__section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 28px 20px 16px;
  font: 500 11px/1 var(--bc-font-sans);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #77738c;
}

.trail__section:first-child {
  padding-top: 8px;
}

.trail__lock {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  height: 22px;
  padding: 0 8px;
  border-radius: 999px;
  background: #eeeef1;
  color: #928fa3;
  font: 500 10px/1 var(--bc-font-sans);
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.trail__lock i {
  font-size: 12px;
}

.row {
  position: relative;
  display: flex;
  width: 100%;
  padding: 10px 36px;
  overflow: visible;
}

.row--left {
  justify-content: flex-start;
}

.row--center {
  justify-content: center;
}

.row--right {
  justify-content: flex-end;
}

.row--current {
  padding: 18px 20px;
}

.row:not(:last-child)::after {
  content: '';
  position: absolute;
  bottom: -10px;
  width: 3px;
  height: 20px;
  border-radius: 999px;
  background: #d6bdff;
  pointer-events: none;
}

.row--left:not(:last-child)::after {
  left: 80px;
}

.row--center:not(:last-child)::after,
.row--current:not(:last-child)::after {
  left: 50%;
  transform: translateX(-50%);
}

.row--right:not(:last-child)::after {
  right: 80px;
}

.row--done:not(:last-child)::after {
  background: #8134fe;
}

.dot {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  width: 88px;
  color: #42364a;
}

.dot i {
  display: grid;
  place-items: center;
  width: 56px;
  height: 56px;
  border-radius: 999px;
  font-size: 22px;
}

.dot span {
  font: 500 12px/1.2 var(--bc-font-sans);
  text-align: center;
}

.dot--done i {
  background: #8134fe;
  color: #fff;
  box-shadow: 0 8px 20px rgba(129, 52, 254, 0.28);
}

.dot--locked {
  color: #928fa3;
}

.dot--locked i {
  background: #eeeef1;
  color: #928fa3;
}

.current {
  position: relative;
  width: 350px;
  min-height: 196px;
  border-radius: 16px;
  overflow: hidden;
  background: #20044e;
  box-shadow: 0 10px 30px rgba(129, 52, 254, 0.28);
}

.current--leaving {
  animation: current-leave 1.05s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

.current__check {
  position: absolute;
  inset: 0;
  z-index: 3;
  display: grid;
  place-items: center;
  background: rgba(32, 4, 78, 0.28);
}

.current__check i {
  display: grid;
  place-items: center;
  width: 72px;
  height: 72px;
  border-radius: 999px;
  background: #8134fe;
  color: #fff;
  font-size: 36px;
  box-shadow: 0 0 0 12px rgba(129, 52, 254, 0.28), 0 16px 40px rgba(129, 52, 254, 0.45);
  animation: check-pop 900ms cubic-bezier(0.2, 0.9, 0.2, 1);
}

.row--travel .dot--done i {
  animation: check-pop 900ms cubic-bezier(0.2, 0.9, 0.2, 1);
}

.row--unlocking .dot--locked i {
  animation: unlock-pulse 1.3s ease-in-out infinite;
  color: #8134fe;
  background: #f2ebff;
}

.row--landing .current {
  animation: card-arrive 1.15s cubic-bezier(0.22, 1, 0.36, 1);
}

.spark {
  position: absolute;
  z-index: 5;
  top: 58%;
  left: 50%;
  width: 18px;
  height: 18px;
  border-radius: 999px;
  background: #8134fe;
  box-shadow: 0 0 0 8px rgba(129, 52, 254, 0.28), 0 0 22px 6px rgba(129, 52, 254, 0.5);
  pointer-events: none;
  animation: spark-move 1.35s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

@keyframes current-leave {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  35% {
    transform: scale(1.04);
  }
  100% {
    transform: scale(0.78);
    opacity: 0.2;
  }
}

@keyframes check-pop {
  0% {
    transform: scale(0.3);
    opacity: 0;
  }
  50% {
    transform: scale(1.22);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes unlock-pulse {
  0%,
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(129, 52, 254, 0.35);
  }
  50% {
    transform: scale(1.12);
    box-shadow: 0 0 0 10px rgba(129, 52, 254, 0.12);
  }
}

@keyframes card-arrive {
  from {
    transform: translateY(28px) scale(0.86);
    opacity: 0;
  }
  55% {
    transform: translateY(-6px) scale(1.03);
    opacity: 1;
  }
  to {
    transform: none;
    opacity: 1;
  }
}

@keyframes spark-move {
  0% {
    top: 55%;
    left: 50%;
    opacity: 0;
    transform: translate(-50%, 0) scale(0.4);
  }
  14% {
    opacity: 1;
    transform: translate(-50%, 0) scale(1.25);
  }
  100% {
    top: calc(100% + 52px);
    left: 80px;
    opacity: 1;
    transform: translate(-50%, 0) scale(1);
  }
}

.current__bg {
  position: absolute;
  inset: 0;
  width: 350px;
  height: 196px;
  object-fit: cover;
}

.current__scrim {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(32, 4, 78, 0.15), rgba(32, 4, 78, 0.72));
}

.current__body {
  position: relative;
  z-index: 1;
  display: flex;
  gap: 16px;
  padding: 16px;
}

.current__photo {
  width: 88px;
  height: 132px;
  object-fit: cover;
  border-radius: 12px;
  flex-shrink: 0;
}

.current__copy {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  min-width: 0;
}

.current__eyebrow {
  font: 400 13px/1.2 var(--bc-font-sans);
  color: #e0e0e0;
}

.current__copy h2 {
  margin: 6px 0 14px;
  font: 500 20px/1.2 var(--bc-font-sans);
  color: #fff;
}

.current__cta {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  height: 44px;
  padding: 0 16px 0 18px;
  background: #fff;
  border-radius: 12px;
  color: #27202c;
  font: 500 14px/1.1 var(--bc-font-sans);
}

.current__cta img {
  width: 20px;
  height: 20px;
}

.checkpoint {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  color: #3e0798;
}

.checkpoint__gem {
  display: grid;
  place-items: center;
  width: 56px;
  height: 56px;
  border-radius: 16px;
  background: #f2ebff;
  color: #8134fe;
  transform: rotate(45deg);
  box-shadow: 0 8px 20px rgba(129, 52, 254, 0.18);
}

.checkpoint__gem i {
  font-size: 22px;
  transform: rotate(-45deg);
}

.checkpoint span {
  font: 500 12px/1.2 var(--bc-font-sans);
}
</style>
