<template>
  <div
    class="done"
    :class="`done--${step}`"
    role="dialog"
    aria-modal="true"
    aria-label="Activity follow-up"
    @click="advance"
  >
    <template v-if="step === 0">
      <p class="done__hello">Hey Mel,</p>
      <h1>Loading your activity</h1>
      <div class="toggle" aria-hidden="true">
        <span class="toggle__knob">
          <i class="ri-chat-3-line" />
        </span>
      </div>
    </template>

    <template v-else-if="step === 1">
      <button class="icon-btn icon-btn--end" type="button" aria-label="Help" @click.stop>
        <i class="ri-question-line" />
      </button>
      <div class="thumb">
        <img :src="figma('done-nyc.png')" width="120" height="160" alt="" />
        <span class="thumb__check">
          <img :src="figma('icon-check-green.svg')" width="20" height="20" alt="" />
        </span>
      </div>
      <h1>Activity completed</h1>
      <p class="done__sub">How to go to New York</p>
      <ul class="checks">
        <li>
          <img :src="figma('icon-check-green.svg')" width="20" height="20" alt="" />
          Calculating overall score
        </li>
        <li>
          <img :src="figma('icon-check-green.svg')" width="20" height="20" alt="" />
          Finding points to improve
        </li>
        <li>
          <img :src="figma('icon-spin-done.svg')" width="20" height="20" alt="" />
          Preparing your feedback
        </li>
      </ul>
    </template>

    <template v-else>
      <header class="done__bar" @click.stop>
        <button class="icon-btn" type="button" aria-label="Back" @click="$emit('close')">
          <i class="ri-arrow-left-s-line" />
        </button>
        <div class="segs" aria-hidden="true">
          <span class="is-on" />
          <span class="is-on" />
          <span />
          <span />
        </div>
        <button class="icon-btn" type="button" aria-label="Help">
          <i class="ri-question-line" />
        </button>
      </header>
      <span class="pill">Activity</span>
      <p class="done__kicker">Average accuracy</p>
      <p class="done__score">92<span>%</span></p>
      <p class="done__top">
        <i class="ri-sparkling-2-fill" />
        Top 15%
      </p>
      <p class="done__copy">You finished in 6 min — that’s the top 15% fastest.</p>
      <div class="done__actions" @click.stop>
        <button class="btn btn--light" type="button">
          Share results
          <i class="ri-arrow-right-up-line" />
        </button>
        <button class="btn btn--ghost" type="button">
          Review 10 mistakes
          <i class="ri-pencil-line" />
        </button>
        <button class="btn btn--text" type="button" @click="$emit('continue')">Continue</button>
      </div>
    </template>
  </div>
</template>

<script setup>
import { figma } from '../figma.js';
import { onBeforeUnmount, onMounted, ref } from 'vue';

defineEmits(['close', 'continue']);

const step = ref(0);
let t1;
let t2;

function advance() {
  if (step.value < 2) step.value += 1;
}

onMounted(() => {
  t1 = setTimeout(() => {
    if (step.value === 0) step.value = 1;
  }, 1400);
  t2 = setTimeout(() => {
    if (step.value === 1) step.value = 2;
  }, 3200);
});

onBeforeUnmount(() => {
  clearTimeout(t1);
  clearTimeout(t2);
});
</script>

<style scoped>
.done {
  position: absolute;
  inset: 0;
  z-index: 11;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 72px 24px 28px;
  background: linear-gradient(180deg, #f4eaff 0%, #d6bdff 42%, #8134fe 100%);
  color: #20044e;
  text-align: center;
}

.done--1,
.done--2 {
  align-items: stretch;
  background: linear-gradient(180deg, #5b1ad6 0%, #3e0798 48%, #f2ebff 120%);
  color: #fff;
  text-align: left;
}

.done__hello {
  margin-top: 160px;
  font: 500 16px/1.2 var(--bc-font-sans);
  opacity: 0.7;
}

.done--0 h1,
.done--1 h1 {
  margin-top: 12px;
  font: 500 24px/1.2 var(--bc-font-sans);
  text-align: center;
}

.done--0 h1 {
  color: #20044e;
  max-width: 274px;
}

.toggle {
  margin-top: 48px;
  width: 227px;
  height: 100px;
  border-radius: 100px;
  background: #d6bdff;
  position: relative;
}

.toggle__knob {
  position: absolute;
  left: 6px;
  top: 6px;
  display: grid;
  place-items: center;
  width: 88px;
  height: 88px;
  border-radius: 999px;
  background: #20044e;
  color: #fff;
  font-size: 28px;
}

.icon-btn {
  display: grid;
  place-items: center;
  width: 48px;
  height: 48px;
  color: #fff;
  font-size: 24px;
}

.icon-btn--end {
  align-self: flex-end;
}

.thumb {
  position: relative;
  width: 120px;
  height: 160px;
  margin: 24px auto 20px;
  overflow: hidden;
  border-radius: 12px;
}

.thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.7);
}

.thumb__check {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
}

.thumb__check img {
  width: 32px;
  height: 32px;
  filter: none;
}

.done--1 h1 {
  color: #fff;
}

.done__sub {
  margin-top: 12px;
  font: 400 16px/1.2 var(--bc-font-sans);
  text-align: center;
}

.checks {
  list-style: none;
  margin: 32px 0 0;
  padding: 24px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.checks li {
  display: flex;
  align-items: center;
  gap: 20px;
  font: 400 14px/1.5 var(--bc-font-sans);
  color: #e0e0e0;
}

.checks img {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}

.done__bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.segs {
  display: flex;
  flex: 1;
  gap: 8px;
}

.segs span {
  flex: 1;
  height: 4px;
  background: #42364a;
}

.segs .is-on {
  background: #8134fe;
}

.pill {
  align-self: flex-start;
  margin-top: 20px;
  height: 28px;
  padding: 0 8px;
  border: 1px solid #eeeef1;
  border-radius: 8px;
  font: 500 12px/28px var(--bc-font-sans);
}

.done__kicker {
  margin-top: 28px;
  font: 500 16px/1.1 var(--bc-font-sans);
}

.done__score {
  font: 500 120px/0.9 var(--bc-font-sans);
  letter-spacing: -4px;
}

.done__score span {
  font-size: 64px;
}

.done__top {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-top: 48px;
  font: 500 16px/1.2 var(--bc-font-sans);
  color: #f2ebff;
  opacity: 0.9;
}

.done__copy {
  margin-top: 12px;
  max-width: 280px;
  font: 400 20px/1.2 var(--bc-font-sans);
}

.done__actions {
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
  width: 100%;
  height: 48px;
  border-radius: 12px;
  font: 500 16px/1 var(--bc-font-sans);
}

.btn--light {
  background: #f2ebff;
  color: #27202c;
}

.btn--ghost {
  border: 1px solid #eeeef1;
  color: #fff;
  font-size: 14px;
}

.btn--text {
  width: auto;
  color: #fff;
}
</style>
