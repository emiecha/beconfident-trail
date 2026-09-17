<template>
  <header class="status" :class="{ 'status--light': tone === 'light' }">
    <div class="status__side">
      <span class="status__time">9:41</span>
    </div>
    <div class="status__island" />
    <div class="status__side status__side--right">
      <img class="status__icons" src="/figma/status-icons.svg" width="78" height="13" alt="" />
    </div>
  </header>
</template>

<script setup>
defineProps({
  tone: { type: String, default: 'light' },
});
</script>

<style scoped>
.status {
  position: absolute;
  top: 0;
  left: 50%;
  z-index: 8;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  width: 393px;
  height: 59px;
  transform: translateX(-50%);
  pointer-events: none;
}

.status__side {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 0 0 3px 10px;
}

.status__side--right {
  padding: 0 11px 0 0;
}

.status__time {
  width: 54px;
  text-align: center;
  color: #000;
  font: 500 16px/21px var(--bc-font-ui);
  letter-spacing: -0.32px;
}

.status--light .status__time {
  color: #fff;
}

.status__island {
  width: 125px;
  height: 37px;
  border-radius: 100px;
  background: #000;
  flex-shrink: 0;
}

.status__icons {
  width: 78.401px;
  height: 13px;
}

.status--light .status__icons {
  filter: brightness(0) invert(1);
}
</style>
