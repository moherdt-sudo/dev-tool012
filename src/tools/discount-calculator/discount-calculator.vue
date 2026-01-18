<script setup lang="ts">
const originalPrice = ref<number>();
const discountPercent = ref<number>();
const finalPrice = ref<number>();

const discountAmount = computed(() => {
  if (originalPrice.value !== undefined && discountPercent.value !== undefined) {
    return (originalPrice.value * discountPercent.value) / 100;
  }
  return undefined;
});

const priceAfterDiscount = computed(() => {
  if (originalPrice.value !== undefined && discountAmount.value !== undefined) {
    return originalPrice.value - discountAmount.value;
  }
  return undefined;
});

const savedAmount = computed(() => discountAmount.value);

// Calcul inverse : si on connaît le prix final
const calculatedDiscount = computed(() => {
  if (originalPrice.value !== undefined && finalPrice.value !== undefined && originalPrice.value !== 0) {
    return originalPrice.value - finalPrice.value;
  }
  return undefined;
});

const calculatedDiscountPercent = computed(() => {
  if (calculatedDiscount.value !== undefined && originalPrice.value !== undefined && originalPrice.value !== 0) {
    return (calculatedDiscount.value / originalPrice.value) * 100;
  }
  return undefined;
});

function formatCurrency(value: number | undefined): string {
  if (value === undefined) return '';
  return value.toFixed(2) + ' €';
}

function formatPercent(value: number | undefined): string {
  if (value === undefined) return '';
  return value.toFixed(2) + ' %';
}
</script>

<template>
  <div style="flex: 0 0 100%">
    <div style="margin: 0 auto; max-width: 700px">
      <c-card mb-3>
        <div text-center mb-4>
          <h3 font-bold text-lg>
            Calculateur de Remise
          </h3>
          <p text-sm op-70 mt-2>
            Calculez le prix après remise et le montant économisé
          </p>
        </div>

        <n-form label-placement="left" label-width="180">
          <n-form-item label="Prix initial">
            <n-input-number
              v-model:value="originalPrice"
              :min="0"
              :step="0.01"
              placeholder="Prix original"
              style="width: 100%"
            >
              <template #suffix>
                €
              </template>
            </n-input-number>
          </n-form-item>

          <n-form-item label="Remise (%)">
            <n-input-number
              v-model:value="discountPercent"
              :min="0"
              :max="100"
              :step="1"
              placeholder="Pourcentage de remise"
              style="width: 100%"
            >
              <template #suffix>
                %
              </template>
            </n-input-number>
          </n-form-item>

          <n-divider />

          <n-alert type="success" v-if="priceAfterDiscount !== undefined">
            <template #header>
              Prix après remise
            </template>
            <div space-y-2>
              <p text-2xl font-bold text-green-600>
                {{ formatCurrency(priceAfterDiscount) }}
              </p>
              <p text-sm><strong>Montant économisé :</strong> {{ formatCurrency(savedAmount) }}</p>
            </div>
          </n-alert>
        </n-form>
      </c-card>

      <c-card>
        <h4 font-semibold mb-3>
          Calcul inverse : Trouver la remise
        </h4>
        <n-form label-placement="left" label-width="180">
          <n-form-item label="Prix final payé">
            <n-input-number
              v-model:value="finalPrice"
              :min="0"
              :step="0.01"
              placeholder="Prix final"
              style="width: 100%"
            >
              <template #suffix>
                €
              </template>
            </n-input-number>
          </n-form-item>

          <n-divider />

          <n-alert type="info" v-if="calculatedDiscountPercent !== undefined">
            <template #header>
              Remise appliquée
            </template>
            <div space-y-2>
              <p><strong>Pourcentage de remise :</strong> {{ formatPercent(calculatedDiscountPercent) }}</p>
              <p><strong>Montant de remise :</strong> {{ formatCurrency(calculatedDiscount) }}</p>
            </div>
          </n-alert>
        </n-form>
      </c-card>

      <c-card mt-3>
        <h4 font-semibold mb-2>
          💡 Formules
        </h4>
        <div text-sm op-70 space-y-1>
          <p><strong>Montant remise :</strong> Prix initial × (Remise% / 100)</p>
          <p><strong>Prix final :</strong> Prix initial - Montant remise</p>
          <p><strong>Remise% :</strong> ((Prix initial - Prix final) / Prix initial) × 100</p>
        </div>
      </c-card>
    </div>
  </div>
</template>
