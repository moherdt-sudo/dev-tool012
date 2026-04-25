<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { IconLock, IconAd } from '@tabler/icons-vue';

const MAX_TRIES = 5;
const MONETAG_LINK = 'https://omg10.com/4/10320637';

const remainingTries = ref(0);

const loadTries = () => {
  const stored = localStorage.getItem('monetag_tries');
  if (stored !== null) {
    remainingTries.value = parseInt(stored, 10);
  } else {
    // Initial state: 1 free try or 0? Let's give 0 to force first ad
    remainingTries.value = 0;
  }
};

const useTry = () => {
  if (remainingTries.value > 0) {
    remainingTries.value--;
    localStorage.setItem('monetag_tries', remainingTries.value.toString());
    return true;
  }
  return false;
};

const unlockTries = () => {
  // We open the ad link in a new tab
  window.open(MONETAG_LINK, '_blank');
  // Then we grant the tries
  remainingTries.value = MAX_TRIES;
  localStorage.setItem('monetag_tries', MAX_TRIES.toString());
};

onMounted(() => {
  loadTries();
});

// Expose the state and methods
defineExpose({
  remainingTries,
  useTry,
  unlockTries
});
</script>

<template>
  <div v-if="remainingTries <= 0" class="monetization-overlay p-6 bg-white border-2 border-dashed border-blue-400 rounded-xl text-center shadow-lg my-4">
    <div class="mb-4 flex justify-center">
      <div class="p-3 bg-blue-100 rounded-full">
        <IconLock size="32" class="text-blue-600" />
      </div>
    </div>
    <h3 class="text-xl font-bold text-neutral-800 mb-2">Contenu Verrouillé</h3>
    <p class="text-neutral-600 mb-6">
      Pour obtenir vos résultats et bénéficier de <b>5 tentatives gratuites</b>, veuillez cliquer sur le bouton ci-dessous pour regarder une publicité.
    </p>
    <button 
      @click="unlockTries"
      class="flex items-center justify-center gap-2 w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-all transform hover:scale-105 shadow-md"
    >
      <IconAd size="20" />
      DÉBLOQUER MAINTENANT
    </button>
    <p class="mt-4 text-xs text-neutral-400 italic">
      Cela nous aide à maintenir cet outil gratuit. Merci de votre soutien !
    </p>
  </div>
  <div v-else class="tries-counter mb-4 flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
    <div class="flex items-center gap-2">
      <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
      <span class="text-sm font-medium text-green-700">Tentatives restantes : <b>{{ remainingTries }}</b></span>
    </div>
    <button @click="unlockTries" class="text-xs text-blue-600 hover:underline font-medium">
      Recharger (Ad)
    </button>
  </div>
</template>

<style scoped>
.monetization-overlay {
  animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
