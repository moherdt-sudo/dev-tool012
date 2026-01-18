import { Heart } from '@vicons/tabler';
import { defineTool } from '../tool';

export const tool = defineTool({
  name: 'Calculateur IMC (BMI)',
  path: '/bmi-calculator',
  description: 'Calculez votre Indice de Masse Corporelle (IMC) et évaluez votre corpulence. Obtenez votre poids idéal selon votre taille.',
  keywords: ['imc', 'bmi', 'poids', 'taille', 'santé', 'corpulence', 'masse', 'corporelle', 'ideal'],
  component: () => import('./bmi-calculator.vue'),
  icon: Heart,
  createdAt: new Date('2026-01-17'),
});
