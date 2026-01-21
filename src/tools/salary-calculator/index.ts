import { CurrencyDollar } from '@vicons/tabler';
import { defineTool } from '../tool';

export const tool = defineTool({
  name: 'Calculateur de Salaire Net',
  path: '/salary-calculator',
  description: 'Calculez votre salaire net à partir du brut en appliquant les charges sociales. Estimez rapidement votre revenu net mensuel ou annuel après déduction des cotisations.',
  keywords: ['salaire', 'net', 'brut', 'charges', 'cotisations', 'paie', 'revenu', 'calcul', 'mensuel'],
  component: () => import('./salary-calculator.vue'),
  icon: CurrencyDollar,
  createdAt: new Date('2026-01-17'),
});
