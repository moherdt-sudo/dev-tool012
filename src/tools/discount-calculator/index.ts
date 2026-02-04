import { Tag } from '@vicons/tabler';
import { defineTool } from '../tool';
import { translate } from '@/plugins/i18n.plugin';

export const tool = defineTool({
  name: translate('tools.discount-calculator.title'),
  path: '/discount-calculator',
  description: translate('tools.discount-calculator.description'),
  keywords: ['remise', 'solde', 'discount', 'prix', 'économie', 'achat', 'shopping'],
  component: () => import('./discount-calculator.vue'),
  icon: Tag,
  category: 'Calculatrice',
  createdAt: new Date('2026-01-18'),
});
