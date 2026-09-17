<template>
  <div class="player" role="dialog" aria-modal="true" aria-label="Activity" @click="$emit('done')">
    <img
      class="player__bg"
      src="./figma/activity-player-bg.png"
      width="390"
      height="844"
      alt=""
    />
    <div class="player__scrim" />

    <header class="player__top">
      <button class="player__icon" type="button" aria-label="Close" @click.stop="$emit('close')">
        <img src="./figma/icon-logout.svg" width="24" height="24" alt="" />
      </button>
      <div class="player__title">
        <p>Let’s go to New York</p>
        <div class="player__bar" aria-hidden="true">
          <span />
        </div>
      </div>
      <button class="player__icon" type="button" aria-label="More">
        <img src="./figma/icon-dots.svg" width="24" height="24" alt="" />
      </button>
    </header>

    <p class="player__caption">
      That was a great example! Now, let’s try another one together and see how well you do this time
    </p>

    <div class="player__chips">
      <button class="chip" type="button">
        <img src="./figma/icon-translate.svg" width="16" height="16" alt="" />
        Translate
      </button>
      <button class="chip" type="button">
        <img src="./figma/icon-help.svg" width="12" height="12" alt="" />
        Help me?
      </button>
    </div>

    <div class="player__scrub" aria-hidden="true">
      <span class="player__scrub-fill" />
      <span class="player__scrub-knob" />
    </div>

    <div class="player__controls">
      <button class="ctrl ctrl--ghost" type="button">1x</button>
      <button class="ctrl ctrl--ghost ctrl--icon" type="button" aria-label="Replay">
        <img src="./figma/icon-replay.svg" width="16" height="16" alt="" />
      </button>
      <button class="ctrl ctrl--pause" type="button">
        <img src="./figma/icon-pause.svg" width="16" height="16" alt="" />
        Pause
      </button>
    </div>
  </div>
</template>

<script setup>
defineEmits(['close', 'done']);
</script>

<style scoped>
.player {
  position: absolute;
  inset: 0;
  z-index: 11;
  overflow: hidden;
  background: #000;
}

.player__bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 50% 40%;
}

.player__scrim {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(180deg, rgba(0, 0, 0, 0.7) 0%, transparent 22%),
    linear-gradient(0.4deg, rgba(0, 0, 0, 0.74) 22%, transparent 62%);
  pointer-events: none;
}

.player__top {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 64px 32px 0;
}

.player__icon {
  width: 24px;
  height: 24px;
  flex-shrink: 0;
}

.player__icon img {
  width: 24px;
  height: 24px;
}

.player__title {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  width: 180px;
}

.player__title p {
  font: 500 16px/17px var(--bc-font-sans);
  color: #fff;
  text-align: center;
}

.player__bar {
  width: 100%;
  height: 3px;
  border-radius: 60px;
  background: rgba(66, 54, 74, 0.6);
  overflow: hidden;
}

.player__bar span {
  display: block;
  width: 85%;
  height: 100%;
  border-radius: 60px;
  background: #d6bdff;
}

.player__caption {
  position: absolute;
  left: 24px;
  right: 24px;
  bottom: 196px;
  z-index: 1;
  font: 500 20px/1.36 var(--bc-font-sans);
  color: #fff;
  text-align: center;
}

.player__chips {
  position: absolute;
  left: 50%;
  bottom: 130px;
  z-index: 1;
  display: flex;
  gap: 12px;
  transform: translateX(-50%);
}

.chip {
  display: flex;
  align-items: center;
  gap: 4px;
  min-width: 48px;
  padding: 12px;
  border-radius: 12px;
  background: rgba(66, 54, 74, 0.5);
  backdrop-filter: blur(50px);
  color: #fff;
  font: 500 14px/17px var(--bc-font-sans);
}

.chip img {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}

.player__scrub {
  position: absolute;
  left: 16px;
  right: 16px;
  bottom: 90px;
  z-index: 1;
  height: 8px;
}

.player__scrub::before {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  top: 3px;
  height: 2px;
  border-radius: 100px;
  background: #42364a;
}

.player__scrub-fill {
  position: absolute;
  left: 0;
  top: 3px;
  width: 72%;
  height: 2px;
  border-radius: 100px;
  background: #fff;
}

.player__scrub-knob {
  position: absolute;
  left: 72%;
  top: 0;
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background: #fff;
  border: 1px solid rgba(255, 255, 255, 0.5);
  transform: translateX(-50%);
}

.player__controls {
  position: absolute;
  left: 16px;
  right: 16px;
  bottom: 20px;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 8px;
}

.ctrl {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  min-width: 48px;
  padding: 12px 24px;
  border-radius: 12px;
  font: 500 14px/17px var(--bc-font-sans);
}

.ctrl--ghost {
  background: rgba(66, 54, 74, 0.4);
  backdrop-filter: blur(50px);
  color: #fff;
}

.ctrl--icon {
  padding: 12px;
}

.ctrl--icon img,
.ctrl--pause img {
  width: 16px;
  height: 16px;
}

.ctrl--pause {
  margin-left: auto;
  padding: 12px 12px 12px 8px;
  background: rgba(255, 255, 255, 0.9);
  color: #27202c;
}
</style>
