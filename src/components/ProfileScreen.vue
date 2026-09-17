<template>
  <div class="profile">
    <header class="top">
      <span class="top__spacer" />
      <h1>Profile</h1>
      <div class="top__actions">
        <button class="icon-btn" type="button" aria-label="Settings">
          <i class="ri-settings-3-line" />
        </button>
      </div>
    </header>

    <section class="identity">
      <div class="identity__photo">
        <img class="identity__avatar" :src="figma('profile-melanie.png')" width="100" height="100" alt="Melanie Sol" />
        <img class="identity__be" :src="figma('profile-be.svg')" width="48" height="48" alt="" />
      </div>
      <div class="stats">
        <div class="stat">
          <strong>10</strong>
          <span>Friends</span>
        </div>
        <span class="stats__rule" />
        <div class="stat">
          <strong>45</strong>
          <span>Days</span>
        </div>
      </div>
    </section>

    <section class="name-row">
      <div>
        <h2>Melanie Sol</h2>
        <p>Since 2024</p>
      </div>
      <button class="share" type="button">
        <img :src="figma('icon-share-profile.svg')" width="20" height="20" alt="" />
        Share
      </button>
    </section>

    <button class="add" type="button" @click="$emit('invite')">
      <img :src="figma('icon-user-add.svg')" width="20" height="20" alt="" />
      Add friends
    </button>

    <section class="streak">
      <div class="streak__flame">
        <img :src="figma('icon-flame-lg.svg')" width="28" height="28" alt="" />
      </div>
      <button class="streak__record" type="button">
        Streak record: 230 days
        <img :src="figma('icon-streak-chevron.svg')" width="16" height="16" alt="" />
      </button>
      <p class="streak__title">20-day streak</p>
      <p class="streak__sub">currently</p>
      <div class="streak__tiles">
        <button class="tile" type="button">
          <span class="tile__icon">
            <img :src="figma('icon-cefr.svg')" width="16" height="16" alt="" />
          </span>
          <img class="tile__chevron" :src="figma('icon-chevron-white.svg')" width="20" height="20" alt="" />
          <strong>B1</strong>
          <span>CEFR level</span>
        </button>
        <button class="tile" type="button">
          <span class="tile__icon">
            <img :src="figma('icon-cert.svg')" width="16" height="16" alt="" />
          </span>
          <img class="tile__chevron" :src="figma('icon-chevron-white.svg')" width="20" height="20" alt="" />
          <strong>2</strong>
          <span>Certificates</span>
        </button>
      </div>
    </section>

    <section class="block">
      <header class="block__head">
        <h3>Friend suggestions</h3>
        <button class="link" type="button">See all</button>
      </header>
      <div class="friends">
        <article v-for="friend in friends" :key="friend.initial" class="friend">
          <button class="friend__x" type="button" aria-label="Dismiss">
            <img :src="figma('icon-dismiss.svg')" width="20" height="20" alt="" />
          </button>
          <span class="friend__avatar" :style="{ background: friend.color }">{{ friend.initial }}</span>
          <p class="friend__name">{{ friend.name }}</p>
          <p class="friend__meta">One of your contacts</p>
          <button class="friend__add" type="button">Add</button>
        </article>
      </div>
    </section>

    <section class="block">
      <header class="block__head">
        <h3>Achievements</h3>
        <button class="link" type="button">See passport</button>
      </header>
      <div class="stamps">
        <article class="stamp stamp--blue">
          <img class="stamp__star" :src="figma('stamp-star.svg')" width="130" height="130" alt="" />
          <img class="stamp__icon" :src="figma('stamp-backpacker.svg')" width="24" height="24" alt="" />
          <p>Backpacker</p>
          <span>18 JUN 2025</span>
          <img class="stamp__mark" :src="figma('stamp-symbol.svg')" width="18" height="16" alt="" />
        </article>
        <article class="stamp stamp--skill">
          <img class="stamp__mark stamp__mark--tr" :src="figma('stamp-symbol-purple.svg')" width="18" height="16" alt="" />
          <img class="stamp__icon stamp__icon--left" :src="figma('stamp-grammar.svg')" width="24" height="24" alt="" />
          <p>Level 1<br />Grammar</p>
          <span>18 JUN 2025</span>
        </article>
        <article class="stamp stamp--muted">
          <img class="stamp__star" :src="figma('stamp-star-muted.svg')" width="130" height="130" alt="" />
          <img class="stamp__icon" :src="figma('stamp-tourist.svg')" width="24" height="24" alt="" />
          <p>Tourist</p>
          <span>18 JUN 2025</span>
          <img class="stamp__mark" :src="figma('stamp-symbol-muted.svg')" width="18" height="16" alt="" />
        </article>
      </div>
    </section>

    <section class="practice">
      <header class="practice__head">
        <div>
          <h3>Practice</h3>
          <p>In June</p>
        </div>
        <button class="period" type="button">
          Last month
          <img :src="figma('icon-dropdown.svg')" width="20" height="20" alt="" />
        </button>
      </header>
      <p class="practice__hours">10h</p>
      <div class="chart">
        <div class="chart__y">
          <span>3h</span>
          <span>2h</span>
          <span>1h</span>
          <span>30min</span>
          <span>0min</span>
        </div>
        <div class="chart__plot">
          <div class="chart__tip">2h 10 min</div>
          <div class="chart__bars">
            <span style="height: 52%" />
            <span class="is-on" style="height: 80%" />
            <span style="height: 41%" />
            <span style="height: 74%" />
          </div>
          <div class="chart__x">
            <span>Day 01-07</span>
            <span>Day 08-15</span>
            <span>Day 16-23</span>
            <span>Day 24-30</span>
          </div>
        </div>
      </div>
      <p class="practice__note">
        <img :src="figma('icon-check-green.svg')" width="16" height="16" alt="" />
        35 days of practice this month
      </p>
    </section>

    <div class="pair">
      <article class="mini">
        <div class="mini__faces">
          <span class="mini__chip">
            <img :src="figma('icon-chat-sm.svg')" width="16" height="16" alt="" />
          </span>
          <img :src="figma('tutor-karina.png')" width="32" height="32" alt="Karina" />
        </div>
        <p class="mini__copy">Your favorite tutor is Karina</p>
        <div class="mini__nums">
          <div>
            <span>Conversations</span>
            <strong>20</strong>
          </div>
          <div>
            <span>Reviews</span>
            <strong>5</strong>
          </div>
        </div>
      </article>
      <article class="mini mini--wa">
        <img class="mini__bg" :src="figma('profile-whatsapp-bg.png')" alt="" />
        <div class="mini__faces">
          <span class="mini__chip">
            <img :src="figma('icon-whatsapp.svg')" width="16" height="16" alt="" />
          </span>
        </div>
        <div>
          <p class="mini__copy">Most used platform to study</p>
          <p class="mini__brand">WhatsApp</p>
        </div>
      </article>
    </div>

    <section class="words">
      <header class="practice__head">
        <div>
          <h3>Most viewed words</h3>
          <p>In June</p>
        </div>
        <button class="period" type="button">
          Month
          <img :src="figma('icon-dropdown.svg')" width="20" height="20" alt="" />
        </button>
      </header>
      <ul>
        <li v-for="word in words" :key="word.term">
          <img :src="figma('icon-info.svg')" width="14" height="14" alt="" />
          <strong>{{ word.term }}</strong>
          <span>{{ word.kind }}</span>
        </li>
      </ul>
    </section>
  </div>
