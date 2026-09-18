<template>
  <div class="studio" :class="`studio--v${version}`">
    <div class="studio__meta">
      <h1>{{ title }}</h1>
      <p>{{ subtitle }}</p>
      <div class="studio__switch studio__versions" role="tablist" aria-label="Prototype version">
        <button type="button" :class="{ 'is-on': version === '1' }" @click="setVersion('1')">
          1 · Path / Trail
        </button>
        <button type="button" :class="{ 'is-on': version === '2' }" @click="setVersion('2')">
          2 · Home
        </button>
        <button type="button" :class="{ 'is-on': version === '3' }" @click="setVersion('3')">
          3 · Modules
        </button>
      </div>
      <div
        v-if="version === '1'"
        class="studio__switch"
        role="tablist"
        aria-label="Path or trail layout"
      >
        <button
          type="button"
          :class="{ 'is-on': pathVariant === 'trail' }"
          @click="pathVariant = 'trail'"
        >
          A · Trail
        </button>
        <button
          type="button"
          :class="{ 'is-on': pathVariant === 'path' }"
          @click="pathVariant = 'path'"
        >
          B · Path
        </button>
      </div>
    </div>
    <div class="phone">
      <HomeScreen v-if="version === '1'" :variant="pathVariant" />
      <HomeShell v-else-if="version === '2'" />
      <ModulesFirstShell v-else />
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import HomeScreen from './components/HomeScreen.vue';
import HomeShell from './v2/HomeShell.vue';
import ModulesFirstShell from './v3/Shell.vue';

function defaultVersion() {
  const query = new URLSearchParams(location.search).get('v');
  if (query === '1' || query === '2' || query === '3') return query;
  if (location.pathname.includes('home')) return '2';
  return '1';
}

const version = ref(defaultVersion());
const pathVariant = ref('path');

const title = computed(() => {
  if (version.value === '2') return 'BeConfident · Home';
  if (version.value === '3') return 'BeConfident · Modules';
  return pathVariant.value === 'path' ? 'BeConfident · Path' : 'BeConfident · Trail';
});

const subtitle = computed(() => {
  if (version.value === '2') return 'Practice first · talk with your tutor second';
  if (version.value === '3') return 'Practice on the trail · tutors one tap away';
  return pathVariant.value === 'path' ? 'Option B · modules as cards' : 'Option A · winding trail';
});

function setVersion(next) {
  version.value = next;
  const url = new URL(location.href);
  url.searchParams.set('v', next);
  history.replaceState({}, '', url);
}
</script>
