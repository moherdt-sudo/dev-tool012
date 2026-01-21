import { Clock } from '@vicons/tabler';
import { defineTool } from '../tool';

export const tool = defineTool({
  name: 'Calculateur de Taux Horaire',
  path: '/hourly-rate-calculator',
  description: 'Convertissez salaire mensuel en taux horaire ou calculez vos revenus selon le temps travaillé. Idéal pour freelances et consultants pour estimer leurs tarifs.',
  keywords: ['taux', 'horaire', 'salaire', 'freelance', 'consultant', 'revenu', 'temps', 'calcul', 'tarif'],
  component: () => import('./hourly-rate-calculator.vue'),
  icon: Clock,
  createdAt: new Date('2026-01-17'),
});
