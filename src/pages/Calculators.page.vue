<script setup lang="ts">
import { useHead } from '@vueuse/head';
import { computed } from 'vue';
import ToolCard from '../components/ToolCard.vue';
import { useToolStore } from '@/tools/tools.store';
import { useI18n } from 'vue-i18n';

const toolStore = useToolStore();
const { t } = useI18n();

useHead({ 
  title: 'Calculatrices - DevToolBox',
  meta: [
    { name: 'description', content: 'Accédez à toutes nos calculatrices financières et mathématiques : TVA, Marge, ROI, Salaire et plus encore.' }
  ]
});

// Filtrer les outils qui sont des calculatrices
const calculatorTools = computed(() => {
  return toolStore.tools.filter(tool => 
    tool.path.includes('calculator') || 
    tool.category.toLowerCase().includes('calcul') ||
    tool.category.toLowerCase().includes('math') ||
    tool.category.toLowerCase().includes('finance')
  );
});
</script>

<template>
  <div class="pt-50px pb-100px">
    <div class="grid-wrapper">
      <div class="text-center mb-40px">
        <h1 class="text-32px font-700 text-blue-600 mb-10px">Nos Calculatrices</h1>
        <p class="text-neutral-500 text-18px">Des outils de calcul précis pour vos besoins quotidiens, financiers et techniques.</p>
      </div>

      <div v-if="calculatorTools.length > 0" class="grid grid-cols-1 gap-12px lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 xl:grid-cols-4">
        <ToolCard v-for="tool in calculatorTools" :key="tool.name" :tool="tool" />
      </div>
      
      <div v-else class="text-center py-40px text-neutral-400">
        Aucune calculatrice n'est disponible pour le moment.
      </div>
    </div>
  </div>
</template>
