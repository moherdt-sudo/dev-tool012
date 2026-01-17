<script setup lang="ts">
const md = `
# DevToolBox

## About
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl quis
mollis blandit, nunc nisl aliquam nunc, vitae aliquam nisl nunc vitae nisl.

- Lorem ipsum dolor sit amet, consectetur adipiscing elit.
- Sed euismod, nisl quis mollis blandit, nunc nisl aliquam nunc, vitae aliquam nisl nunc vitae nisl.

[DevToolBox](https://www.devs-tools.xyz/)
`;
</script>

<template>
  <c-markdown :markdown="md" />
</template>
