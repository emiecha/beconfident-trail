<template>
  <div class="community">
    <header class="community__head">
      <h1>Community</h1>
    </header>

    <div class="tiles">
      <InviteFriendsTile
        label="Invite&#10;friends"
        icon="./figma/smiley-happy-plus.svg"
        @click="$emit('invite')"
      />
      <InviteFriendsTile label="Ranking" icon="./figma/icon-trophy.svg" @click="$emit('ranking')" />
      <InviteFriendsTile label="Passport" remix="ri-passport-line" />
    </div>

    <div class="tabs" role="tablist" aria-label="Community sections">
      <button
        class="tabs__btn"
        :class="{ 'tabs__btn--on': feed === 'events' }"
        type="button"
        role="tab"
        :aria-selected="feed === 'events'"
        @click="feed = 'events'"
      >
        Events
      </button>
      <button
        class="tabs__btn"
        :class="{ 'tabs__btn--on': feed === 'notices' }"
        type="button"
        role="tab"
        :aria-selected="feed === 'notices'"
        @click="feed = 'notices'"
      >
        Notices
      </button>
    </div>

    <template v-if="feed === 'events'">
      <h2 class="block-title">Today’s event</h2>

      <article class="hero">
        <img class="hero__photo" src="./figma/event-today.png" width="350" height="409" alt="" />
        <div class="hero__scrim" />
        <span class="chip chip--warn">
          <img src="./figma/icon-clock-event.svg" width="12" height="12" alt="" />
          Starts in 3 hours
        </span>
        <span class="chip chip--hot">2 spots left!</span>
        <div class="hero__copy">
          <p class="hero__when">Sun, 21 Oct at 20:00</p>
          <h3>American slang pronunciation</h3>
          <p class="hero__host">Workshop with <strong>Aline Coutinho</strong></p>
          <div class="hero__meta">
            <span class="chip chip--level">Level B2-C1</span>
            <span class="going">
              <img src="./figma/tutor-mary.png" width="24" height="24" alt="" />
              <img src="./figma/tutor-johny.png" width="24" height="24" alt="" />
              Gustavo and 3 more going
            </span>
          </div>
          <button class="cta" type="button" @click="todayIn = !todayIn">
            {{ todayIn ? 'You’re going' : 'Confirm attendance' }}
          </button>
        </div>
      </article>

      <div class="toolbar">
        <button class="react" type="button">
          <img src="./figma/event-react-heart.svg" width="16" height="16" alt="" />
          <img src="./figma/event-react-fire.svg" width="16" height="16" alt="" />
          <img src="./figma/event-react-clap.svg" width="16" height="16" alt="" />
          38
        </button>
        <button class="share" type="button">
          <img src="./figma/icon-share-event.svg" width="20" height="20" alt="" />
          Share
        </button>
      </div>

      <div class="dots" aria-hidden="true">
        <span class="dots__on" />
        <span />
        <span />
      </div>

      <header class="upcoming-head">
        <h2 class="block-title">Upcoming events</h2>
        <button class="see-all" type="button">
          See all
          <i class="ri-arrow-right-s-line" />
        </button>
      </header>

      <article class="card">
        <div class="card__media">
          <img src="./figma/event-interview.png" width="350" height="160" alt="" />
          <span class="chip chip--level chip--on-photo">Level B2-C1</span>
          <span class="chip chip--hot chip--on-photo-end">Only 2 spots left!</span>
        </div>
        <div class="card__body">
          <div class="card__top">
            <div>
              <p class="card__when">Sun, 21 Oct at 20:00</p>
              <h3>How to pass a job interview?</h3>
            </div>
            <button class="card__share" type="button" aria-label="Share">
              <img src="./figma/icon-share-event.svg" width="16" height="16" alt="" />
            </button>
          </div>
          <p class="card__host">
            Conversation with <strong>Jonathan</strong>
            <img src="./figma/flag-uk.png" width="12" height="12" alt="" />
          </p>
          <p class="going going--ink">
            <img src="./figma/tutor-karina.png" width="24" height="24" alt="" />
            <img src="./figma/tutor-geofrey.png" width="24" height="24" alt="" />
            Pedro and 31 more confirmed
          </p>
          <div class="card__actions">
            <button class="cta" type="button" @click="interviewIn = !interviewIn">
              {{ interviewIn ? 'You’re going' : 'Confirm attendance' }}
            </button>
            <span class="react react--sm">
              <img src="./figma/event-react-heart.svg" width="14" height="14" alt="" />
              <img src="./figma/event-react-fire.svg" width="14" height="14" alt="" />
              36
            </span>
          </div>
        </div>
      </article>
    </template>

    <p v-else class="empty">Notices from the club will land here.</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import InviteFriendsTile from './InviteFriendsTile.vue';

defineEmits(['invite', 'ranking']);

const feed = ref('events');
const todayIn = ref(false);
const interviewIn = ref(false);
</script>

<style scoped>
.community {
  height: 100%;
  overflow-y: auto;
  padding: 68px 18px 120px;
  background: #fff;
  scrollbar-width: none;
}

.community::-webkit-scrollbar {
  display: none;
}

.community__head h1 {
  font: 500 20px/1.1 var(--bc-font-sans);
  color: #27202c;
}

