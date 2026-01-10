<script setup lang="ts">
import { useHead } from '@vueuse/head';

useHead({ title: 'Contact - Dev-Tool' });
</script>

<template>
  <div class="mx-auto mt-50px max-w-800px px-20px pb-50px text-center">
    <h1 class="text-3xl font-bold mb-6">Contactez-nous</h1>
    
    <p class="mb-8 text-lg">
      Vous avez une suggestion, un bug à signaler ou une question ? N'hésitez pas à nous contacter.
    </p>

    <div class="bg-gray-100 dark:bg-gray-800 p-8 rounded-lg inline-block">
      <p class="text-xl font-semibold mb-2">Email</p>
      <a href="mailto:mohamedmarouf873@gmail.com" class="text-2xl text-primary hover:underline">
        mohamedmarouf873@gmail.com
      </a>
    </div>

    <div class="mt-12">
      <p class="mb-4">Nous essayons de répondre à tous les messages dans les plus brefs délais.</p>
      <router-link to="/" class="text-primary hover:underline font-medium">Retour à l'accueil</router-link>
    </div>
  </div>
</template>

<style scoped>
.text-primary {
  color: #18a058;
}
</style>
