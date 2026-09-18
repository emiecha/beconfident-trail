<template>
  <nav class="tabbar" aria-label="Navigation">
    <button
      class="tab"
      :class="{ 'tab--active': tab === 'home' }"
      type="button"
      @click="$emit('update:tab', 'home')"
    >
      <i :class="tab === 'home' ? 'ri-home-5-fill' : 'ri-home-5-line'" />
      <span>Home</span>
    </button>
    <button
      class="tab"
      :class="{ 'tab--active': tab === 'modules' }"
      type="button"
      @click="$emit('update:tab', 'modules')"
    >
      <i :class="tab === 'modules' ? 'ri-stack-fill' : 'ri-stack-line'" />
      <span>Modules</span>
    </button>
    <button
      class="tab"
      :class="{ 'tab--active': tab === 'community' }"
      type="button"
      @click="$emit('update:tab', 'community')"
    >
      <i :class="tab === 'community' ? 'ri-group-2-fill' : 'ri-group-2-line'" />
      <span>Community</span>
    </button>
    <button
      class="tab"
      :class="{ 'tab--active': tab === 'profile' }"
      type="button"
      @click="$emit('update:tab', 'profile')"
    >
      <span class="tab__avatar" :class="{ 'tab__avatar--on': tab === 'profile' }">
        <img :src="figma('avatar-sm.png')" width="24" height="24" alt="" />
      </span>
      <span>Profile</span>
    </button>
  </nav>
</template>

<script setup>
import { figma } from '../figma.js';

defineProps({
  tab: { type: String, required: true },
});

defineEmits(['update:tab']);
</script>

<style scoped>
.tabbar {
  position: absolute;
  left: 0;
  bottom: 0;
  z-index: 5;
  display: flex;
  align-items: flex-start;
  justify-content: space-around;
  width: 100%;
  height: 86px;
  padding: 12px 8px 28px;
  background: #f5f4fa;
  border-radius: 16px 16px 0 0;
}

.tab {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  flex: 1;
  max-width: 88px;
  height: 48px;
  color: #474554;
  font: 400 12px/1.1 var(--bc-font-sans);
}

.tab i {
  font-size: 24px;
  line-height: 1;
  width: 24px;
  height: 24px;
}

.tab--active {
  color: #8134fe;
  font-weight: 500;
}

.tab__avatar {
  width: 24px;
  height: 24px;
  border-radius: 999px;
  overflow: hidden;
}

.tab__avatar--on {
  box-shadow: 0 0 0 2px #8134fe;
}

.tab__avatar img {
  width: 24px;
  height: 24px;
  object-fit: cover;
  object-position: 50% 28%;
}
</style>
