<template>
  <div class="home">
    <StatusBar :tone="statusTone" />

    <TrailScreen
      v-if="tab === 'trail'"
      @start="openSheet('activity')"
      @streak="openSheet('streak')"
    />

    <PathScreen
      v-else-if="tab === 'path'"
      @start="openSheet('activity')"
      @streak="openSheet('streak')"
    />

    <TutorsScreen
      v-else-if="tab === 'tutors'"
      @talk="openTalk"
      @be="openSheet('be')"
      @streak="openSheet('streak')"
      @twins="openTwins"
    />

    <CommunityScreen
      v-else-if="tab === 'community'"
      @invite="openSheet('invite')"
      @ranking="openSheet('ranking')"
    />

    <ProfileScreen v-else-if="tab === 'profile'" @invite="openSheet('invite')" />

    <PlaceholderScreen v-else :tab="tab" @start="openSheet('activity')" />

    <TabBar v-if="!fullSheet" :tab="tab" :variant="variant" @update:tab="tab = $event" />

    <div v-if="!fullSheet" class="home-indicator" aria-hidden="true" />

    <ActivityPlayer v-if="sheet === 'activity'" @close="closeSheet" @done="openSheet('done')" />
    <BeDoubts v-if="sheet === 'be'" @close="closeSheet" />
    <DigitalTwins
      v-if="sheet === 'twins'"
      :initial-id="twinId"
      @close="closeSheet"
      @talk="openTalk"
    />
    <ActivityDone v-if="sheet === 'done'" @close="closeSheet" />
    <RankingScreen v-if="sheet === 'ranking'" @close="closeSheet" />
    <StreakScreen v-if="sheet === 'streak'" @close="closeSheet" />

    <Transition name="sheet">
      <div v-if="sheet && !fullSheet" class="overlay" @click.self="closeSheet">
        <div class="sheet" role="dialog" aria-modal="true">
          <div class="sheet__handle" />
          <template v-if="sheet === 'talk'">
            <h2>Start conversation</h2>
            <p class="sheet__body">This would open a live conversation with {{ talkWith }}.</p>
            <button class="sheet__cta" type="button" @click="closeSheet">Got it</button>
          </template>
          <template v-else-if="sheet === 'invite'">
            <h2>Invite friends</h2>
            <p class="sheet__body">This would share a link so a friend lands on the trail.</p>
            <button class="sheet__cta" type="button" @click="closeSheet">Got it</button>
          </template>
          <template v-else>
            <h2>Start conversation</h2>
            <p class="sheet__body">This would open a live conversation with {{ talkWith }}.</p>
            <button class="sheet__cta" type="button" @click="closeSheet">Got it</button>
          </template>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue';
import ActivityDone from './ActivityDone.vue';
import ActivityPlayer from './ActivityPlayer.vue';
import BeDoubts from './BeDoubts.vue';
import DigitalTwins from './DigitalTwins.vue';
import PathScreen from './PathScreen.vue';
import PlaceholderScreen from './PlaceholderScreen.vue';
import ProfileScreen from './ProfileScreen.vue';
import RankingScreen from './RankingScreen.vue';
import StatusBar from './StatusBar.vue';
import StreakScreen from './StreakScreen.vue';
import TabBar from './TabBar.vue';
import TrailScreen from './TrailScreen.vue';
import TutorsScreen from './TutorsScreen.vue';
import CommunityScreen from './CommunityScreen.vue';

const props = defineProps({
  variant: { type: String, default: 'trail' },
});

const tab = ref(props.variant === 'path' ? 'path' : 'trail');
const sheet = ref(null);
const talkWith = ref('Karina');
const twinId = ref('brian');
const fullSheet = computed(
  () =>
    sheet.value === 'activity' ||
    sheet.value === 'be' ||
    sheet.value === 'twins' ||
    sheet.value === 'done' ||
    sheet.value === 'ranking' ||
    sheet.value === 'streak',
);
const statusTone = computed(() => {
  if (sheet.value === 'activity' || sheet.value === 'done') return 'light';
  if (sheet.value === 'ranking' || sheet.value === 'streak' || sheet.value === 'twins' || sheet.value === 'be') {
    return 'dark';
  }
  return tab.value === 'path' ? 'light' : 'dark';
});

function openSheet(id) {
  sheet.value = id;
}

function openTalk(name) {
  talkWith.value = name;
  sheet.value = 'talk';
}

function openTwins(id) {
  twinId.value = id || 'brian';
  sheet.value = 'twins';
}

function closeSheet() {
  sheet.value = null;
}

watch(
  () => props.variant,
  (next) => {
    tab.value = next === 'path' ? 'path' : 'trail';
    sheet.value = null;
  },
);

watch(tab, () => {
  sheet.value = null;
});
</script>

<style scoped>
.home {
  position: relative;
  width: 100%;
  height: 100%;
  background: #fff;
  overflow: hidden;
}

.home-indicator {
  position: absolute;
  z-index: 6;
  left: 50%;
  bottom: 8px;
  width: 134px;
  height: 5px;
  border-radius: 100px;
  background: #000;
  transform: translateX(-50%);
  pointer-events: none;
}

.overlay {
  position: absolute;
  inset: 0;
  z-index: 10;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: flex-end;
}

.sheet {
  width: 100%;
  background: #fff;
  border-radius: 24px 24px 0 0;
  padding: 12px 24px 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 8px;
}

.sheet__handle {
  width: 40px;
  height: 4px;
  border-radius: 999px;
  background: #eeeef1;
  margin-bottom: 12px;
}

.sheet h2 {
  font: 600 22px/1.2 var(--bc-font-sans);
  color: #27202c;
}

.sheet__kicker,
.sheet__body {
  font: 400 14px/1.45 var(--bc-font-sans);
  color: #42364a;
}

.sheet__hero {
  width: 88px;
  height: 132px;
  object-fit: cover;
  border-radius: 12px;
}

.sheet__cta {
  margin-top: 12px;
  width: 100%;
  height: 48px;
  border-radius: 12px;
  background: #8134fe;
  color: #fff;
  font: 500 14px/1.1 var(--bc-font-sans);
  box-shadow: 0 10px 30px rgba(129, 52, 254, 0.35);
}

.sheet-enter-active,
.sheet-leave-active {
  transition: opacity 180ms ease;
}

.sheet-enter-active .sheet,
.sheet-leave-active .sheet {
  transition: transform 220ms ease;
}

.sheet-enter-from,
.sheet-leave-to {
  opacity: 0;
}

.sheet-enter-from .sheet,
.sheet-leave-to .sheet {
  transform: translateY(24px);
}
</style>
