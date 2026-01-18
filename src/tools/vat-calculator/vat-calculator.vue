<script setup lang="ts">
const htAmount = ref<number>();
const ttcAmount = ref<number>();
const vatRate = ref<number>(20);
const vatAmount = computed(() => {
  if (htAmount.value !== undefined) {
    return (htAmount.value * (vatRate.value || 0)) / 100;
  }
  return undefined;
});

const ttcFromHt = computed(() => {
  if (htAmount.value !== undefined && vatRate.value !== undefined) {
    return htAmount.value + (htAmount.value * vatRate.value) / 100;
  }
  return undefined;
});

const htFromTtc = computed(() => {
  if (ttcAmount.value !== undefined && vatRate.value !== undefined) {
    return ttcAmount.value / (1 + vatRate.value / 100);
  }
  return undefined;
});

const vatFromTtc = computed(() => {
  if (ttcAmount.value !== undefined && htFromTtc.value !== undefined) {
    return ttcAmount.value - htFromTtc.value;
  }
  return undefined;
});

const commonVatRates = [
  { label: '20% (Taux normal France)', value: 20 },
  { label: '10% (Taux réduit)', value: 10 },
  { label: '5.5% (Taux réduit)', value: 5.5 },
  { label: '2.1% (Taux super réduit)', value: 2.1 },
  { label: '19% (Allemagne)', value: 19 },
  { label: '21% (Espagne)', value: 21 },
];

function formatCurrency(value: number | undefined): string {
  if (value === undefined) return '';
  return value.toFixed(2) + ' €';
}
</script>

<template>
  <div style="flex: 0 0 100%">
    <div style="margin: 0 auto; max-width: 700px">
      <c-card mb-3>
        <div text-center mb-4>
          <h3 font-bold text-lg>
            Calculateur de TVA - HT ⇄ TTC
          </h3>
          <p text-sm op-70 mt-2>
            Calculez le montant HT, TTC et la TVA selon le taux appliqué
          </p>
        </div>

        <n-form label-placement="top">
          <n-form-item label="Taux de TVA (%)">
            <n-input-number
              v-model:value="vatRate"
              :min="0"
              :max="100"
              :step="0.1"
              placeholder="Taux de TVA"
              style="width: 100%"
            />
          </n-form-item>

          <n-form-item label="Taux prédéfinis">
            <n-space>
              <n-button
                v-for="rate in commonVatRates"
                :key="rate.value"
                size="small"
                @click="vatRate = rate.value"
              >
                {{ rate.label }}
              </n-button>
            </n-space>
          </n-form-item>
        </n-form>
      </c-card>

      <n-grid cols="1 s:2" x-gap="12" y-gap="12">
        <n-gi>
          <c-card>
            <h4 font-semibold mb-3>
              Calcul HT → TTC
            </h4>
            <n-form label-placement="left" label-width="120">
              <n-form-item label="Montant HT">
                <n-input-number
                  v-model:value="htAmount"
                  :min="0"
                  :step="0.01"
                  placeholder="Prix HT"
                  style="width: 100%"
                />
              </n-form-item>

              <n-divider />

              <n-form-item label="TVA">
                <c-input-text
                  :value="formatCurrency(vatAmount)"
                  readonly
                  placeholder="Montant TVA"
                />
              </n-form-item>

              <n-form-item label="Montant TTC">
                <c-input-text
                  :value="formatCurrency(ttcFromHt)"
                  readonly
                  placeholder="Prix TTC"
                  font-bold
                />
              </n-form-item>
            </n-form>
          </c-card>
        </n-gi>

        <n-gi>
          <c-card>
            <h4 font-semibold mb-3>
              Calcul TTC → HT
            </h4>
            <n-form label-placement="left" label-width="120">
              <n-form-item label="Montant TTC">
                <n-input-number
                  v-model:value="ttcAmount"
                  :min="0"
                  :step="0.01"
                  placeholder="Prix TTC"
                  style="width: 100%"
                />
              </n-form-item>

              <n-divider />

              <n-form-item label="Montant HT">
                <c-input-text
                  :value="formatCurrency(htFromTtc)"
                  readonly
                  placeholder="Prix HT"
                  font-bold
                />
              </n-form-item>

              <n-form-item label="TVA">
                <c-input-text
                  :value="formatCurrency(vatFromTtc)"
                  readonly
                  placeholder="Montant TVA"
                />
              </n-form-item>
            </n-form>
          </c-card>
        </n-gi>
      </n-grid>

      <c-card mt-3>
        <h4 font-semibold mb-2>
          💡 Formules de calcul
        </h4>
        <div text-sm op-70 space-y-1>
          <p><strong>HT → TTC :</strong> TTC = HT × (1 + Taux/100)</p>
          <p><strong>TTC → HT :</strong> HT = TTC / (1 + Taux/100)</p>
          <p><strong>TVA :</strong> TVA = HT × (Taux/100)</p>
        </div>
      </c-card>
    </div>
  </div>
</template>
