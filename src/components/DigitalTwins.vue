<template>
  <div class="twins" role="dialog" aria-modal="true" aria-label="Digital twins">
    <img
      class="twins__photo"
      :src="active.hero"
      width="390"
      height="844"
      :alt="active.name"
    />
    <div class="twins__grad" />

    <header class="twins__top">
      <button class="back" type="button" aria-label="Back" @click="$emit('close')">
        <img src="./figma/icon-back.svg" width="24" height="24" alt="" />
      </button>
      <button class="pause" type="button" @click="paused = !paused">
        <img src="./figma/icon-pause-twin.svg" width="16" height="16" alt="" />
        {{ paused ? 'Play' : 'Pause' }}
      </button>
    </header>

    <div class="twins__body">
      <div v-if="active.logos" class="logos" aria-hidden="true">
        <img class="logos__side" src="./figma/twin-logo-1.png" width="48" height="48" alt="" />
        <img class="logos__mid" src="./figma/twin-logo-2.png" width="56" height="56" alt="" />
        <img class="logos__side" src="./figma/twin-logo-3.png" width="48" height="48" alt="" />
      </div>

      <h1>{{ active.name }}</h1>
      <p class="twins__role">{{ active.teaches }}</p>

      <div class="carousel" role="list">
        <button
          v-for="twin in twins"
          :key="twin.id"
          class="face"
          :class="{ 'face--on': twin.id === activeId }"
          type="button"
          :aria-label="twin.name"
          :aria-pressed="twin.id === activeId"
          @click="activeId = twin.id"
        >
          <span class="face__ring">
            <img :src="twin.avatar" width="82" height="82" alt="" />
            <img
              v-if="twin.id === activeId"
              class="face__sel"
              src="./figma/twin-selector.svg"
              width="88"
              height="88"
              alt=""
            />
          </span>
          <span v-if="twin.badge" class="face__badge">{{ twin.badge }}</span>
          <span class="face__name">{{ twin.short }}</span>
        </button>
      </div>

      <div class="actions">
        <button class="btn btn--talk" type="button" @click="$emit('talk', active.name)">
          <img src="./figma/icon-talk.svg" width="20" height="20" alt="" />
          Talk
        </button>
        <button class="btn btn--learn" type="button">
          <img src="./figma/icon-learn.svg" width="20" height="20" alt="" />
          Learn
        </button>
      </div>
    </div>

    <div class="twins__home" aria-hidden="true" />
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue';

const props = defineProps({
  initialId: { type: String, default: 'brian' },
});

defineEmits(['close', 'talk']);

const twins = [
  {
    id: 'gina',
    name: 'Gina',
    short: 'Gina',
    teaches: 'Teaches communication',
    hero: './figma/twin-gina.png',
    avatar: './figma/twin-gina.png',
  },
  {
    id: 'doug',
    name: 'Doug Scherrer',
    short: 'Doug',
    teaches: 'Teaches investing',
    hero: './figma/twin-doug.png',
    avatar: './figma/twin-doug.png',
  },
  {
    id: 'brian',
    name: 'Brian Requarth',
    short: 'Brian',
    teaches: 'Teaches entrepreneurship',
    hero: './figma/twin-brian.png',
    avatar: './figma/master-brian.png',
    logos: true,
    badge: 'New!',
  },
  {
    id: 'daiane',
    name: 'Daiane dos Santos',
    short: 'Daiane',
    teaches: 'Teaches sport',
    hero: './figma/twin-daiane.png',
    avatar: './figma/twin-daiane.png',
  },
  {
    id: 'bortoleto',
    name: 'Bortoleto',
    short: 'Bortoleto',
    teaches: 'Teaches motorsport',
    hero: './figma/twin-bortoleto.png',
    avatar: './figma/twin-bortoleto.png',
  },
];

const activeId = ref(props.initialId);
const paused = ref(false);
const active = computed(() => twins.find((t) => t.id === activeId.value) ?? twins[2]);

watch(
  () => props.initialId,
  (next) => {
    activeId.value = next;
  },
);
</script>

<style scoped>
.twins {
  position: absolute;
  inset: 0;
  z-index: 11;
  overflow: hidden;
  background: #8134fe;
}

.twins__photo {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 50% 8%;
}

.twins__grad {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 48%;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.55) 38%, rgba(0, 0, 0, 0.78) 100%);
  pointer-events: none;
}

.twins__top {
  position: absolute;
  top: 67px;
  left: 16px;
  right: 16px;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.back {
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.55);
  backdrop-filter: blur(12px);
}

.pause {
  display: flex;
  align-items: center;
  gap: 8px;
  height: 40px;
  padding: 0 16px;
  border: 1px solid rgba(39, 32, 44, 0.35);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.55);
  backdrop-filter: blur(12px);
  font: 500 14px/1 var(--bc-font-sans);
  color: #27202c;
}

.twins__body {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 22px;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 16px;
}

.logos {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
}

.logos__side,
.logos__mid {
  object-fit: cover;
}

.logos__side {
  width: 44px;
  height: 44px;
  border-radius: 10px;
  background: #111;
  object-fit: contain;
}

.logos img:first-child {
  transform: rotate(-6deg) translate(2px, 1px);
}

.logos img:last-child {
  transform: rotate(8deg) translate(-2px, 1px);
  background: #111;
}

.logos__mid {
  width: 52px;
  height: 52px;
  z-index: 1;
  border-radius: 12px;
}

.twins__body h1 {
  margin: 0;
  font: 600 28px/1.15 var(--bc-font-sans);
  letter-spacing: -0.28px;
  color: #fff;
  text-align: center;
}

.twins__role {
  margin: 4px 0 4px;
  font: 400 16px/1.3 var(--bc-font-sans);
  color: #fff;
  text-align: center;
}

.carousel {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 4px;
  width: 100%;
  padding: 16px 0 8px;
  overflow: visible;
}

.face {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  flex: 1;
  min-width: 0;
  background: none;
  padding: 0;
}

.face--on {
  flex: 1.35;
}

.face__ring {
  position: relative;
  display: block;
  width: 56px;
  height: 56px;
}

.face--on .face__ring {
  width: 78px;
  height: 78px;
}

.face__ring img:first-child {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 50% 12%;
  border-radius: 999px;
}

.face__sel {
  position: absolute;
  inset: -3px;
  width: calc(100% + 6px);
  height: calc(100% + 6px);
  pointer-events: none;
}

.face__badge {
  position: absolute;
  top: -8px;
  left: 50%;
  z-index: 1;
  transform: translateX(-50%);
  padding: 2px 8px;
  border-radius: 999px;
  background: #8134fe;
  font: 600 10px/1.3 var(--bc-font-sans);
  color: #fff;
  white-space: nowrap;
}

.face__name {
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  font: 400 11px/1.2 var(--bc-font-sans);
  color: #fff;
  white-space: nowrap;
}

.actions {
  display: flex;
  gap: 12px;
  width: 100%;
  margin-top: 4px;
  margin-bottom: 10px;
}

.btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 48px;
  border-radius: 999px;
  font: 500 16px/1 var(--bc-font-sans);
  color: #fff;
}

.btn--talk {
  border: 1px solid #fff;
  background: transparent;
}

.btn--learn {
  background: #20044e;
}

.twins__home {
  position: absolute;
  z-index: 3;
  left: 50%;
  bottom: 8px;
  width: 134px;
  height: 5px;
  border-radius: 100px;
  background: #fff;
  transform: translateX(-50%);
  pointer-events: none;
}
</style>
