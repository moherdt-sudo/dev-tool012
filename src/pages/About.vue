<script setup lang="ts">
import { useHead } from '@vueuse/head';

useHead({ 
  title: 'À propos de DevToolBox - Votre Boîte à Outils Développeur',
  meta: [
    { name: 'description', content: 'Découvrez DevToolBox, la plateforme ultime regroupant des outils essentiels pour les développeurs : formateurs, convertisseurs et utilitaires réseau.' }
  ]
});
</script>

<template>
  <div class="mx-auto mt-50px max-w-600px px-20px">
    <h1 class="text-3xl font-bold mb-6">À propos de DevToolBox</h1>
    
    <p class="mb-4">
      <strong>DevToolBox</strong> est une suite d'outils web performants et gratuits, optimisée pour les développeurs modernes. Notre mission est de centraliser tous les utilitaires nécessaires au codage et à l'administration système.
    </p>

    <p class="mb-4">
      Ce projet est maintenu par <strong>Mohamed Marouf</strong>. L'objectif est de fournir des outils rapides, sécurisés et faciles à utiliser, le tout regroupé sur une seule plateforme.
    </p>

    <h2 class="text-2xl font-semibold mt-8 mb-4">Contact</h2>
    <p class="mb-4">
      Vous avez une suggestion, vous avez trouvé un bug ou vous souhaitez simplement discuter ? N'hésitez pas à me contacter directement par e-mail :
    </p>
    
    <div class="bg-neutral-100 dark:bg-neutral-800 p-4 rounded-lg text-center">
      <a href="mailto:mohamedmarouf873@gmail.com" class="text-primary font-medium text-lg break-all">
        mohamedmarouf873@gmail.com
      </a>
    </div>

    <h2 class="text-2xl font-semibold mt-8 mb-4">Confidentialité</h2>
    <p class="mb-4">
      Tous les outils de <strong>DevToolBox</strong> sont conçus pour la sécurité. Cela signifie que vos données ne sont jamais envoyées à un serveur. Tout le traitement est effectué directement dans votre navigateur, garantissant une confidentialité totale.
    </p>

    <div class="mt-12 text-center text-neutral-500">
      <router-link to="/" class="text-primary hover:underline">Retour à l'accueil</router-link>
    </div>
  </div>
</template>

<style scoped>
.text-primary {
  color: v-bind('themeVars?.primaryColor || "#2563eb"');
}
</style>
