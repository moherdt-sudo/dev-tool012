import { Calculator } from '@vicons/tabler';
import { defineTool } from '../tool';
import { translate } from '@/plugins/i18n.plugin';

export const tool = defineTool({
  name: translate('tools.tva-calculator.title'),
  path: '/tva-calculator',
  description: translate('tools.tva-calculator.description'),
  keywords: ['tva', 'taxe', 'ht', 'ttc', 'calcul', 'finance', 'prix'],
  component: () => import('./tva-calculator.vue'),
  icon: Calculator,
  createdAt: new Date('2026-01-18'),
});
