<template>
  <div class="shell">
    <StatusBar :tone="statusTone" />

    <TrailScreen
      v-if="tab === 'trail'"
      level="a1"
      talk-node
      :advanced="pathAdvanced"
      :streak-days="streakDays"
      @start="openSheet('activity')"
      @streak="openSheet('streak')"
      @talk="openTalk"
    />

    <TutorsScreen
      v-else-if="tab === 'tutors'"
      :streak-days="streakDays"
      @talk="openTalk"
      @be="openSheet('be')"
      @streak="openSheet('streak')"
      @twins="openTwins"
    />

    <CommunityScreen
      v-else-if="tab === 'community'"
      @invite="openSheet('invite')"
      @ranking="openSheet('ranking')"
      @passport="openSheet('passport')"
    />

    <ProfileScreen
      v-else-if="tab === 'profile'"
      show-store
      @invite="openSheet('invite')"
      @store="openSheet('store')"
      @passport="openSheet('passport')"
    />

    <button
      v-if="showMemoryFab"
      class="fab"
      type="button"
      aria-label="Open English Memory"
      @click="openSheet('memory')"
    >
      <span class="fab__orb">
        <i class="ri-bookmark-3-fill" />
      </span>
      <span>English<br />Memory</span>
    </button>

    <TabBar v-if="!fullSheet" :tab="tab" variant="trail" @update:tab="tab = $event" />

    <div v-if="!fullSheet" class="home-indicator" aria-hidden="true" />

    <ActivityPlayer v-if="sheet === 'activity'" @close="closeSheet" @done="openSheet('done')" />
    <BeDoubts v-if="sheet === 'be'" @close="closeSheet" />
    <DigitalTwins
      v-if="sheet === 'twins'"
      :initial-id="twinId"
      @close="closeSheet"
      @talk="openTalk"
    />
    <ActivityDone v-if="sheet === 'done'" @close="closeSheet" @continue="openSheet('streak-win')" />
    <StreakWin v-if="sheet === 'streak-win'" @close="finishStreak" @continue="finishStreak" />
    <RankingScreen v-if="sheet === 'ranking'" @close="closeSheet" />
    <StreakScreen v-if="sheet === 'streak'" @close="closeSheet" />
    <StoreScreen v-if="sheet === 'store'" @close="closeSheet" />
    <EnglishMemory v-if="sheet === 'memory'" @close="closeSheet" />
    <PassportScreen v-if="sheet === 'passport'" @close="closeSheet" />

    <Transition name="sheet">
      <div v-if="sheet && !fullSheet" class="overlay" @click.self="closeSheet">
        <div class="sheet" role="dialog" aria-modal="true">
          <div class="sheet__handle" />
          <template v-if="sheet === 'talk'">
            <h2>Start conversation</h2>
            <p class="sheet__body">This would open a live conversation with {{ talkWith }}.</p>
            <button class="sheet__cta" type="button" @click="closeSheet">Got it</button>
          </template>
          <template v-else>
            <h2>Invite friends</h2>
            <p class="sheet__body">This would share a link so a friend lands on the trail.</p>
            <button class="sheet__cta" type="button" @click="closeSheet">Got it</button>
          </template>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue';
import ActivityDone from '../components/ActivityDone.vue';
import ActivityPlayer from '../components/ActivityPlayer.vue';
import BeDoubts from '../components/BeDoubts.vue';
import DigitalTwins from '../components/DigitalTwins.vue';
import ProfileScreen from '../components/ProfileScreen.vue';
import RankingScreen from '../components/RankingScreen.vue';
import StatusBar from '../components/StatusBar.vue';
import StreakScreen from '../components/StreakScreen.vue';
import StreakWin from '../components/StreakWin.vue';
import TabBar from '../components/TabBar.vue';
import TrailScreen from '../components/TrailScreen.vue';
import TutorsScreen from '../components/TutorsScreen.vue';
import CommunityScreen from '../components/CommunityScreen.vue';
import EnglishMemory from './EnglishMemory.vue';
import PassportScreen from './PassportScreen.vue';
import StoreScreen from './StoreScreen.vue';

const tab = ref('trail');
const sheet = ref(null);
const talkWith = ref('Karina');
const twinId = ref('brian');
const pathAdvanced = ref(false);
const streakDays = ref(2);

const fullSheet = computed(
  () =>
    sheet.value === 'activity' ||
    sheet.value === 'be' ||
    sheet.value === 'twins' ||
    sheet.value === 'done' ||
    sheet.value === 'streak-win' ||
    sheet.value === 'ranking' ||
    sheet.value === 'streak' ||
    sheet.value === 'store' ||
    sheet.value === 'memory' ||
    sheet.value === 'passport',
);

const statusTone = computed(() => {
  if (sheet.value === 'activity' || sheet.value === 'done') return 'light';
  if (
    sheet.value === 'ranking' ||
    sheet.value === 'streak' ||
    sheet.value === 'streak-win' ||
    sheet.value === 'twins' ||
    sheet.value === 'be' ||
    sheet.value === 'store' ||
    sheet.value === 'memory' ||
    sheet.value === 'passport'
  ) {
    return 'dark';
  }
  return 'dark';
});

const showMemoryFab = computed(
  () => !fullSheet.value && !sheet.value && tab.value === 'trail',
);

function openSheet(id) {
  sheet.value = id;
}

function openTalk(name) {
  talkWith.value = name || 'Karina';
  sheet.value = 'talk';
}

function openTwins(id) {
  twinId.value = id || 'brian';
  sheet.value = 'twins';
}

function closeSheet() {
  sheet.value = null;
}

function finishStreak() {
  pathAdvanced.value = true;
  streakDays.value = 10;
  sheet.value = null;
}

watch(tab, () => {
  sheet.value = null;
});
</script>

<style scoped>
.shell {
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

.fab {
  position: absolute;
  right: 16px;
  bottom: 102px;
  z-index: 7;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  width: 92px;
  padding: 0;
  background: none;
  color: #20044e;
  text-align: center;
}

.fab__orb {
  display: grid;
  place-items: center;
  width: 80px;
  height: 80px;
  border-radius: 999px;
  background: #8134fe;
  color: #fff;
  font-size: 32px;
  box-shadow: 0 0 0 3px #f2ebff, 0 14px 32px rgba(129, 52, 254, 0.32);
}

.fab span:last-child {
  padding: 4px 8px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.94);
  font: 600 11px/1.2 var(--bc-font-sans);
  box-shadow: 0 4px 12px rgba(32, 4, 78, 0.12);
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

.sheet__body {
  font: 400 14px/1.45 var(--bc-font-sans);
  color: #42364a;
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
