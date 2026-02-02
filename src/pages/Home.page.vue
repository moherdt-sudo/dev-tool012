<script setup lang="ts">
import { IconDragDrop, IconChevronDown, IconChevronUp, IconX } from '@tabler/icons-vue';
import { useHead } from '@vueuse/head';
import { computed, ref } from 'vue';
import Draggable from 'vuedraggable';
import ToolCard from '../components/ToolCard.vue';
import { useToolStore } from '@/tools/tools.store';
import { useI18n } from 'vue-i18n';

const toolStore = useToolStore();
const { t } = useI18n();

useHead({ 
  title: 'DevToolBox - La Boîte à Outils Ultime pour Développeurs',
  meta: [
    { name: 'description', content: 'Accédez à plus de 50 outils gratuits pour développeurs : formateurs JSON, générateurs de tokens, outils réseau, convertisseurs et plus encore. Rapide, sécurisé et open-source.' }
  ]
});

const favoriteTools = computed(() => toolStore.favoriteTools);

// Category Filtering Logic
const selectedCategory = ref<string | null>(null);

const filteredTools = computed(() => {
  if (!selectedCategory.value) {
    return toolStore.tools;
  }
  return toolStore.tools.filter(tool => tool.category === selectedCategory.value);
});

const selectCategory = (categoryName: string) => {
  selectedCategory.value = selectedCategory.value === categoryName ? null : categoryName;
  // Scroll to tools section when a category is selected
  if (selectedCategory.value) {
    const toolsSection = document.getElementById('all-tools-section');
    if (toolsSection) {
      toolsSection.scrollIntoView({ behavior: 'smooth' });
    }
  }
};

// FAQ State
const activeFaq = ref<number | null>(null);
const toggleFaq = (index: number) => {
  activeFaq.value = activeFaq.value === index ? null : index;
};

const faqs = [
  { q: 'tools.faq.q1', a: 'tools.faq.a1' },
  { q: 'tools.faq.q2', a: 'tools.faq.a2' },
  { q: 'tools.faq.q3', a: 'tools.faq.a3' },
  { q: 'tools.faq.q4', a: 'tools.faq.a4' },
];

// Update favorite tools order when drag is finished
function onUpdateFavoriteTools() {
  toolStore.updateFavoriteTools(favoriteTools.value);
}
</script>

