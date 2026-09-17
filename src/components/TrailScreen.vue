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
      <p class="trail__section">New York</p>

      <div
        v-for="node in nodes"
        :key="node.id"
        class="row"
        :class="[`row--${node.align}`, `row--${node.state}`, { 'row--fresh': stepped && (node.id === 'n4' || node.id === 'n5') }]"
        :ref="(el) => { if (node.state === 'current') setCurrent(el) }"
      >
        <button
          v-if="node.state === 'done'"
          class="dot dot--done"
          type="button"
          :aria-label="`${node.title}, completed`"
        >
          <i class="ri-check-line" />
          <span>{{ node.title }}</span>
        </button>

        <article v-else-if="node.state === 'current'" class="current">
          <img class="current__bg" :src="figma('hero-nyc.png')" width="350" height="210" alt="" />
          <div class="current__scrim" />
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
              <h2>{{ node.title }}</h2>
              <button class="current__cta" type="button" @click="$emit('start')">
                <span>Start</span>
                <img :src="figma('icon-play.svg')" width="20" height="20" alt="" />
              </button>
            </div>
          </div>
        </article>

        <button
          v-else-if="node.state === 'locked'"
          class="dot dot--locked"
          type="button"
          disabled
          :aria-label="`${node.title}, locked`"
        >
          <i class="ri-lock-2-line" />
          <span>{{ node.title }}</span>
        </button>

        <div v-else class="checkpoint">
          <div class="checkpoint__gem">
            <i class="ri-award-fill" />
          </div>
          <span>Module complete</span>
        </div>
      </div>
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

const stepped = ref(false);
let stepTimer;

watch(
  () => props.advanced,
  (next) => {
    clearTimeout(stepTimer);
    if (!next) {
      stepped.value = false;
      return;
    }
    stepped.value = false;
    stepTimer = setTimeout(() => {
      stepped.value = true;
    }, 480);
  },
  { immediate: true },
);

onBeforeUnmount(() => clearTimeout(stepTimer));

const currentIndex = computed(() => (stepped.value ? 4 : 3));

const nodes = computed(() => [
  { id: 'n1', state: 'done', title: 'Book the flight', align: 'left' },
  { id: 'n2', state: 'done', title: 'At the gate', align: 'center' },
  { id: 'n3', state: 'done', title: 'Meet your host', align: 'right' },
  { id: 'n4', state: stepped.value ? 'done' : 'current', title: 'Let’s travel to New York', align: 'center' },
  { id: 'n5', state: stepped.value ? 'current' : 'locked', title: 'Order coffee', align: 'left' },
  { id: 'n6', state: 'locked', title: 'Ask for directions', align: 'center' },
  { id: 'n7', state: 'checkpoint', title: 'Module complete', align: 'center' },
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

watch(stepped, async (next) => {
  if (!next) return;
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
  padding: 8px 0 120px;
  scrollbar-width: none;
}

.trail__scroll::-webkit-scrollbar {
  display: none;
}

.trail__section {
  padding: 8px 20px 16px;
  font: 500 11px/1 var(--bc-font-sans);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #77738c;
}

.row {
  position: relative;
  display: flex;
  width: 100%;
  padding: 10px 36px;
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

.row--fresh.row--done .dot--done i {
  animation: check-pop 520ms cubic-bezier(0.2, 0.9, 0.2, 1);
}

.row--fresh.row--current .current {
  animation: card-arrive 620ms cubic-bezier(0.2, 0.8, 0.2, 1);
}

@keyframes check-pop {
  0% {
    transform: scale(0.4);
    opacity: 0.2;
  }
  70% {
    transform: scale(1.18);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes card-arrive {
  from {
    transform: translateY(18px) scale(0.96);
    opacity: 0.35;
  }
  to {
    transform: none;
    opacity: 1;
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
