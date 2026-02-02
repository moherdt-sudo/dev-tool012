<script setup lang="ts">
import { ref, computed } from 'vue';

const investment = ref<number>();
const gain = ref<number>();

const netProfit = computed(() => {
  if (gain.value !== undefined && investment.value !== undefined) {
    return Number((gain.value - investment.value).toFixed(2));
  }
  return 0;
});

const roi = computed(() => {
  if (investment.value && investment.value !== 0) {
    return Number(((netProfit.value / investment.value) * 100).toFixed(2));
  }
  return 0;
});
</script>

<template>
  <div style="flex: 0 0 100%">
    <div style="margin: 0 auto; max-width: 600px">
      <c-card mb-3>
        <div mb-3 font-600>Calcul du ROI (Retour sur Investissement)</div>
        <div flex flex-col gap-4>
          <div grid grid-cols-2 gap-4>
            <div>
              <div mb-1 text-sm text-neutral-500>Investissement initial</div>
              <n-input-number v-model:value="investment" :min="0" placeholder="Ex: 1000" />
            </div>
            <div>
              <div mb-1 text-sm text-neutral-500>Gain total (Revenu)</div>
              <n-input-number v-model:value="gain" :min="0" placeholder="Ex: 1500" />
            </div>
          </div>

          <div v-if="investment !== undefined && gain !== undefined" mt-2 p-4 bg-indigo-50 rounded-lg border border-indigo-100>
            <div flex justify-between mb-2>
              <span text-neutral-600>Profit net :</span>
              <span font-600 :class="netProfit >= 0 ? 'text-green-600' : 'text-red-600'">{{ netProfit }} €</span>
            </div>
            <div flex justify-between pt-2 border-t border-indigo-200>
              <span font-700>ROI :</span>
              <span font-700 text-lg :class="roi >= 0 ? 'text-indigo-600' : 'text-red-600'">{{ roi }} %</span>
            </div>
          </div>
        </div>
      </c-card>
    </div>
  </div>
</template>
