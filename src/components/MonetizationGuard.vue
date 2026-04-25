<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { IconLock, IconAd, IconCopy, IconCheck } from '@tabler/icons-vue';

const props = defineProps<{
  textToCopy?: string;
}>();

const MAX_TRIES = 5;
const MONETAG_LINK = 'https://omg10.com/4/10320637';

const remainingTries = ref(0);
const isCopied = ref(false);

const loadTries = () => {
  const stored = localStorage.getItem('monetag_tries');
  if (stored !== null) {
    remainingTries.value = parseInt(stored, 10);
  } else {
    remainingTries.value = 0;
  }
};

const handleCopy = async () => {
  if (remainingTries.value > 0) {
    if (props.textToCopy) {
      try {
        await navigator.clipboard.writeText(props.textToCopy);
        isCopied.value = true;
        remainingTries.value--;
        localStorage.setItem('monetag_tries', remainingTries.value.toString());
        setTimeout(() => { isCopied.value = false; }, 2000);
      } catch (err) {
        console.error('Failed to copy: ', err);
      }
    }
  }
};

const unlockTries = () => {
  window.open(MONETAG_LINK, '_blank');
  remainingTries.value = MAX_TRIES;
  localStorage.setItem('monetag_tries', MAX_TRIES.toString());
};

onMounted(() => {
  loadTries();
});

defineExpose({
  remainingTries,
  unlockTries
});
</script>

<template>
  <div class="monetization-container mt-4">
    <!-- Counter Display -->
    <div v-if="remainingTries > 0" class="flex items-center justify-between p-2 bg-green-50 border border-green-100 rounded-lg mb-3">
      <span class="text-xs font-medium text-green-700 flex items-center gap-1">
        <div class="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
        {{ remainingTries }} copies restantes
      </span>
      <button @click="unlockTries" class="text-[10px] text-blue-600 hover:underline font-bold uppercase tracking-tighter">
        + Recharger
      </button>
    </div>

    <!-- Action Button -->
    <div v-if="remainingTries > 0">
      <button 
        @click="handleCopy"
        class="flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-all shadow-sm active:scale-95"
      >
        <component :is="isCopied ? IconCheck : IconCopy" size="18" />
        {{ isCopied ? 'COPIÉ !' : 'COPIER LE RÉSULTAT' }}
      </button>
    </div>

    <!-- Unlock Section -->
    <div v-else class="p-4 bg-neutral-50 border-2 border-dashed border-blue-300 rounded-xl text-center shadow-inner">
      <div class="mb-2 flex justify-center">
        <IconLock size="24" class="text-blue-500 opacity-50" />
      </div>
      <p class="text-sm text-neutral-600 mb-3 font-medium">
        La copie est verrouillée. Regardez une pub pour débloquer <b>5 copies</b>.
      </p>
      <button 
        @click="unlockTries"
        class="unlock-button flex flex-col items-center justify-center gap-0.5 w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-bold rounded-lg transition-all transform hover:scale-[1.02] active:scale-95 shadow-md"
      >
        <div class="flex items-center gap-2">
          <IconAd size="20" class="animate-bounce" />
          <span>DÉBLOQUER LA COPIE</span>
        </div>
      </button>
    </div>
  </div>
</template>

<style scoped>
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
</style>
