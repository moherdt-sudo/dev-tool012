import { Cash } from '@vicons/tabler';
import { defineTool } from '../tool';

export const tool = defineTool({
  name: 'Calculateur de Commission',
  path: '/commission-calculator',
  description: 'Calculez les commissions sur ventes avec différents taux. Parfait pour les commerciaux, agents et vendeurs pour estimer leurs revenus.',
  keywords: ['commission', 'vente', 'pourcentage', 'commercial', 'agent', 'rémunération', 'calcul'],
  component: () => import('./commission-calculator.vue'),
  icon: Cash,
  createdAt: new Date('2026-01-17'),
});
