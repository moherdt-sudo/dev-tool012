<script setup lang="ts">
const grossSalary = ref<number>();
const chargesRate = ref<number>(23);
const period = ref<'monthly' | 'annual'>('monthly');

const netSalary = computed(() => {
  if (grossSalary.value !== undefined && chargesRate.value !== undefined) {
    return grossSalary.value * (1 - chargesRate.value / 100);
  }
  return undefined;
});

const charges = computed(() => {
  if (grossSalary.value !== undefined && netSalary.value !== undefined) {
    return grossSalary.value - netSalary.value;
  }
  return undefined;
});

const annualGross = computed(() => {
  if (grossSalary.value && period.value === 'monthly') {
    return grossSalary.value * 12;
  }
  return grossSalary.value;
});

const annualNet = computed(() => {
  if (netSalary.value && period.value === 'monthly') {
    return netSalary.value * 12;
  }
  return netSalary.value;
});

const presetRates = [
  { label: 'Cadre (25%)', value: 25 },
  { label: 'Non-cadre (23%)', value: 23 },
  { label: 'Fonction publique (15%)', value: 15 },
  { label: 'Personnalisé', value: null },
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
            Calculateur de Salaire Net
          </h3>
          <p text-sm op-70 mt-2>
            Calculez votre salaire net après charges sociales
          </p>
        </div>

        <n-form label-placement="left" label-width="180">
          <n-form-item label="Période">
            <n-radio-group v-model:value="period">
              <n-radio value="monthly">
                Mensuel
              </n-radio>
              <n-radio value="annual">
                Annuel
              </n-radio>
            </n-radio-group>
          </n-form-item>

          <n-form-item label="Salaire brut">
            <n-input-number
              v-model:value="grossSalary"
              :min="0"
              :step="100"
              placeholder="Salaire brut"
              style="width: 100%"
            >
              <template #suffix>
                €
              </template>
            </n-input-number>
          </n-form-item>

          <n-form-item label="Taux de charges">
            <n-input-number
              v-model:value="chargesRate"
              :min="0"
              :max="50"
              :step="0.5"
              placeholder="Taux de charges"
              style="width: 100%"
            >
              <template #suffix>
                %
              </template>
            </n-input-number>
          </n-form-item>

          <n-form-item label="Profils prédéfinis">
            <n-space>
              <n-button
                v-for="preset in presetRates"
                :key="preset.label"
                size="small"
                @click="preset.value && (chargesRate = preset.value)"
              >
                {{ preset.label }}
              </n-button>
            </n-space>
          </n-form-item>

          <n-divider />

          <n-alert type="success" v-if="netSalary !== undefined">
            <template #header>
              Résultat
            </template>
            <div space-y-3>
              <div>
                <p text-sm op-70>
                  Salaire net {{ period === 'monthly' ? 'mensuel' : 'annuel' }}
                </p>
                <p text-3xl font-bold text-green-600>
                  {{ formatCurrency(netSalary) }}
                </p>
              </div>

              <div>
                <p text-sm op-70>
                  Charges sociales
                </p>
                <p text-lg font-semibold text-red-500>
                  - {{ formatCurrency(charges) }}
                </p>
              </div>

              <n-divider />

              <div v-if="period === 'monthly'">
                <p text-sm op-70>
                  Sur l'année
                </p>
                <p><strong>Brut annuel :</strong> {{ formatCurrency(annualGross) }}</p>
                <p><strong>Net annuel :</strong> <span font-bold text-green-600>{{ formatCurrency(annualNet) }}</span></p>
              </div>
            </div>
          </n-alert>
        </n-form>
      </c-card>

      <c-card>
        <h4 font-semibold mb-2>
          💡 Taux de charges indicatifs
        </h4>
        <div text-sm op-70 space-y-1>
          <p><strong>Cadre :</strong> ~25% (varie selon la convention collective)</p>
          <p><strong>Non-cadre :</strong> ~23%</p>
          <p><strong>Fonction publique :</strong> ~15%</p>
          <p class="text-orange-500"><em>Note : Ces taux sont indicatifs et peuvent varier selon votre situation.</em></p>
        </div>
      </c-card>
    </div>
  </div>
</template>