</template>

<script setup>
import { figma } from '../figma.js';
defineEmits(['invite']);

const friends = [
  { initial: 'L', name: 'Ana Silva', color: '#cfe5fc' },
  { initial: 'I', name: 'Ana Silva', color: '#f0f9d2' },
  { initial: 'R', name: 'Ana Silva', color: '#faddd1' },
];

const words = [
  { term: 'Vacation', kind: 'noun' },
  { term: 'Flight', kind: 'noun' },
  { term: 'They', kind: 'pronoun' },
  { term: 'Run', kind: 'verb' },
  { term: 'Cycling', kind: 'verb' },
];
</script>

<style scoped>
.profile {
  height: 100%;
  overflow-y: auto;
  padding: 60px 16px 120px;
  background: #fff;
  scrollbar-width: none;
}

.profile::-webkit-scrollbar {
  display: none;
}

.top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 48px;
  margin-bottom: 8px;
}

.top h1 {
  font: 500 16px/1.1 var(--bc-font-sans);
  color: #000;
}

.top__spacer,
.top__actions {
  width: 48px;
  display: flex;
  justify-content: flex-end;
}

.icon-btn {
  display: grid;
  place-items: center;
  width: 48px;
  height: 48px;
  color: #18171c;
}

.icon-btn i {
  font-size: 24px;
  line-height: 1;
}

.identity {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: 24px;
}

.identity__photo {
  position: relative;
  width: 126px;
  height: 100px;
}

.identity__avatar {
  width: 100px;
  height: 100px;
  object-fit: cover;
  object-position: 50% 20%;
  border-radius: 999px;
}

.identity__be {
  position: absolute;
  left: 68px;
  top: 36px;
  width: 48px;
  height: 48px;
}

.stats {
  display: flex;
  align-items: center;
  gap: 18px;
}

.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  color: #000;
  text-align: center;
}

.stat strong {
  font: 500 20px/1.1 var(--bc-font-sans);
}

