<script setup lang="ts">
import { ref, computed } from 'vue';

const cost = ref<number>();
const sellingPrice = ref<number>();

const margin = computed(() => {
  if (cost.value !== undefined && sellingPrice.value !== undefined) {
    return Number((sellingPrice.value - cost.value).toFixed(2));
  }
  return 0;
});

const marginRate = computed(() => {
  if (sellingPrice.value && sellingPrice.value !== 0) {
    return Number(((margin.value / sellingPrice.value) * 100).toFixed(2));
  }
  return 0;
});

const markupRate = computed(() => {
  if (cost.value && cost.value !== 0) {
    return Number(((margin.value / cost.value) * 100).toFixed(2));
  }
  return 0;
});
</script>

<template>
  <div style="flex: 0 0 100%">
    <div style="margin: 0 auto; max-width: 600px">
      <c-card mb-3>
        <div mb-3 font-600>Calcul de Marge & Profit</div>
        <div flex flex-col gap-4>
          <div grid grid-cols-2 gap-4>
            <div>
              <div mb-1 text-sm text-neutral-500>Coût d'achat / de revient</div>
              <n-input-number v-model:value="cost" :min="0" placeholder="Ex: 100" />
            </div>
            <div>
              <div mb-1 text-sm text-neutral-500>Prix de vente</div>
              <n-input-number v-model:value="sellingPrice" :min="0" placeholder="Ex: 150" />
            </div>
          </div>

          <div v-if="cost !== undefined && sellingPrice !== undefined" mt-2 p-4 bg-green-50 rounded-lg border border-green-100>
            <div flex justify-between mb-2>
              <span text-neutral-600>Marge brute :</span>
              <span font-600 text-green-600>{{ margin }} €</span>
            </div>
            <div flex justify-between mb-2>
              <span text-neutral-600>Taux de marge (sur PV) :</span>
              <span font-600>{{ marginRate }} %</span>
            </div>
            <div flex justify-between>
              <span text-neutral-600>Taux de marque (sur Coût) :</span>
              <span font-600>{{ markupRate }} %</span>
            </div>
          </div>
        </div>
      </c-card>
    </div>
  </div>
</template>
