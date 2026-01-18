import { Calendar } from '@vicons/tabler';
import { defineTool } from '../tool';

export const tool = defineTool({
  name: 'Calculateur d\'Âge',
  path: '/age-calculator',
  description: 'Calculez votre âge exact en années, mois et jours. Trouvez la différence entre deux dates avec précision.',
  keywords: ['âge', 'age', 'date', 'naissance', 'anniversaire', 'différence', 'calcul', 'années'],
  component: () => import('./age-calculator.vue'),
  icon: Calendar,
  createdAt: new Date('2026-01-17'),
});
