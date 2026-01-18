<script setup lang="ts">
const cost = ref<number>();
const sellingPrice = ref<number>();
const desiredMarginPercent = ref<number>();

const profit = computed(() => {
  if (sellingPrice.value !== undefined && cost.value !== undefined) {
    return sellingPrice.value - cost.value;
  }
  return undefined;
});

const marginPercent = computed(() => {
  if (profit.value !== undefined && cost.value !== undefined && cost.value !== 0) {
    return (profit.value / cost.value) * 100;
  }
  return undefined;
});

const markupPercent = computed(() => {
  if (profit.value !== undefined && sellingPrice.value !== undefined && sellingPrice.value !== 0) {
    return (profit.value / sellingPrice.value) * 100;
  }
  return undefined;
});

const optimalPrice = computed(() => {
  if (cost.value !== undefined && desiredMarginPercent.value !== undefined) {
    return cost.value * (1 + desiredMarginPercent.value / 100);
  }
  return undefined;
});

const optimalProfit = computed(() => {
  if (optimalPrice.value !== undefined && cost.value !== undefined) {
    return optimalPrice.value - cost.value;
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
            Calculateur de Marge et Profit
          </h3>
          <p text-sm op-70 mt-2>
            Calculez vos marges, profits et prix de vente optimaux
          </p>
        </div>

        <n-form label-placement="left" label-width="180">
          <n-form-item label="Coût d'achat / de revient">
            <n-input-number
              v-model:value="cost"
              :min="0"
              :step="0.01"
              placeholder="Coût"
              style="width: 100%"
            >
              <template #suffix>
                €
              </template>
            </n-input-number>
          </n-form-item>

          <n-form-item label="Prix de vente">
            <n-input-number
              v-model:value="sellingPrice"
              :min="0"
              :step="0.01"
              placeholder="Prix de vente"
              style="width: 100%"
            >
              <template #suffix>
                €
              </template>
            </n-input-number>
          </n-form-item>

          <n-divider />

          <n-alert type="success" v-if="profit !== undefined">
            <template #header>
              Résultats
            </template>
            <div space-y-2>
              <p><strong>Profit brut :</strong> {{ formatCurrency(profit) }}</p>
              <p><strong>Marge sur coût :</strong> {{ formatPercent(marginPercent) }}</p>
              <p><strong>Taux de marque :</strong> {{ formatPercent(markupPercent) }}</p>
            </div>
          </n-alert>
        </n-form>
      </c-card>

      <c-card>
        <h4 font-semibold mb-3>
          Prix de vente optimal
        </h4>
        <n-form label-placement="left" label-width="180">
          <n-form-item label="Marge désirée (%)">
            <n-input-number
              v-model:value="desiredMarginPercent"
              :min="0"
              :max="1000"
              :step="1"
              placeholder="Marge souhaitée"
              style="width: 100%"
            >
              <template #suffix>
                %
              </template>
            </n-input-number>
          </n-form-item>

          <n-divider />

          <n-alert type="info" v-if="optimalPrice !== undefined">
            <template #header>
              Prix recommandé
            </template>
            <div space-y-2>
              <p><strong>Prix de vente optimal :</strong> <span text-lg font-bold>{{ formatCurrency(optimalPrice) }}</span></p>
              <p><strong>Profit prévu :</strong> {{ formatCurrency(optimalProfit) }}</p>
            </div>
          </n-alert>
        </n-form>
      </c-card>

      <c-card mt-3>
        <h4 font-semibold mb-2>
          💡 Formules utilisées
        </h4>
        <div text-sm op-70 space-y-1>
          <p><strong>Profit :</strong> Prix de vente - Coût</p>
          <p><strong>Marge sur coût :</strong> (Profit / Coût) × 100</p>
          <p><strong>Taux de marque :</strong> (Profit / Prix de vente) × 100</p>
          <p><strong>Prix optimal :</strong> Coût × (1 + Marge%/100)</p>
        </div>
      </c-card>
    </div>
  </div>
</template>
