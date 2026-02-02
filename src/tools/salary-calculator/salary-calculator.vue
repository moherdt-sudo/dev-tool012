<script setup lang="ts">
import { ref, computed } from 'vue';

const grossSalary = ref<number>();
const chargesPercent = ref<number>(23); // Moyenne française pour le privé

const netSalary = computed(() => {
  if (grossSalary.value !== undefined && chargesPercent.value !== undefined) {
    return Number((grossSalary.value * (1 - chargesPercent.value / 100)).toFixed(2));
  }
  return 0;
});

const chargesAmount = computed(() => {
  if (grossSalary.value !== undefined) {
    return Number((grossSalary.value - netSalary.value).toFixed(2));
  }
  return 0;
});
</script>

<template>
  <div style="flex: 0 0 100%">
    <div style="margin: 0 auto; max-width: 600px">
      <c-card mb-3>
        <div mb-3 font-600>Calcul Salaire Brut / Net</div>
        <div flex flex-col gap-4>
          <div grid grid-cols-2 gap-4>
            <div>
              <div mb-1 text-sm text-neutral-500>Salaire Brut (Mensuel)</div>
              <n-input-number v-model:value="grossSalary" :min="0" placeholder="Ex: 2500" />
            </div>
            <div>
              <div mb-1 text-sm text-neutral-500>Charges (%)</div>
              <n-input-number v-model:value="chargesPercent" :min="0" :max="100" placeholder="Ex: 23" />
            </div>
          </div>

          <div v-if="grossSalary !== undefined" mt-2 p-4 bg-blue-50 rounded-lg border border-blue-100>
            <div flex justify-between mb-2>
              <span text-neutral-600>Cotisations sociales :</span>
              <span font-600 text-red-500>- {{ chargesAmount }} €</span>
            </div>
            <div flex justify-between pt-2 border-t border-blue-200>
              <span font-700>Salaire Net estimé :</span>
              <span font-700 text-lg text-blue-700>{{ netSalary }} €</span>
            </div>
            <div mt-2 text-xs text-neutral-400 italic>
              * Estimation basée sur un taux de charges fixe. Les résultats peuvent varier selon votre statut et contrat.
            </div>
          </div>
        </div>
      </c-card>
    </div>
  </div>
</template>
