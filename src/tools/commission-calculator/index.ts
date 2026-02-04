import { Percentage } from '@vicons/tabler';
import { defineTool } from '../tool';
import { translate } from '@/plugins/i18n.plugin';

export const tool = defineTool({
  name: translate('tools.commission-calculator.title'),
  path: '/commission-calculator',
  description: translate('tools.commission-calculator.description'),
  keywords: ['commission', 'pourcentage', 'vente', 'finance', 'calcul'],
  component: () => import('./commission-calculator.vue'),
  icon: Percentage,
  category: 'Calculatrice',
  createdAt: new Date('2026-01-18'),
});