.stat span {
  font: 400 12px/1.1 var(--bc-font-sans);
}

.stats__rule {
  width: 1px;
  height: 35px;
  background: #eeeef1;
}

.name-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin: 20px 0 16px;
}

.name-row h2 {
  font: 500 28px/1.1 var(--bc-font-sans);
  color: #18171c;
}

.name-row p {
  margin-top: 4px;
  font: 400 14px/1.4 var(--bc-font-sans);
  color: #928fa3;
}

.share,
.period {
  display: flex;
  align-items: center;
  gap: 8px;
  height: 48px;
  padding: 0 16px 0 16px;
  border: 1px solid #eeeef1;
  border-radius: 12px;
  color: #302e38;
  font: 500 14px/1.1 var(--bc-font-sans);
  background: #fff;
}

.share img,
.period img {
  width: 20px;
  height: 20px;
}

.add {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  width: 100%;
  height: 48px;
  margin-bottom: 16px;
  border-radius: 12px;
  background: #20044e;
  color: #fff;
  font: 500 16px/1.1 var(--bc-font-sans);
}

.add img {
  width: 20px;
  height: 20px;
}

.streak {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 356px;
  margin-bottom: 28px;
  padding: 32px 20px 20px;
  overflow: hidden;
  border-radius: 16px;
  background:
    radial-gradient(120% 80% at 20% 0%, rgba(255, 255, 255, 0.18), transparent 50%),
    linear-gradient(165deg, #4a12c4 0%, #8134fe 55%, #9b4dff 120%);
  color: #fff;
  text-align: center;
}

.streak__flame {
  display: grid;
  place-items: center;
  width: 48px;
  height: 48px;
  margin-bottom: 16px;
  border-radius: 999px;
  background: #fff;
}

.streak__flame img {
  width: 28px;
  height: 28px;
}

.streak__record {
  display: flex;
  align-items: center;
  gap: 2px;
  color: #e0e0e0;
  font: 400 14px/1.2 var(--bc-font-sans);
}

.streak__record img {
  width: 16px;
  height: 16px;
}

.streak__title {
  margin-top: 8px;
  font: 500 32px/1.2 var(--bc-font-sans);
}

.streak__sub {
  font: 400 14px/1.2 var(--bc-font-sans);
  color: #e0e0e0;
}

.streak__tiles {
  display: flex;
  gap: 12px;
  width: 100%;
  margin-top: auto;
  padding-top: 28px;
}

.tile {
  position: relative;
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  height: 124px;
  padding: 16px 12px 12px 20px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.2);
  text-align: left;
  color: #fff;
}

.tile__icon {
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  border-radius: 999px;
  background: #eeeef1;
}

.tile__icon img {
  width: 16px;
  height: 16px;
}

.tile__chevron {
  position: absolute;
  top: 16px;
  right: 12px;
  width: 20px;
  height: 20px;
}

.tile strong {
  display: block;
  margin-top: 12px;
  font: 500 24px/1.2 var(--bc-font-sans);
}

.tile span {
  font: 400 14px/1.2 var(--bc-font-sans);
  color: #e0e0e0;
}

.block {
  margin-bottom: 28px;
}

.block__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.block__head h3,
.practice__head h3,
.words h3 {
  font: 500 20px/1.1 var(--bc-font-sans);
  color: #000;
}

.link {
  color: #8134fe;
  font: 500 16px/1.1 var(--bc-font-sans);
}

.friends,
.stamps {
  display: flex;
  gap: 10px;
  overflow-x: auto;
  scrollbar-width: none;
}

.friends::-webkit-scrollbar,
.stamps::-webkit-scrollbar {
  display: none;
}

.friend {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
  width: 140px;
  padding: 16px 12px;
  border: 1px solid #eeeef1;
  border-radius: 8px;
  text-align: center;
}

.friend__x {
  position: absolute;
  top: 11px;
  right: 12px;
  width: 20px;
  height: 20px;
}

.friend__x img {
  width: 20px;
  height: 20px;
}

.friend__avatar {
  display: grid;
  place-items: center;
  width: 48px;
  height: 48px;
  border-radius: 999px;
  font: 500 20px/1.2 var(--bc-font-sans);
  color: #1b1b1b;
}

.friend__name {
  margin-top: 8px;
  font: 500 16px/1.1 var(--bc-font-sans);
  color: #18171c;
}

.friend__meta {
  margin-top: 4px;
  font: 400 12px/1.1 var(--bc-font-sans);
  color: #928fa3;
}

.friend__add {
  width: 100%;
  height: 32px;
  margin-top: 16px;
  border-radius: 8px;
  background: #20044e;
  color: #fff;
  font: 500 16px/1.1 var(--bc-font-sans);
}

.stamps {
  gap: 16px;
}

