import { Cash } from '@vicons/tabler';
import { defineTool } from '../tool';
import { translate } from '@/plugins/i18n.plugin';

export const tool = defineTool({
  name: translate('tools.salary-calculator.title'),
  path: '/salary-calculator',
  description: translate('tools.salary-calculator.description'),
  keywords: ['salaire', 'brut', 'net', 'paie', 'charges', 'travail', 'finance'],
  component: () => import('./salary-calculator.vue'),
  icon: Cash,
  category: 'Calculatrice',
  createdAt: new Date('2026-01-18'),
});
