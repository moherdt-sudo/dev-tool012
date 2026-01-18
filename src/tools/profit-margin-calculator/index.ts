import { TrendingUp } from '@vicons/tabler';
import { defineTool } from '../tool';

export const tool = defineTool({
  name: 'Calculateur de Marge et Profit',
  path: '/profit-margin-calculator',
  description: 'Calculez la marge bénéficiaire, le taux de marge, le prix de vente optimal et le profit net. Outil essentiel pour la gestion commerciale et la tarification.',
  keywords: ['marge', 'profit', 'bénéfice', 'prix', 'coût', 'vente', 'taux', 'rentabilité', 'commercial'],
  component: () => import('./profit-margin-calculator.vue'),
  icon: TrendingUp,
  createdAt: new Date('2026-01-17'),
});
