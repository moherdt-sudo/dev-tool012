<script setup lang="ts">
import { useHead } from '@vueuse/head';

useHead({ title: 'Politique de confidentialité - Dev-Tool' });
</script>

<template>
  <div class="mx-auto mt-50px max-w-800px px-20px pb-50px">
    <h1 class="text-3xl font-bold mb-6">Politique de confidentialité</h1>
    
    <p class="mb-4 text-lg italic">Dernière mise à jour : 7 janvier 2026</p>

    <section class="mb-8">
      <h2 class="text-2xl font-semibold mb-4">1. Introduction</h2>
      <p class="mb-4">
        Bienvenue sur <strong>Dev-Tool</strong>. Nous accordons une importance capitale à la protection de votre vie privée. Cette politique explique comment nous traitons vos données.
      </p>
    </section>

    <section class="mb-8">
      <h2 class="text-2xl font-semibold mb-4">2. Traitement des données (Côté Client)</h2>
      <p class="mb-4">
        La caractéristique principale de <strong>Dev-Tool</strong> est que <strong>tout le traitement des données s'effectue localement dans votre navigateur</strong>. 
      </p>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li>Vos données (JSON, mots de passe, textes à chiffrer, etc.) ne sont jamais envoyées à nos serveurs.</li>
        <li>Nous n'avons aucun accès aux informations que vous saisissez dans les outils.</li>
        <li>Aucune base de données ne stocke vos entrées ou résultats.</li>
      </ul>
    </section>

    <section class="mb-8">
      <h2 class="text-2xl font-semibold mb-4">3. Cookies et Stockage Local</h2>
      <p class="mb-4">
        Nous utilisons le <code>localStorage</code> de votre navigateur uniquement pour :
      </p>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li>Mémoriser vos outils favoris.</li>
        <li>Conserver vos préférences d'affichage (mode sombre/clair).</li>
      </ul>
      <p>Ces données restent sur votre appareil et vous pouvez les supprimer à tout moment en vidant le cache de votre navigateur.</p>
    </section>

    <section class="mb-8">
      <h2 class="text-2xl font-semibold mb-4">4. Services Tiers</h2>
      <p class="mb-4">
        Le site est hébergé par Vercel. Vercel peut collecter des journaux d'accès standards (adresse IP, type de navigateur) à des fins de sécurité et de diagnostic réseau, conformément à leur propre politique de confidentialité.
      </p>
    </section>

    <section class="mb-8">
      <h2 class="text-2xl font-semibold mb-4">5. Contact</h2>
      <p class="mb-4">
        Pour toute question concernant cette politique, vous pouvez nous contacter à : 
        <a href="mailto:mohamedmarouf873@gmail.com" class="text-primary">mohamedmarouf873@gmail.com</a>.
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
