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
      class="unlock-button flex flex-col items-center justify-center gap-1 w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-bold rounded-xl transition-all transform hover:scale-102 active:scale-95 shadow-lg"
    >
      <div class="flex items-center gap-2">
        <IconAd size="24" class="animate-bounce" />
        <span class="text-lg">CLIQUEZ POUR DÉBLOQUER (5 ESSAIS)</span>
      </div>
      <span class="text-xs font-normal opacity-80">Ouverture du lien publicitaire requise</span>
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

.unlock-button {
  position: relative;
  overflow: hidden;
}

.unlock-button::after {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: rgba(255, 255, 255, 0.1);
  transform: rotate(45deg);
  transition: 0.5s;
  pointer-events: none;
}

.unlock-button:hover::after {
  left: 120%;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