<template>
  <div class="pt-50px pb-100px">
    <div class="grid-wrapper">
      <!-- Section : Top Outils -->
      <section id="top-outils" class="mb-60px">
        <div class="text-center mb-40px">
          <h2 class="text-32px font-700 text-blue-600 mb-10px">{{ t('tools.sections.topTools') }}</h2>
          <p class="text-neutral-500 text-18px">{{ t('tools.sections.topToolsSubtitle') }}</p>
        </div>
        <div class="grid grid-cols-1 gap-20px lg:grid-cols-3 md:grid-cols-2">
          <ToolCard v-for="tool in toolStore.tools.slice(0, 3)" :key="tool.name" :tool="tool" class="transform hover:-translate-y-5px transition-transform duration-300 shadow-lg" />
        </div>
      </section>

      <!-- Section : Favoris -->
      <transition name="height">
        <div v-if="toolStore.favoriteTools.length > 0 && !selectedCategory" class="mb-40px">
          <h3 class="mb-15px text-neutral-400 font-600 flex items-center gap-10px">
            {{ $t('home.categories.favoriteTools') }}
            <c-tooltip :tooltip="$t('home.categories.favoritesDndToolTip')">
              <n-icon :component="IconDragDrop" size="18" class="cursor-move" />
            </c-tooltip>
          </h3>
          <Draggable
            :list="favoriteTools"
            class="grid grid-cols-1 gap-12px lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 xl:grid-cols-4"
            ghost-class="ghost-favorites-draggable"
            item-key="name"
            @end="onUpdateFavoriteTools"
          >
            <template #item="{ element: tool }">
              <ToolCard :tool="tool" />
            </template>
          </Draggable>
        </div>
      </transition>

      <!-- Section : Nouveaux Outils -->
      <div v-if="toolStore.newTools.length > 0 && !selectedCategory" class="mb-40px">
        <h3 class="mb-15px text-neutral-400 font-600">
          {{ t('home.categories.newestTools') }}
        </h3>
        <div class="grid grid-cols-1 gap-12px lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 xl:grid-cols-4">
          <ToolCard v-for="tool in toolStore.newTools" :key="tool.name" :tool="tool" />
        </div>
      </div>

      <!-- Section : Catégories -->
      <section id="categories" class="mb-60px mt-40px">
        <div class="text-center mb-40px">
          <h2 class="text-28px font-700 text-neutral-700 mb-10px">{{ t('tools.sections.categoriesTitle') }}</h2>
          <p class="text-neutral-500">{{ t('tools.sections.categoriesSubtitle') }}</p>
        </div>
        <div class="flex flex-wrap justify-center gap-15px">
          <button 
            v-for="category in toolStore.toolsByCategory" 
            :key="category.name" 
            @click="selectCategory(category.name)"
            class="px-20px py-10px rounded-full font-500 transition-all duration-200 border-2px"
            :class="selectedCategory === category.name 
              ? 'bg-blue-600 text-white border-blue-600 shadow-md scale-105' 
              : 'bg-blue-50 text-blue-600 border-transparent hover:bg-blue-100'"
          >
            {{ category.name }}
          </button>
        </div>
      </section>

      <!-- Section : Tous les Outils / Filtrés -->
      <div id="all-tools-section" class="mb-60px scroll-mt-100px">
        <div class="flex items-center justify-between mb-15px">
          <h3 class="text-neutral-400 font-600">
            {{ selectedCategory ? `${t('home.categories.allTools')} : ${selectedCategory}` : t('home.categories.allTools') }}
          </h3>
          <button 
            v-if="selectedCategory" 
            @click="selectedCategory = null"
            class="flex items-center gap-5px text-blue-600 hover:text-blue-800 font-500 text-sm transition-colors"
          >
            <n-icon :component="IconX" size="16" />
            Réinitialiser le filtre
          </button>
        </div>
        
        <transition-group 
          name="list" 
          tag="div" 
          class="grid grid-cols-1 gap-12px lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 xl:grid-cols-4"
        >
          <ToolCard v-for="tool in filteredTools" :key="tool.name" :tool="tool" />
        </transition-group>

        <div v-if="filteredTools.length === 0" class="text-center py-40px text-neutral-400">
          Aucun outil trouvé dans cette catégorie.
        </div>
      </div>

      <!-- Section : FAQ -->
      <section id="faq" class="mt-80px max-w-800px mx-auto">
        <h2 class="text-32px font-700 text-center mb-40px text-neutral-800">{{ t('tools.faq.title') }}</h2>
        <div class="space-y-15px">
          <div v-for="(faq, index) in faqs" :key="index" class="border border-neutral-200 rounded-12px overflow-hidden bg-white shadow-sm">
            <button 
              @click="toggleFaq(index)"
              class="w-full px-25px py-20px text-left flex justify-between items-center hover:bg-neutral-50 transition-colors"
            >
              <span class="font-600 text-18px text-neutral-700">{{ t(faq.q) }}</span>
              <n-icon :component="activeFaq === index ? IconChevronUp : IconChevronDown" size="20" class="text-neutral-400" />
            </button>
            <transition name="fade">
              <div v-if="activeFaq === index" class="px-25px py-20px text-neutral-600 border-t border-neutral-100 leading-relaxed">
                {{ t(faq.a) }}
              </div>
            </transition>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped lang="less">
.height-enter-active,
.height-leave-active {
  transition: all 0.5s ease-in-out;
  overflow: hidden;
  max-height: 500px;
}

.height-enter-from,
.height-leave-to {
  max-height: 42px;
  overflow: hidden;
  opacity: 0;
  margin-bottom: 0;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.4s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.ghost-favorites-draggable {
  opacity: 0.4;
  background-color: #ccc;
  border: 2px dashed #666;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  transform: scale(1.1);
  animation: ghost-favorites-draggable-animation 0.2s ease-out;
}

@keyframes ghost-favorites-draggable-animation {
  0% {
    opacity: 0;
    transform: scale(0.9);
  }
  100% {
    opacity: 0.4;
    transform: scale(1.0);
  }
}
</style>
