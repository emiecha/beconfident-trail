<template>
  <button class="invite" type="button" @click="$emit('click')">
    <img
      class="invite__glow"
      src="./figma/glow-ellipse.svg"
      width="137"
      height="137"
      alt=""
    />
    <span class="invite__label">{{ label }}</span>
    <img
      v-if="icon"
      class="invite__icon"
      :src="icon"
      width="24"
      height="24"
      alt=""
    />
    <i v-else class="invite__remix" :class="remix" />
  </button>
</template>

<script setup>
defineProps({
  label: { type: String, default: 'Invite\nfriends' },
  icon: { type: String, default: '' },
  remix: { type: String, default: 'ri-user-add-line' },
});

defineEmits(['click']);
</script>

<style scoped>
.invite {
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;
  gap: 12px;
  width: 100px;
  height: 100px;
  flex-shrink: 0;
  padding: 16px;
  border: 1px solid #eeeef1;
  border-radius: 16px;
  background: #fff;
  text-align: left;
}

.invite__glow {
  position: absolute;
  top: 34px;
  left: -20px;
  width: 137px;
  height: 137px;
  pointer-events: none;
}

.invite__label {
  position: relative;
  z-index: 1;
  font: 500 14px/1.1 var(--bc-font-sans);
  color: #302e38;
  white-space: pre-line;
}

.invite__icon,
.invite__remix {
  position: relative;
  z-index: 1;
  width: 24px;
  height: 24px;
  font-size: 24px;
  line-height: 1;
  color: #474554;
}
</style>
