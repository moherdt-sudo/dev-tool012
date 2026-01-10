<script setup lang="ts">
import { useHead } from '@vueuse/head';

useHead({ title: 'Conditions d\'utilisation - Dev-Tool' });
</script>

<template>
  <div class="mx-auto mt-50px max-w-800px px-20px pb-50px">
    <h1 class="text-3xl font-bold mb-6">Conditions d'utilisation</h1>
    
    <p class="mb-4 text-lg italic">Dernière mise à jour : 10 janvier 2026</p>

    <section class="mb-8">
      <h2 class="text-2xl font-semibold mb-4">1. Acceptation des conditions</h2>
      <p class="mb-4">
        En accédant à ce site, vous acceptez d'être lié par les présentes conditions d'utilisation et toutes les lois et réglementations applicables.
      </p>
    </section>

    <section class="mb-8">
      <h2 class="text-2xl font-semibold mb-4">2. Utilisation des outils</h2>
      <p class="mb-4">
        Les outils fournis sur <strong>Dev-Tool</strong> sont destinés à un usage professionnel et personnel. Bien que nous nous efforcions de fournir des outils précis, nous ne garantissons pas l'exactitude des résultats. L'utilisation des outils se fait à vos propres risques.
      </p>
    </section>

    <section class="mb-8">
      <h2 class="text-2xl font-semibold mb-4">3. Responsabilité</h2>
      <p class="mb-4">
        En aucun cas, <strong>Dev-Tool</strong> ou ses contributeurs ne pourront être tenus responsables de tout dommage (y compris, sans limitation, les dommages pour perte de données ou de profit) découlant de l'utilisation ou de l'impossibilité d'utiliser les outils.
      </p>
    </section>

    <section class="mb-8">
      <h2 class="text-2xl font-semibold mb-4">4. Hébergement</h2>
      <p class="mb-4">
        Ce site est hébergé sur <strong>Cloudflare Pages</strong>. Toute interruption de service liée à l'hébergeur ne relève pas de notre responsabilité.
      </p>
    </section>

    <section class="mb-8">
      <h2 class="text-2xl font-semibold mb-4">5. Modifications</h2>
      <p class="mb-4">
        Nous nous réservons le droit de modifier ces conditions à tout moment sans préavis. En utilisant ce site, vous acceptez d'être lié par la version actuelle de ces conditions.
      </p>
    </section>

    <div class="mt-12 text-center">
      <router-link to="/" class="text-primary hover:underline font-medium">Retour à l'accueil</router-link>
    </div>
  </div>
</template>

<style scoped>
.text-primary {
  color: #18a058;
}
</style>
