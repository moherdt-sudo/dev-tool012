<script setup lang="ts">
const hourlyRate = ref<number>();
const hoursWorked = ref<number>();
const monthlySalary = ref<number>();
const weeklyHours = ref<number>(35);

const totalRevenue = computed(() => {
  if (hourlyRate.value !== undefined && hoursWorked.value !== undefined) {
    return hourlyRate.value * hoursWorked.value;
  }
  return undefined;
});

const hourlyRateFromMonthly = computed(() => {
  if (monthlySalary.value !== undefined && weeklyHours.value !== undefined && weeklyHours.value > 0) {
    const monthlyHours = (weeklyHours.value * 52) / 12;
    return monthlySalary.value / monthlyHours;
  }
  return undefined;
});

const dailyRate = computed(() => {
  if (hourlyRate.value !== undefined) {
    return hourlyRate.value * 7; // 7h par jour
  }
  if (hourlyRateFromMonthly.value !== undefined) {
    return hourlyRateFromMonthly.value * 7;
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
    <div style="margin: 0 auto; max-width: 700px">
      <c-card mb-3>
        <div text-center mb-4>
          <h3 font-bold text-lg>
            Calculateur de Taux Horaire
          </h3>
          <p text-sm op-70 mt-2>
            Calculez vos revenus selon le temps travaillé
          </p>
        </div>

        <n-form label-placement="left" label-width="180">
          <n-form-item label="Taux horaire">
            <n-input-number
              v-model:value="hourlyRate"
              :min="0"
              :step="1"
              placeholder="Tarif par heure"
              style="width: 100%"
            >
              <template #suffix>
                €/h
              </template>
            </n-input-number>
          </n-form-item>

          <n-form-item label="Heures travaillées">
            <n-input-number
              v-model:value="hoursWorked"
              :min="0"
              :step="0.5"
              placeholder="Nombre d'heures"
              style="width: 100%"
            >
              <template #suffix>
                heures
              </template>
            </n-input-number>
          </n-form-item>

          <n-divider />

          <n-alert type="success" v-if="totalRevenue !== undefined">
            <template #header>
              Revenu total
            </template>
            <p text-2xl font-bold text-green-600>
              {{ formatCurrency(totalRevenue) }}
            </p>
            <p text-sm mt-2 v-if="dailyRate">
              <strong>Taux journalier (TJM) :</strong> {{ formatCurrency(dailyRate) }}
            </p>
          </n-alert>
        </n-form>
      </c-card>

      <c-card>
        <h4 font-semibold mb-3>
          Calculer le taux horaire depuis un salaire mensuel
        </h4>
        <n-form label-placement="left" label-width="180">
          <n-form-item label="Salaire mensuel">
            <n-input-number
              v-model:value="monthlySalary"
              :min="0"
              :step="100"
              placeholder="Salaire mensuel"
              style="width: 100%"
            >
              <template #suffix>
                €
              </template>
            </n-input-number>
          </n-form-item>

          <n-form-item label="Heures/semaine">
            <n-input-number
              v-model:value="weeklyHours"
              :min="1"
              :max="80"
              :step="1"
              placeholder="Heures par semaine"
              style="width: 100%"
            >
              <template #suffix>
                h/sem
              </template>
            </n-input-number>
          </n-form-item>

          <n-divider />

          <n-alert type="info" v-if="hourlyRateFromMonthly !== undefined">
            <template #header>
              Taux horaire équivalent
            </template>
            <p text-xl font-bold>
              {{ formatCurrency(hourlyRateFromMonthly) }} / heure
            </p>
            <p text-sm mt-2 v-if="dailyRate">
              <strong>TJM équivalent :</strong> {{ formatCurrency(dailyRate) }}
            </p>
          </n-alert>
        </n-form>
      </c-card>

      <c-card mt-3>
        <h4 font-semibold mb-2>
          💡 Formules
        </h4>
        <div text-sm op-70 space-y-1>
          <p><strong>Revenu :</strong> Taux horaire × Heures travaillées</p>
          <p><strong>Taux horaire :</strong> Salaire mensuel / ((Heures/sem × 52) / 12)</p>
          <p><strong>TJM :</strong> Taux horaire × 7 heures</p>
        </div>
      </c-card>
    </div>
  </div>
</template>
