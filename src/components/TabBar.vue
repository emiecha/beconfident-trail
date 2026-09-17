<template>
  <nav class="tabbar" aria-label="Navigation">
    <button
      class="tab"
      :class="{ 'tab--active': tab === 'trail' }"
      type="button"
      @click="$emit('update:tab', 'trail')"
    >
      <i :class="tab === 'trail' ? 'ri-route-fill' : 'ri-route-line'" />
      <span>Trail</span>
    </button>
    <button
      class="tab"
      :class="{ 'tab--active': tab === 'ranking' }"
      type="button"
      @click="$emit('update:tab', 'ranking')"
    >
      <img src="/figma/icon-trophy.svg" width="24" height="24" alt="" />
      <span>Ranking</span>
    </button>
    <button class="tab tab--be" type="button" @click="$emit('update:tab', 'be')">
      <img class="tab__be" src="/figma/be-mascot.svg" width="69" height="69" alt="Be" />
    </button>
    <button
      class="tab"
      :class="{ 'tab--active': tab === 'clube' }"
      type="button"
      @click="$emit('update:tab', 'clube')"
    >
      <img src="/figma/icon-group.svg" width="24" height="24" alt="" />
      <span>Club</span>
    </button>
    <button
      class="tab"
      :class="{ 'tab--active': tab === 'perfil' }"
      type="button"
      @click="$emit('update:tab', 'perfil')"
    >
      <span class="tab__avatar">
        <img src="/figma/avatar-sm.png" width="24" height="24" alt="" />
      </span>
      <span>Profile</span>
    </button>
  </nav>
</template>

<script setup>
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
  justify-content: space-between;
  width: 390px;
  height: 86px;
  padding: 16px;
  background: #f5f4fa;
  border-radius: 16px 16px 0 0;
  overflow: visible;
}

.tab {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  width: 60px;
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

.tab img {
  width: 24px;
  height: 24px;
}

.tab img.tab__be {
  width: 69px;
  height: 69px;
}

.tab--active {
  color: #8134fe;
  font-weight: 500;
}

.tab--be {
  width: 60px;
  height: 57px;
  margin-top: -8px;
}

.tab__be {
  width: 69px;
  height: 69px;
  margin-top: -6px;
  filter: drop-shadow(0 0 12px rgba(129, 52, 254, 0.4));
}

.tab__avatar {
  width: 24px;
  height: 24px;
  border-radius: 999px;
  overflow: hidden;
}

.tab__avatar img {
  width: 24px;
  height: 24px;
  object-fit: cover;
  object-position: 50% 28%;
}
</style>
