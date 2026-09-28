<template>
  <div class="pass" role="dialog" aria-modal="true" aria-label="Passport">
    <header class="pass__head">
      <button class="icon-btn" type="button" aria-label="Back" @click="$emit('close')">
        <i class="ri-arrow-left-s-line" />
      </button>
      <h1>Passport</h1>
      <span class="icon-btn" aria-hidden="true" />
    </header>

    <p class="lead">Stamps you earn by finishing groups of activities. New York is in progress.</p>

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
        <span>Soon</span>
        <img class="stamp__mark" :src="figma('stamp-symbol-muted.svg')" width="18" height="16" alt="" />
      </article>
    </div>
  </div>
</template>

<script setup>
import { figma } from '../figma.js';

defineEmits(['close']);
</script>

<style scoped>
.pass {
  position: absolute;
  inset: 0;
  z-index: 11;
  overflow-y: auto;
  padding: 60px 20px 40px;
  background: #fff;
  scrollbar-width: none;
}

.pass::-webkit-scrollbar {
  display: none;
}

.pass__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.pass__head h1 {
  font: 500 20px/1.1 var(--bc-font-sans);
  color: #27202c;
}

.icon-btn {
  display: grid;
  place-items: center;
  width: 48px;
  height: 48px;
  font-size: 24px;
  color: #27202c;
}

.lead {
  margin: 12px 4px 24px;
  font: 400 14px/1.45 var(--bc-font-sans);
  color: #42364a;
}

.stamps {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;
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
</style>