.tiles {
  display: flex;
  gap: 12px;
  margin: 20px 0 8px;
}

.tabs {
  display: flex;
  margin: 8px 0 20px;
  border-bottom: 2px solid #fafafb;
}

.tabs__btn {
  flex: 1;
  height: 40px;
  font: 400 16px/1.1 var(--bc-font-sans);
  color: #adabba;
}

.tabs__btn--on {
  font-weight: 500;
  color: #3e0798;
  box-shadow: inset 0 -2px 0 #8134fe;
}

.block-title {
  font: 500 20px/1.1 var(--bc-font-sans);
  color: #000;
  margin-bottom: 16px;
}

.hero {
  position: relative;
  width: 100%;
  height: 409px;
  overflow: hidden;
  border-radius: 16px;
}

.hero__photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 50% 20%;
}

.hero__scrim {
  position: absolute;
  inset: auto 0 0;
  height: 282px;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0) 7%, rgba(0, 0, 0, 0.7) 100%);
  pointer-events: none;
}

.chip {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  height: 28px;
  padding: 0 8px;
  border-radius: 8px;
  font: 500 12px/1.1 var(--bc-font-sans);
}

.chip img {
  width: 12px;
  height: 12px;
}

.chip--warn {
  position: absolute;
  top: 16px;
  left: 16px;
  background: #fdd3d0;
  color: #ec221f;
}

.chip--hot {
  position: absolute;
  top: 16px;
  right: 16px;
  background: #ff7947;
  color: #fff;
}

.chip--level {
  height: 28px;
  background: #fafafb;
  color: #77738c;
  box-shadow: 0 2px 2px rgba(147, 147, 147, 0.25);
}

.chip--on-photo {
  position: absolute;
  top: 12px;
  left: 12px;
}

.chip--on-photo-end {
  position: absolute;
  top: 12px;
  right: 12px;
  left: auto;
}

.hero__copy {
  position: absolute;
  left: 24px;
  right: 24px;
  bottom: 24px;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
}

.hero__when,
.card__when {
  font: 400 12px/16px var(--bc-font-sans);
  color: #fafafb;
}

.card__when {
  color: #707070;
}

.hero__copy h3 {
  font: 600 24px/1.1 var(--bc-font-sans);
  color: #fff;
}

.hero__host {
  font: 400 14px/1.1 var(--bc-font-sans);
  color: #fafafb;
}

.hero__host strong,
.card__host strong {
  font-weight: 600;
  color: inherit;
}

.card__host strong {
  color: #8134fe;
}

.hero__meta {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.going {
  display: flex;
  align-items: center;
  font: 400 12px/1.1 var(--bc-font-sans);
  color: #fafafb;
}

.going--ink {
  color: #707070;
}

.going img {
  width: 24px;
  height: 24px;
  object-fit: cover;
  border-radius: 999px;
  border: 0.75px solid #fff;
  margin-right: -8px;
}

.going img:last-of-type {
  margin-right: 8px;
}

.cta {
  width: 100%;
  height: 48px;
  border-radius: 12px;
  background: #20044e;
  color: #fff;
  font: 500 16px/1.1 var(--bc-font-sans);
}

.toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 8px;
}

.react,
.share {
  display: flex;
  align-items: center;
  gap: 4px;
  height: 48px;
  padding: 0 12px;
  border-radius: 12px;
  font: 500 14px/1.1 var(--bc-font-sans);
  color: #928fa3;
}

.react {
  border: 1px solid #eeeef1;
}

.react img,
.share img {
  width: 16px;
  height: 16px;
}

.share img {
  width: 20px;
  height: 20px;
}

.react--sm {
  height: 44px;
  width: 72px;
  flex-shrink: 0;
  justify-content: center;
  padding: 0 8px;
}

.dots {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin: 16px 0 24px;
}

.dots span {
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background: #d9d9d9;
}

.dots__on {
  background: #8134fe !important;
}

.upcoming-head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 16px;
}

.upcoming-head .block-title {
  margin: 0;
}

.see-all {
  display: flex;
  align-items: center;
  gap: 4px;
  font: 500 14px/1.1 var(--bc-font-sans);
  color: #302e38;
}

.card {
  overflow: hidden;
  border: 1px solid #eeeef1;
  border-radius: 16px;
  background: #fff;
}

.card__media {
  position: relative;
  height: 160px;
  overflow: hidden;
  background: #3b95f4;
}

.card__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 50% 18%;
}

.card__body {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px;
}

.card__top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 8px;
}

.card__body h3 {
  margin-top: 6px;
  font: 500 16px/1.3 var(--bc-font-sans);
  color: #27202c;
}

.card__host {
  display: flex;
  align-items: center;
  gap: 4px;
  font: 400 12px/16px var(--bc-font-sans);
  color: #42364a;
}

.card__host img {
  width: 12px;
  height: 12px;
  border-radius: 999px;
  object-fit: cover;
}

.card__share {
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  flex-shrink: 0;
}

.card__share img {
  width: 16px;
  height: 16px;
}

.card__actions {
  display: flex;
  gap: 8px;
  align-items: center;
  margin-top: 8px;
}

.empty {
  padding: 24px 0;
  font: 400 14px/1.4 var(--bc-font-sans);
  color: #42364a;
}
</style>
