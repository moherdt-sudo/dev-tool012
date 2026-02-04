import { TrendingUp } from '@vicons/tabler';
import { defineTool } from '../tool';
import { translate } from '@/plugins/i18n.plugin';

export const tool = defineTool({
  name: translate('tools.roi-calculator.title'),
  path: '/roi-calculator',
  description: translate('tools.roi-calculator.description'),
  keywords: ['roi', 'investissement', 'profit', 'gain', 'finance', 'business', 'rendement'],
  component: () => import('./roi-calculator.vue'),
  icon: TrendingUp,
  category: 'Calculatrice',
  createdAt: new Date('2026-01-18'),
});
