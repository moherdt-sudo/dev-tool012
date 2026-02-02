<script setup lang="ts">
import { ref, computed } from 'vue';

const amountHT = ref<number>();
const tvaRate = ref<number>(20);
const amountTTC = ref<number>();

const calculateFromHT = () => {
  if (amountHT.value !== undefined && tvaRate.value !== undefined) {
    amountTTC.value = Number((amountHT.value * (1 + tvaRate.value / 100)).toFixed(2));
  }
};

const calculateFromTTC = () => {
  if (amountTTC.value !== undefined && tvaRate.value !== undefined) {
    amountHT.value = Number((amountTTC.value / (1 + tvaRate.value / 100)).toFixed(2));
  }
};

const tvaAmount = computed(() => {
  if (amountHT.value !== undefined && amountTTC.value !== undefined) {
    return Number((amountTTC.value - amountHT.value).toFixed(2));
  }
  return 0;
});
</script>

<template>
  <div style="flex: 0 0 100%">
    <div style="margin: 0 auto; max-width: 600px">
      <c-card mb-3>
        <div mb-3 font-600>Calcul de la TVA</div>
        <div flex flex-col gap-4>
          <div>
            <div mb-1 text-sm text-neutral-500>Taux de TVA (%)</div>
            <n-input-number v-model:value="tvaRate" :min="0" :max="100" placeholder="Ex: 20" @update:value="calculateFromHT" />
          </div>
          
          <div grid grid-cols-2 gap-4>
            <div>
              <div mb-1 text-sm text-neutral-500>Montant Hors Taxe (HT)</div>
              <n-input-number v-model:value="amountHT" :min="0" placeholder="Montant HT" @update:value="calculateFromHT" />
            </div>
            <div>
              <div mb-1 text-sm text-neutral-500>Montant Toutes Taxes Comprises (TTC)</div>
              <n-input-number v-model:value="amountTTC" :min="0" placeholder="Montant TTC" @update:value="calculateFromTTC" />
            </div>
          </div>

          <div v-if="amountHT && amountTTC" mt-2 p-4 bg-blue-50 rounded-lg border border-blue-100>
            <div flex justify-between mb-2>
              <span text-neutral-600>Montant HT :</span>
              <span font-600>{{ amountHT }} €</span>
            </div>
            <div flex justify-between mb-2>
              <span text-neutral-600>Montant de la TVA :</span>
              <span font-600 text-blue-600>+ {{ tvaAmount }} €</span>
            </div>
            <div flex justify-between pt-2 border-t border-blue-200>
              <span font-700>Total TTC :</span>
              <span font-700 text-lg>{{ amountTTC }} €</span>
            </div>
          </div>
        </div>
      </c-card>
    </div>
  </div>
</template>
