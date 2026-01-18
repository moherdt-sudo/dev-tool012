<script setup lang="ts">
const investment = ref<number>();
const returnAmount = ref<number>();
const period = ref<number>(12);

const gain = computed(() => {
  if (returnAmount.value !== undefined && investment.value !== undefined) {
    return returnAmount.value - investment.value;
  }
  return undefined;
});

const roiPercent = computed(() => {
  if (gain.value !== undefined && investment.value !== undefined && investment.value !== 0) {
    return (gain.value / investment.value) * 100;
  }
  return undefined;
});

const annualizedRoi = computed(() => {
  if (roiPercent.value !== undefined && period.value && period.value !== 0) {
    return (roiPercent.value / period.value) * 12;
  }
  return undefined;
});

const breakEvenMonths = computed(() => {
  if (investment.value !== undefined && gain.value !== undefined && gain.value > 0 && period.value) {
    const monthlyGain = gain.value / period.value;
    if (monthlyGain > 0) {
      return investment.value / monthlyGain;
    }
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

function getRoiStatus(roi: number | undefined): string {
  if (roi === undefined) return '';
  if (roi > 50) return 'Excellent';
  if (roi > 20) return 'Très bon';
  if (roi > 0) return 'Positif';
  if (roi === 0) return 'Neutre';
  return 'Négatif';
}

function getRoiType(roi: number | undefined): 'success' | 'info' | 'warning' | 'error' | 'default' {
  if (roi === undefined) return 'default';
  if (roi > 20) return 'success';
  if (roi > 0) return 'info';
  if (roi === 0) return 'warning';
  return 'error';
}
</script>

<template>
  <div style="flex: 0 0 100%">
    <div style="margin: 0 auto; max-width: 700px">
      <c-card mb-3>
        <div text-center mb-4>
          <h3 font-bold text-lg>
            Calculateur de ROI (Retour sur Investissement)
          </h3>
          <p text-sm op-70 mt-2>
            Mesurez la rentabilité de vos investissements
          </p>
        </div>

        <n-form label-placement="left" label-width="200">
          <n-form-item label="Investissement initial">
            <n-input-number
              v-model:value="investment"
              :min="0"
              :step="100"
              placeholder="Montant investi"
              style="width: 100%"
            >
              <template #suffix>
                €
              </template>
            </n-input-number>
          </n-form-item>

          <n-form-item label="Retour total">
            <n-input-number
              v-model:value="returnAmount"
              :min="0"
              :step="100"
              placeholder="Retour obtenu"
              style="width: 100%"
            >
              <template #suffix>
                €
              </template>
            </n-input-number>
          </n-form-item>

          <n-form-item label="Période (mois)">
            <n-input-number
              v-model:value="period"
              :min="1"
              :max="360"
              :step="1"
              placeholder="Durée en mois"
              style="width: 100%"
            >
              <template #suffix>
                mois
              </template>
            </n-input-number>
          </n-form-item>

          <n-divider />

          <n-alert :type="getRoiType(roiPercent)" v-if="roiPercent !== undefined">
            <template #header>
              ROI : {{ getRoiStatus(roiPercent) }}
            </template>
            <div space-y-3>
              <div>
                <p text-sm op-70>
                  Gain net
                </p>
                <p text-2xl font-bold :class="(gain && gain >= 0) ? 'text-green-600' : 'text-red-600'">
                  {{ formatCurrency(gain) }}
                </p>
              </div>

              <div>
                <p text-sm op-70>
                  Retour sur investissement
                </p>
                <p text-xl font-bold>
                  {{ formatPercent(roiPercent) }}
                </p>
              </div>

              <div>
                <p text-sm op-70>
                  ROI annualisé
                </p>
                <p text-lg font-semibold>
                  {{ formatPercent(annualizedRoi) }}
                </p>
              </div>

              <div v-if="breakEvenMonths !== undefined && breakEvenMonths > 0">
                <p text-sm op-70>
                  Point mort (Break-even)
                </p>
                <p text-lg font-semibold>
                  {{ breakEvenMonths.toFixed(1) }} mois
                </p>
              </div>
            </div>
          </n-alert>
        </n-form>
      </c-card>

      <c-card>
        <h4 font-semibold mb-2>
          📊 Interprétation du ROI
        </h4>
        <div text-sm space-y-2>
          <p><strong class="text-green-600">ROI > 50% :</strong> Excellent investissement</p>
          <p><strong class="text-blue-600">ROI > 20% :</strong> Très bon investissement</p>
          <p><strong class="text-blue-500">ROI > 0% :</strong> Investissement positif</p>
          <p><strong class="text-orange-500">ROI = 0% :</strong> Investissement neutre (sans gain ni perte)</p>
          <p><strong class="text-red-500">ROI < 0% :</strong> Perte sur investissement</p>
        </div>
      </c-card>

      <c-card mt-3>
        <h4 font-semibold mb-2>
          💡 Formules
        </h4>
        <div text-sm op-70 space-y-1>
          <p><strong>Gain :</strong> Retour total - Investissement</p>
          <p><strong>ROI (%) :</strong> (Gain / Investissement) × 100</p>
          <p><strong>ROI annualisé :</strong> (ROI / Période en mois) × 12</p>
          <p><strong>Break-even :</strong> Investissement / Gain mensuel moyen</p>
        </div>
      </c-card>
    </div>
  </div>
</template>
