<template>
  <div class="be" role="dialog" aria-modal="true" aria-label="Be">
    <img class="be__city" src="./figma/be-doubts-bg.png" width="390" height="844" alt="" />
    <div class="be__scrim" />

    <div class="card">
      <header class="card__head">
        <button class="history" type="button">
          <img src="./figma/icon-history.svg" width="20" height="20" alt="" />
          History
        </button>
        <button class="close" type="button" aria-label="Close" @click="$emit('close')">
          <img src="./figma/icon-close-x.svg" width="24" height="24" alt="" />
        </button>
      </header>

      <div class="hero">
        <img class="hero__face" src="./figma/be-doubts-face.png" width="64" height="64" alt="Be" />
        <h1>Hey Mel, how can I help you?</h1>
        <div class="chips">
          <button class="chip" type="button">
            <img src="./figma/icon-help-chip.svg" width="16" height="16" alt="" />
            Solve a doubt
          </button>
          <button class="chip" type="button">
            <img src="./figma/icon-stars.svg" width="16" height="16" alt="" />
            Tell me something new
          </button>
        </div>
      </div>

      <div class="panel">
        <button v-for="q in questions" :key="q" class="q" type="button">
          <img src="./figma/icon-help-list.svg" width="20" height="20" alt="" />
          <span>{{ q }}</span>
          <img class="q__chevron" src="./figma/icon-chevron-list.svg" width="20" height="20" alt="" />
        </button>
        <div class="composer">
          <input class="composer__input" type="text" placeholder="Your message..." />
          <button class="composer__mic" type="button" aria-label="Record">
            <img src="./figma/icon-mic-fill.svg" width="21" height="21" alt="" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineEmits(['close']);

const questions = [
  'What does “well” mean?',
  'How do you say the verb “go” in the past?',
  'How do I answer the question?',
];
</script>

<style scoped>
.be {
  position: absolute;
  inset: 0;
  z-index: 11;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 54px 16px 24px;
  overflow: hidden;
  background: #1a1520;
}

.be__city {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.be__scrim {
  position: absolute;
  inset: 0;
  background: rgba(39, 32, 44, 0.28);
}

.card {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  width: 358px;
  max-width: 100%;
  height: 681px;
  max-height: calc(100% - 8px);
  overflow: hidden;
  border-radius: 16px;
  background:
    linear-gradient(180deg, #f7f2ff 0%, #f2ebff 42%, #fff 72%);
}

.card__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 16px 0;
}

.history {
  display: flex;
  align-items: center;
  gap: 4px;
  color: #42364a;
  font: 500 14px/1.4 var(--bc-font-sans);
}

.history img {
  width: 20px;
  height: 20px;
}

.close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 510px;
  background: #fff;
}

.close img {
  width: 24px;
  height: 24px;
}

.hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 72px 16px 24px;
}

.hero__face {
  width: 64px;
  height: 64px;
  border-radius: 999px;
  object-fit: cover;
}

.hero h1 {
  margin-top: 24px;
  width: 186px;
  font: 500 20px/1.2 var(--bc-font-sans);
  color: #000;
  text-align: center;
}

.chips {
  display: flex;
  gap: 12px;
  margin-top: 24px;
}

.chip {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 12px;
  border-radius: 12px;
  background: #fff;
  color: #42364a;
  font: 500 12px/1.2 var(--bc-font-sans);
  white-space: nowrap;
}

.chip img {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}

.panel {
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-height: 288px;
  padding: 24px 16px 20px;
  background: #fff;
  border-radius: 24px 24px 16px 16px;
}

.q {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  height: 48px;
  text-align: left;
  color: #27202c;
  font: 500 14px/1.36 var(--bc-font-sans);
}

.q img {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}

.q span {
  flex: 1;
  min-width: 0;
}

.q__chevron {
  margin-left: auto;
}

.composer {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: 24px;
}

.composer__input {
  flex: 1;
  min-width: 0;
  height: 48px;
  padding: 0 16px;
  border: 1px solid #e0e0e0;
  border-radius: 16px;
  background: #fff;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.15);
  color: #27202c;
  font: 400 14px/1.2 var(--bc-font-sans);
}

.composer__input::placeholder {
  color: #707070;
}

.composer__mic {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  flex-shrink: 0;
  border-radius: 999px;
  background: #27202c;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.15);
}

.composer__mic img {
  width: 21px;
  height: 21px;
}
</style>