.stamp {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 140px;
  height: 140px;
  gap: 4px;
}

.stamp__star {
  position: absolute;
  inset: 5px;
  width: 130px;
  height: 130px;
}

.stamp__icon {
  position: relative;
  width: 24px;
  height: 24px;
  margin-bottom: 4px;
}

.stamp__icon--left {
  align-self: flex-start;
  margin-left: 16px;
}

.stamp p {
  position: relative;
  font: 500 16px/1.1 var(--bc-font-sans);
  text-align: center;
}

.stamp span {
  position: relative;
  padding-top: 4px;
  border-top: 1px solid currentColor;
  font: 500 12px/1.1 var(--bc-font-sans);
  letter-spacing: 1px;
}

.stamp__mark {
  position: relative;
  width: 18px;
  height: 16px;
  margin-top: 4px;
}

.stamp__mark--tr {
  position: absolute;
  top: 33px;
  right: 16px;
  margin: 0;
}

.stamp--blue {
  color: #3b95f4;
}

.stamp--skill {
  color: #8134fe;
  border: 2px solid #8134fe;
  border-radius: 20px;
  align-items: flex-start;
  padding: 16px 12px;
}

.stamp--muted {
  color: #c9c7d1;
}

.practice,
.words {
  width: 100%;
  margin-bottom: 16px;
  padding: 16px 16px 20px;
  border-radius: 16px;
  background: #f6f6f6;
}

.practice__head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}

.practice__head p,
.words header p {
  margin-top: 8px;
  font: 400 12px/1.2 var(--bc-font-sans);
  color: #27202c;
}

.practice__hours {
  margin: 16px 0 12px;
  font: 500 40px/1.2 var(--bc-font-sans);
  color: #27202c;
}

.chart {
  display: flex;
  gap: 8px;
  align-items: stretch;
}

.chart__y {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 134px;
  color: #42364a;
  font: 400 10px/1.2 var(--bc-font-sans);
  text-align: center;
}

.chart__plot {
  position: relative;
  flex: 1;
  min-width: 0;
}

.chart__tip {
  position: absolute;
  left: 22%;
  top: -8px;
  z-index: 1;
  padding: 8px 9px;
  border-radius: 75px;
  background: #20044e;
  color: #fff;
  font: 500 9px/1 var(--bc-font-sans);
}

.chart__bars {
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
  height: 134px;
  padding: 8px 4px 0;
}

.chart__bars span {
  width: 44px;
  border-radius: 4px;
  background: linear-gradient(180deg, #8134fe 32.5%, #f2ebff 100%);
}

.chart__x {
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
  color: #27202c;
  font: 400 10px/1.2 var(--bc-font-sans);
  text-align: center;
}

.practice__note {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-top: 16px;
  font: 500 12px/1.2 var(--bc-font-sans);
  color: #27202c;
}

.practice__note img {
  width: 16px;
  height: 16px;
}

.pair {
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
}

.mini {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 167px;
  height: 150px;
  padding: 12px;
  border-radius: 16px;
  background: #f6f6f6;
}

.mini--wa {
  position: relative;
  flex: 1;
  overflow: hidden;
  padding: 14px 12px;
  background: #dcf8c6;
}

.mini__bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.85;
}

.mini--wa > *:not(.mini__bg) {
  position: relative;
  z-index: 1;
}

.mini__faces {
  display: flex;
  align-items: center;
}

.mini__chip {
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  margin-right: -8px;
  border-radius: 999px;
  background: #fff;
}

.mini__chip img {
  width: 16px;
  height: 16px;
}

.mini__faces > img {
  width: 32px;
  height: 32px;
  object-fit: cover;
  border-radius: 999px;
}

.mini__copy {
  font: 500 12px/1.25 var(--bc-font-sans);
  color: #27202c;
}

.mini__brand {
  margin-top: 4px;
  font: 600 16px/1.2 var(--bc-font-sans);
  color: #27202c;
}

.mini__nums {
  display: flex;
  gap: 16px;
}

.mini__nums span {
  font: 400 10px/1.2 var(--bc-font-sans);
  color: #27202c;
}

.mini__nums strong {
  display: block;
  margin-top: 4px;
  font: 500 24px/1 var(--bc-font-sans);
  color: #27202c;
}

.words {
  background: #fff;
  border: 1px solid #eeeef1;
}

.words ul {
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-top: 24px;
  list-style: none;
}

.words li {
  display: flex;
  align-items: center;
  gap: 10px;
}

.words li img {
  width: 14px;
  height: 14px;
}

.words li strong {
  font: 500 16px/1.1 var(--bc-font-sans);
  color: #18171c;
}

.words li span {
  font: 400 14px/1.1 var(--bc-font-sans);
  color: #77738c;
}
</style>
