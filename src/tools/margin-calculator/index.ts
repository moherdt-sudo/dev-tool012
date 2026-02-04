import { ChartBar } from '@vicons/tabler';
import { defineTool } from '../tool';
import { translate } from '@/plugins/i18n.plugin';

export const tool = defineTool({
  name: translate('tools.margin-calculator.title'),
  path: '/margin-calculator',
  description: translate('tools.margin-calculator.description'),
  keywords: ['marge', 'profit', 'prix', 'vente', 'coût', 'finance', 'business'],
  component: () => import('./margin-calculator.vue'),
  icon: ChartBar,
  category: 'Calculatrice',
  createdAt: new Date('2026-01-18'),
});
