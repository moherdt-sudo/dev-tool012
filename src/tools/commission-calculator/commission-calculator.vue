<script setup lang="ts">
const salesAmount = ref<number>();
const commissionRate = ref<number>(10);

const commissionAmount = computed(() => {
  if (salesAmount.value !== undefined && commissionRate.value !== undefined) {
    return (salesAmount.value * commissionRate.value) / 100;
  }
  return undefined;
});

const netAmount = computed(() => {
  if (salesAmount.value !== undefined && commissionAmount.value !== undefined) {
    return salesAmount.value - commissionAmount.value;
  }
  return undefined;
});

function formatCurrency(value: number | undefined): string {
  if (value === undefined) return '';
  return value.toFixed(2) + ' €';
}
</script>

<template>
  <div style="flex: 0 0 100%">
    <div style="margin: 0 auto; max-width: 600px">
      <c-card>
        <div text-center mb-4>
          <h3 font-bold text-lg>
            Calculateur de Commission
          </h3>
        </div>

        <n-form label-placement="left" label-width="180">
          <n-form-item label="Montant des ventes">
            <n-input-number
              v-model:value="salesAmount"
              :min="0"
              :step="100"
              placeholder="Total ventes"
              style="width: 100%"
            >
              <template #suffix>
                €
              </template>
            </n-input-number>
          </n-form-item>

          <n-form-item label="Taux de commission">
            <n-input-number
              v-model:value="commissionRate"
              :min="0"
              :max="100"
              :step="0.5"
              placeholder="Taux %"
              style="width: 100%"
            >
              <template #suffix>
                %
              </template>
            </n-input-number>
          </n-form-item>

          <n-divider />

          <n-alert type="success" v-if="commissionAmount !== undefined">
            <div space-y-2>
              <p><strong>Commission gagnée :</strong> <span text-xl font-bold text-green-600>{{ formatCurrency(commissionAmount) }}</span></p>
              <p><strong>Montant net (après commission) :</strong> {{ formatCurrency(netAmount) }}</p>
            </div>
          </n-alert>
        </n-form>
      </c-card>
    </div>
  </div>
</template>
