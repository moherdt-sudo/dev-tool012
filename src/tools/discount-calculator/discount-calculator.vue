<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import MonetizationGuard from '../../components/MonetizationGuard.vue';

const guard = ref();
const originalPrice = ref<number>();
const discountPercent = ref<number>(10);

const savings = computed(() => {
  if (originalPrice.value !== undefined && discountPercent.value !== undefined) {
    return Number((originalPrice.value * (discountPercent.value / 100)).toFixed(2));
  }
  return 0;
});

const finalPrice = computed(() => {
  if (originalPrice.value !== undefined) {
    return Number((originalPrice.value - savings.value).toFixed(2));
  }
  return 0;
});
</script>

<template>
  <div style="flex: 0 0 100%">
    <div style="margin: 0 auto; max-width: 600px">
      <c-card mb-3>
        <div mb-3 font-600>Calcul de Remise / Solde</div>
        
        <div flex flex-col gap-4>
          <div grid grid-cols-2 gap-4>
            <div>
              <div mb-1 text-sm text-neutral-500>Prix initial</div>
              <n-input-number v-model:value="originalPrice" :min="0" placeholder="Ex: 80" />
            </div>
            <div>
              <div mb-1 text-sm text-neutral-500>Remise (%)</div>
              <n-input-number v-model:value="discountPercent" :min="0" :max="100" placeholder="Ex: 20" />
            </div>
          </div>

          <div v-if="originalPrice !== undefined" mt-2 p-4 bg-orange-50 rounded-lg border border-orange-100>
            <div flex justify-between mb-2>
              <span text-neutral-600>Économie :</span>
              <span font-600 text-orange-600>- {{ savings }} €</span>
            </div>
            <div flex justify-between pt-2 border-t border-orange-200>
              <span font-700>Prix final :</span>
              <span font-700 text-lg text-orange-700>{{ finalPrice }} €</span>
            </div>

            <!-- Monetized Copy Button -->
            <MonetizationGuard 
              :text-to-copy="`Prix initial: ${originalPrice}€, Remise: ${discountPercent}%, Économie: ${savings}€, Prix final: ${finalPrice}€`" 
            />
          </div>
        </div>
      </c-card>
    </div>
  </div>
</template>
