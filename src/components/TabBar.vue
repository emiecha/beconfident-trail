<template>
  <nav class="tabbar" aria-label="Navigation">
    <button
      class="tab"
      :class="{ 'tab--active': tab === primaryTab }"
      type="button"
      @click="$emit('update:tab', primaryTab)"
    >
      <i :class="primaryIcon" />
      <span>{{ primaryLabel }}</span>
    </button>
    <button
      class="tab"
      :class="{ 'tab--active': tab === 'learn' }"
      type="button"
      @click="$emit('update:tab', 'learn')"
    >
      <i :class="tab === 'learn' ? 'ri-book-open-fill' : 'ri-book-open-line'" />
      <span>Learn</span>
    </button>
    <button
      class="tab"
      :class="{ 'tab--active': tab === 'social' }"
      type="button"
      @click="$emit('update:tab', 'social')"
    >
      <i :class="tab === 'social' ? 'ri-group-2-fill' : 'ri-group-2-line'" />
      <span>Social</span>
    </button>
    <button
      class="tab"
      :class="{ 'tab--active': tab === 'profile' }"
      type="button"
      @click="$emit('update:tab', 'profile')"
    >
      <span class="tab__avatar" :class="{ 'tab__avatar--on': tab === 'profile' }">
        <img src="/figma/avatar-sm.png" width="24" height="24" alt="" />
      </span>
      <span>Profile</span>
    </button>
  </nav>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  tab: { type: String, required: true },
  variant: { type: String, default: 'trail' },
});

defineEmits(['update:tab']);

const primaryTab = computed(() => (props.variant === 'path' ? 'path' : 'trail'));
const primaryLabel = computed(() => (props.variant === 'path' ? 'Path' : 'Trail'));
const primaryIcon = computed(() => {
  const active = props.tab === primaryTab.value;
  if (props.variant === 'path') {
    return active ? 'ri-stack-fill' : 'ri-stack-line';
  }
  return active ? 'ri-route-fill' : 'ri-route-line';
});
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
