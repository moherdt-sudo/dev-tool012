<script setup lang="ts">
import { ref, computed } from 'vue';

const salesAmount = ref<number>();
const commissionRate = ref<number>(5);

const commissionAmount = computed(() => {
  if (salesAmount.value !== undefined && commissionRate.value !== undefined) {
    return Number((salesAmount.value * (commissionRate.value / 100)).toFixed(2));
  }
  return 0;
});

const remainingAmount = computed(() => {
  if (salesAmount.value !== undefined) {
    return Number((salesAmount.value - commissionAmount.value).toFixed(2));
  }
  return 0;
});
</script>

<template>
  <div style="flex: 0 0 100%">
    <div style="margin: 0 auto; max-width: 600px">
      <c-card mb-3>
        <div mb-3 font-600>Calcul de Commission</div>
        <div flex flex-col gap-4>
          <div grid grid-cols-2 gap-4>
            <div>
              <div mb-1 text-sm text-neutral-500>Montant des ventes</div>
              <n-input-number v-model:value="salesAmount" :min="0" placeholder="Ex: 5000" />
            </div>
            <div>
              <div mb-1 text-sm text-neutral-500>Taux de commission (%)</div>
              <n-input-number v-model:value="commissionRate" :min="0" :max="100" placeholder="Ex: 5" />
            </div>
          </div>

          <div v-if="salesAmount !== undefined" mt-2 p-4 bg-blue-50 rounded-lg border border-blue-100>
            <div flex justify-between mb-2>
              <span text-neutral-600>Montant de la commission :</span>
              <span font-600 text-blue-600>{{ commissionAmount }} €</span>
            </div>
            <div flex justify-between pt-2 border-t border-blue-200>
              <span font-700>Reste après commission :</span>
              <span font-700 text-lg text-blue-700>{{ remainingAmount }} €</span>
            </div>
          </div>
        </div>
      </c-card>
    </div>
  </div>
</template>
