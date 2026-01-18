<script setup lang="ts">
const weight = ref<number>();
const height = ref<number>();
const gender = ref<'male' | 'female'>('male');

const bmi = computed(() => {
  if (weight.value && height.value && height.value > 0) {
    const heightInMeters = height.value / 100;
    return weight.value / (heightInMeters * heightInMeters);
  }
  return undefined;
});

const bmiCategory = computed(() => {
  if (bmi.value === undefined) return '';
  if (bmi.value < 18.5) return 'Maigreur';
  if (bmi.value < 25) return 'Poids normal';
  if (bmi.value < 30) return 'Surpoids';
  if (bmi.value < 35) return 'Obésité modérée';
  if (bmi.value < 40) return 'Obésité sévère';
  return 'Obésité morbide';
});

const bmiType = computed((): 'success' | 'info' | 'warning' | 'error' => {
  if (bmi.value === undefined) return 'info';
  if (bmi.value < 18.5) return 'warning';
  if (bmi.value < 25) return 'success';
  if (bmi.value < 30) return 'warning';
  return 'error';
});

const idealWeightMin = computed(() => {
  if (height.value) {
    const heightInMeters = height.value / 100;
    return 18.5 * heightInMeters * heightInMeters;
  }
  return undefined;
});

const idealWeightMax = computed(() => {
  if (height.value) {
    const heightInMeters = height.value / 100;
    return 25 * heightInMeters * heightInMeters;
  }
  return undefined;
});
</script>

<template>
  <div style="flex: 0 0 100%">
    <div style="margin: 0 auto; max-width: 600px">
      <c-card>
        <div text-center mb-4>
          <h3 font-bold text-lg>
            Calculateur IMC (Indice de Masse Corporelle)
          </h3>
        </div>

        <n-form label-placement="left" label-width="120">
          <n-form-item label="Poids">
            <n-input-number
              v-model:value="weight"
              :min="0"
              :max="500"
              :step="0.1"
              placeholder="Votre poids"
              style="width: 100%"
            >
              <template #suffix>
                kg
              </template>
            </n-input-number>
          </n-form-item>

          <n-form-item label="Taille">
            <n-input-number
              v-model:value="height"
              :min="0"
              :max="250"
              :step="1"
              placeholder="Votre taille"
              style="width: 100%"
            >
              <template #suffix>
                cm
              </template>
            </n-input-number>
          </n-form-item>

          <n-divider />

          <n-alert :type="bmiType" v-if="bmi !== undefined">
            <div space-y-3>
              <div>
                <p text-sm op-70>
                  Votre IMC
                </p>
                <p text-3xl font-bold>
                  {{ bmi.toFixed(1) }}
                </p>
                <p text-lg font-semibold>
                  {{ bmiCategory }}
                </p>
              </div>

              <div v-if="idealWeightMin && idealWeightMax">
                <p text-sm op-70>
                  Poids idéal recommandé
                </p>
                <p text-lg font-semibold>
                  {{ idealWeightMin.toFixed(1) }} - {{ idealWeightMax.toFixed(1) }} kg
                </p>
              </div>
            </div>
          </n-alert>
        </n-form>
      </c-card>

      <c-card mt-3>
        <h4 font-semibold mb-2>
          📊 Interprétation de l'IMC
        </h4>
        <div text-sm space-y-1>
          <p><strong>&lt; 18.5 :</strong> Maigreur</p>
          <p><strong class="text-green-600">18.5 - 25 :</strong> Poids normal</p>
          <p><strong class="text-orange-500">25 - 30 :</strong> Surpoids</p>
          <p><strong class="text-red-500">30 - 35 :</strong> Obésité modérée</p>
          <p><strong class="text-red-600">35 - 40 :</strong> Obésité sévère</p>
          <p><strong class="text-red-700">&gt; 40 :</strong> Obésité morbide</p>
        </div>
      </c-card>

      <c-card mt-3>
        <h4 font-semibold mb-2>
          💡 Formule
        </h4>
        <p text-sm op-70>
          IMC = Poids (kg) / (Taille (m))²
        </p>
      </c-card>
    </div>
  </div>
</template>
