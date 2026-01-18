<script setup lang="ts">
import { format, differenceInYears, differenceInMonths, differenceInDays } from 'date-fns';

const birthDate = ref<number>();
const compareDate = ref<number>(Date.now());

const ageYears = computed(() => {
  if (birthDate.value && compareDate.value) {
    return differenceInYears(compareDate.value, birthDate.value);
  }
  return undefined;
});

const ageMonths = computed(() => {
  if (birthDate.value && compareDate.value) {
    return differenceInMonths(compareDate.value, birthDate.value) % 12;
  }
  return undefined;
});

const ageDays = computed(() => {
  if (birthDate.value && compareDate.value && ageYears.value !== undefined && ageMonths.value !== undefined) {
    const yearsInMs = ageYears.value * 365.25 * 24 * 60 * 60 * 1000;
    const monthsInMs = ageMonths.value * 30.44 * 24 * 60 * 60 * 1000;
    const remainingMs = compareDate.value - birthDate.value - yearsInMs - monthsInMs;
    return Math.floor(remainingMs / (24 * 60 * 60 * 1000));
  }
  return undefined;
});

const totalDays = computed(() => {
  if (birthDate.value && compareDate.value) {
    return differenceInDays(compareDate.value, birthDate.value);
  }
  return undefined;
});

const totalMonths = computed(() => {
  if (birthDate.value && compareDate.value) {
    return differenceInMonths(compareDate.value, birthDate.value);
  }
  return undefined;
});

const totalWeeks = computed(() => {
  if (totalDays.value) {
    return Math.floor(totalDays.value / 7);
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
            Calculateur d'Âge
          </h3>
          <p text-sm op-70 mt-2>
            Calculez votre âge exact ou la différence entre deux dates
          </p>
        </div>

        <n-form label-placement="left" label-width="150">
          <n-form-item label="Date de naissance">
            <n-date-picker
              v-model:value="birthDate"
              type="date"
              placeholder="Sélectionnez une date"
              style="width: 100%"
            />
          </n-form-item>

          <n-form-item label="Date de référence">
            <n-date-picker
              v-model:value="compareDate"
              type="date"
              placeholder="Aujourd'hui"
              style="width: 100%"
            />
          </n-form-item>

          <n-divider />

          <n-alert type="info" v-if="ageYears !== undefined">
            <div space-y-3>
              <div>
                <p text-sm op-70 mb-1>
                  Âge exact
                </p>
                <p text-2xl font-bold>
                  {{ ageYears }} ans, {{ ageMonths }} mois, {{ ageDays }} jours
                </p>
              </div>

              <n-divider />

              <div space-y-1>
                <p><strong>Total en années :</strong> {{ ageYears }} ans</p>
                <p><strong>Total en mois :</strong> {{ totalMonths }} mois</p>
                <p><strong>Total en semaines :</strong> {{ totalWeeks }} semaines</p>
                <p><strong>Total en jours :</strong> {{ totalDays }} jours</p>
              </div>
            </div>
          </n-alert>
        </n-form>
      </c-card>

      <c-card mt-3>
        <h4 font-semibold mb-2>
          💡 Utilisation
        </h4>
        <div text-sm op-70 space-y-1>
          <p>• Calculez votre âge exact en années, mois et jours</p>
          <p>• Trouvez la différence entre deux dates quelconques</p>
          <p>• Obtenez le nombre total de jours, mois, semaines vécus</p>
        </div>
      </c-card>
    </div>
  </div>
</template>
