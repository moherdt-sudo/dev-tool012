<script setup lang="ts">
const value = ref<number>();
const fromUnit = ref<string>('MB');
const toUnit = ref<string>('GB');

const units = [
  { label: 'Octets (B)', value: 'B', bytes: 1 },
  { label: 'Kilooctets (KB)', value: 'KB', bytes: 1024 },
  { label: 'Mégaoctets (MB)', value: 'MB', bytes: 1024 * 1024 },
  { label: 'Gigaoctets (GB)', value: 'GB', bytes: 1024 * 1024 * 1024 },
  { label: 'Téraoctets (TB)', value: 'TB', bytes: 1024 * 1024 * 1024 * 1024 },
  { label: 'Pétaoctets (PB)', value: 'PB', bytes: 1024 * 1024 * 1024 * 1024 * 1024 },
];

const result = computed(() => {
  if (value.value === undefined) return undefined;
  
  const fromBytes = units.find(u => u.value === fromUnit.value)?.bytes || 1;
  const toBytes = units.find(u => u.value === toUnit.value)?.bytes || 1;
  
  return (value.value * fromBytes) / toBytes;
});

const allConversions = computed(() => {
  if (value.value === undefined) return [];
  
  const fromBytes = units.find(u => u.value === fromUnit.value)?.bytes || 1;
  const totalBytes = value.value * fromBytes;
  
  return units.map(unit => ({
    label: unit.label,
    value: (totalBytes / unit.bytes).toFixed(6),
  }));
});

function formatNumber(num: number | undefined): string {
  if (num === undefined) return '';
  if (num >= 1000000) return num.toExponential(4);
  return num.toFixed(6);
}
</script>

<template>
  <div style="flex: 0 0 100%">
    <div style="margin: 0 auto; max-width: 700px">
      <c-card mb-3>
        <div text-center mb-4>
          <h3 font-bold text-lg>
            Convertisseur de Taille de Données
          </h3>
          <p text-sm op-70 mt-2>
            Convertissez entre octets, Ko, Mo, Go, To et Po
          </p>
        </div>

        <n-form label-placement="left" label-width="120">
          <n-form-item label="Valeur">
            <n-input-number
              v-model:value="value"
              :min="0"
              :step="1"
              placeholder="Entrez une valeur"
              style="width: 100%"
            />
          </n-form-item>

          <n-form-item label="De">
            <n-select
              v-model:value="fromUnit"
              :options="units.map(u => ({ label: u.label, value: u.value }))"
              placeholder="Unité de départ"
            />
          </n-form-item>

          <n-form-item label="Vers">
            <n-select
              v-model:value="toUnit"
              :options="units.map(u => ({ label: u.label, value: u.value }))"
              placeholder="Unité d'arrivée"
            />
          </n-form-item>

          <n-divider />

          <n-alert type="success" v-if="result !== undefined">
            <template #header>
              Résultat
            </template>
            <p text-2xl font-bold text-green-600>
              {{ formatNumber(result) }} {{ toUnit }}
            </p>
          </n-alert>
        </n-form>
      </c-card>

      <c-card v-if="allConversions.length > 0">
        <h4 font-semibold mb-3>
          Toutes les conversions
        </h4>
        <div space-y-2 text-sm>
          <div v-for="conversion in allConversions" :key="conversion.label" flex justify-between>
            <span op-70>{{ conversion.label }}</span>
            <span font-mono font-semibold>{{ conversion.value }}</span>
          </div>
        </div>
      </c-card>

      <c-card mt-3>
        <h4 font-semibold mb-2>
          💡 Conversion
        </h4>
        <div text-sm op-70 space-y-1>
          <p>1 KB = 1,024 octets</p>
          <p>1 MB = 1,024 KB = 1,048,576 octets</p>
          <p>1 GB = 1,024 MB = 1,073,741,824 octets</p>
          <p>1 TB = 1,024 GB</p>
          <p>1 PB = 1,024 TB</p>
        </div>
      </c-card>
    </div>
  </div>
</template>
